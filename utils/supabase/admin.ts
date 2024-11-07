import { NextResponse } from 'next/server';
import { getStatusRedirect, toDateTime } from "@/utils/helpers";
import { stripe } from "@/utils/stripe/config";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidV4 } from "uuid";
import Stripe from "stripe";
import type { Database, Tables, TablesInsert } from "types_db";
import { redirect } from 'next/navigation';

type Product = Tables<"plans">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;
type PlanMetadata = {
  requests?: number | string | any;
};

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0;

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ""
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("plans")
    .upsert([productData]);
  if (upsertError)
    throw new Error(`Product insert/update failed: ${upsertError.message}`);
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (
  price: Stripe.Price,
  retryCount = 0,
  maxRetries = 3
) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
    description: null,
    metadata: null,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("prices")
    .upsert([priceData]);

  if (upsertError?.message.includes("foreign key constraint")) {
    if (retryCount < maxRetries) {
      console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await upsertPriceRecord(price, retryCount + 1, maxRetries);
    } else {
      throw new Error(
        `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
      );
    }
  } else if (upsertError) {
    throw new Error(`Price insert/update failed: ${upsertError.message}`);
  } else {
    console.log(`Price inserted/updated: ${price.id}`);
  }
};

const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
    .from("plans")
    .delete()
    .eq("id", product.id);
  if (deletionError)
    throw new Error(`Product deletion failed: ${deletionError.message}`);
  console.log(`Product deleted: ${product.id}`);
};

const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin
    .from("prices")
    .delete()
    .eq("id", price.id);
  if (deletionError)
    throw new Error(`Price deletion failed: ${deletionError.message}`);
  console.log(`Price deleted: ${price.id}`);
};

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin
    .from("customers")
    .upsert([{ id: uuid, stripe_customer_id: customerId }]);

  if (upsertError)
    throw new Error(
      `Supabase customer record creation failed: ${upsertError.message}`
    );

  return customerId;
};

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe.customers.create(customerData, {
    apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  });
  if (!newCustomer) throw new Error("Stripe customer creation failed.");

  return newCustomer.id;
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  // Check if the customer already exists in Supabase
  const { data: existingSupabaseCustomer, error: queryError } =
    await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", uuid)
      .maybeSingle();

  if (queryError) {
    console.error(`Supabase customer lookup failed: ${queryError.message}`);
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
  }

  let stripeCustomerId: string | undefined;

  if (existingSupabaseCustomer?.stripe_customer_id) {
    try {
      const existingStripeCustomer = await stripe.customers.retrieve(
        existingSupabaseCustomer.stripe_customer_id,
        { apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY }
      );
      stripeCustomerId = existingStripeCustomer.id;
    } catch (error) {
      console.error(`Stripe customer retrieval failed: ${error}`);
    }
  }

  if (!stripeCustomerId) {
    try {
      const stripeCustomers = await stripe.customers.list(
        { email: email },
        { apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY }
      );
      stripeCustomerId =
        stripeCustomers.data.length > 0
          ? stripeCustomers.data[0].id
          : undefined;
    } catch (error) {
      console.error(`Stripe customer list retrieval failed: ${error}`);
    }
  }

  if (!stripeCustomerId) {
    console.log("NO CUSTOMER PRESENT, creating customer in Stripe first.");
    try {
      stripeCustomerId = await createCustomerInStripe(uuid, email);
    } catch (error) {
      console.error(`Stripe customer creation failed: ${error}`);
      throw new Error("Stripe customer creation failed.");
    }
  }

  if (existingSupabaseCustomer && stripeCustomerId) {
    if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
      const { error: updateError } = await supabaseAdmin
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", uuid);

      if (updateError) {
        console.error(
          `Supabase customer record update failed: ${updateError.message}`
        );
        throw new Error(
          `Supabase customer record update failed: ${updateError.message}`
        );
      }
      console.warn(
        `Supabase customer record mismatched Stripe ID. Supabase record updated.`
      );
    }
    return stripeCustomerId;
  } else {
    console.warn(
      `Supabase customer record was missing. A new record was created.`
    );
    const upsertedStripeCustomer = await upsertCustomerToSupabase(
      uuid,
      stripeCustomerId
    );
    if (!upsertedStripeCustomer) {
      console.error("Supabase customer record creation failed.");
      throw new Error("Supabase customer record creation failed.");
    }
    return upsertedStripeCustomer;
  }
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
    })
    .eq("id", uuid);
  if (updateError)
    throw new Error(`Customer update failed: ${updateError.message}`);
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  console.log("CREATING SUBSCRIPTION");
  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

  const { id: uuid } = customerData!;

  //check for existing Subscriptions against user ID
  try {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .delete()
      .eq("user_id", uuid);

    console.log("Deleted existing record for user");
    if (error) {
      throw new Error(
        `Error deleting existing subscriptions while upserting new SUB: ${error.message}`
      );
    }
  } catch (e) {
    throw new Error(
      `Error deleting existing subscriptions while upserting new SUB: ${e}`
    );
  }

  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["default_payment_method"],
    },
    { apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY }
  );

  //if subscription record found -> extract plan ID -> make call -> fetch metadata.requests -> pass to Insert Data
  let initialRequests;
  if (subscription.items.data[0]?.plan.product) {
    const planId = subscription.items.data[0]?.plan.product;
    try {
      const { data, error } = await supabaseAdmin
        .from("plans")
        .select("metadata")
        .eq("id", planId)
        .single();

      if (error) {
        console.error("Error fetching Plan:", error);
        return;
      }
      const metadata = data?.metadata as PlanMetadata;
      const requestsString = metadata?.requests;

      initialRequests = Number(requestsString);
    } catch (e) {
      console.error(
        "Error fetching Plan against Plan ID provided by Subscription Object from Stripe: ",
        e
      );
    }
  }

  // Upsert the latest status of the subscription object.
  const subscriptionData: TablesInsert<"subscriptions"> = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    plan_id: subscription.items.data[0].plan.product as string,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    total_requests: initialRequests || 0,
    used_requests: 0,
  };

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (upsertError)
    throw new Error(
      `Subscription insert/update failed: ${upsertError.message}`
    );

  //if successful, set the
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

const manageFreePlanSubscription = async (uuid: string) => {
  let plan_id;
  try {
    const { data, error } = await supabaseAdmin
      .from("plans")
      .select("id")
      .eq("name", "Free Plan")
      .single();
    plan_id = data?.id;
    console.log("PLAN ID found: ", plan_id);
  } catch (e) {
    console.error(e);
  }

  const subscriptionData: TablesInsert<"subscriptions"> = {
    id: uuidV4(),
    user_id: uuid,
    metadata: null,
    status: null,
    plan_id: plan_id ?? "",
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: null,
    cancel_at_period_end: null,
    current_period_start: undefined,
    current_period_end: undefined,
    created: undefined,
    total_requests: 20,
  };

  console.log("SUBSCRIPTION DATA: ", subscriptionData);

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (upsertError) {
    throw new Error(
      `Subscription insert/update failed: ${upsertError.message}`
    );
  }
  console.log(`Inserted/updated subscription for user [${uuid}]`);
  return true;
  
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  manageFreePlanSubscription,
};
