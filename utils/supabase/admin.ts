import { metadata } from "./../../app/layout";
import { NextResponse } from "next/server";
import { getStatusRedirect, toDateTime } from "@/utils/helpers";
import { stripe } from "@/utils/stripe/config";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidV4 } from "uuid";
import Stripe from "stripe";
import type { Database, Tables, TablesInsert, TablesUpdate } from "types_db";
import { redirect } from "next/navigation";

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

  //Retrieval via ID extracted from  Customer record from Supabase
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

  //retrieval via email, if ID fails
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

  //Create Customer if doesnt exist
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

const getPlansRequests = async (planID: string) => {
  if (planID) {
    try {
      const { data, error } = await supabaseAdmin
        .from("plans")
        .select("metadata")
        .eq("id", planID)
        .single();

      if (error) {
        console.error("Error fetching Plan:", error);
        return;
      }
      const metadata = data?.metadata as PlanMetadata;
      const requestsString = metadata?.requests;

      return Number(requestsString);
    } catch (e) {
      console.error(
        "Error fetching Plan against Plan ID provided by Subscription Object from Stripe: ",
        e
      );
    }
  }
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction: boolean
) => {
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["default_payment_method"],
    },
    { apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY }
  );

  console.log("Subscription object from STRIPE: ", subscription);

  // Get customer's UUID from mapping table.

  //Get Supabase User ID
  console.log("FETCHING ID");
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (noCustomerError)
    throw new Error(`Customer lookup failed: ${noCustomerError.message}`);
  const { id: uuid } = customerData!;

  console.log("CHECKING FOR EXISTING RECORD");

  const { data: subRecord, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", uuid)
    .single();

  //NO subscription record, fully new subscription
  if (!subRecord) {
    console.log("NO subscriptions found in DB, new subscription entirely.");
    //Initialise requests count
    let initialRequests;
    if (subscription.items.data[0]?.plan.product) {
      initialRequests = await getPlansRequests(
        subscription.items.data[0]?.plan.product as string
      );
    }

    //prepare new record
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

    //insert new record.
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
  }

  //New Subscription -> join with previous
  else if (subRecord.id !== subscription.id) {
    console.log("IDs do not match, could be a new subscription.");
    if (
      subscriptionId !== subRecord.id &&
      subscription.cancel_at_period_end === false &&
      subscription.status === "active"
    ) {
      console.log("New purchase.");

      //check for remaining requests and carry over
      let leftoverRequests = 0;
      leftoverRequests = subRecord.total_requests - subRecord.used_requests;
      if (subscription.items.data[0]?.plan.product) {
        const newRequests = await getPlansRequests(
          subscription.items.data[0]?.plan.product as string
        );
        if (newRequests !== undefined && newRequests !== 0) {
          leftoverRequests += newRequests;
        } else {
          throw new Error(
            `Error while initialising Request Count, while updating subscription. newRequests came ${newRequests}`
          );
        }
      }

      //Delete exisiting subscription
      const { data: deletionRes, error: deletionError } = await supabaseAdmin
        .from("subscriptions")
        .delete()
        .eq("user_id", uuid)
        .single();
      if (!deletionRes) {
        console.log(
          "Deletion for existing/old record successful, onto inserting "
        );
      }
      if (deletionError) {
        throw new Error(
          `Error removing existing record while upserting new one during Update Subscription: \n ${deletionError.message}`
        );
      }

      //insert new record
      const newSubscriptionRecord: Subscription = {
        cancel_at_period_end: subscription.cancel_at_period_end,
        created: toDateTime(subscription.created).toISOString(),
        current_period_end: toDateTime(
          subscription.current_period_end
        ).toISOString(),
        current_period_start: toDateTime(
          subscription.current_period_start
        ).toISOString(),
        id: subscriptionId,
        metadata: null,
        plan_id: (subscription.items.data[0]?.plan.product as string) || "",
        quantity: null,
        status: "active",
        total_requests: leftoverRequests,
        used_requests: 0,
        user_id: uuid,
      };

      const { data: insertionRes, error: insertionError } = await supabaseAdmin
        .from("subscriptions")
        .insert(newSubscriptionRecord)
        .single();
      if (insertionRes) {
        console.log(
          "New Record added, updated user's Subscription successfully: ",
          insertionRes
        );
      }
      if (insertionError) {
        throw new Error(
          `Error inserting new record while updating subscription: \n ${insertionError.message}`
        );
      }
    }

    if (error) {
      throw new Error(
        `Error fetching existing subscriptions while inserting/updating new SUB: ${error}`
      );
    }
  }

  //Refer to cancellation, only statuses changed referring to same Subscription
  else if (subRecord.id === subscription.id) {
    console.log(
      "IDs matched, both records refer to the same Subscription. Could be a status update."
    );
    // await manageSubscriptionUpdate(subscriptionId, customerId);
  }

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

const manageSubscriptionUpdate = async (
  subscriptionId: string,
  customerId: string,
  prevAttributes: Partial<Stripe.Subscription>
) => {
  //extract existing Subscription ID and check against the one received
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["default_payment_method"],
    },
    { apiKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY }
  );

  let userId;

  const { data: customer, error: customerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  if (customerError) {
    throw new Error(
      `Error fetching customer record against ID provided:\n ${customerError.message}`
    );
  }

  userId = customer.id;

  if (userId) {
    const { data: subscriptionData, error: subscriptionError } =
      await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();
    if (subscriptionError) {
      throw new Error(
        `Error retrieving existing subscription record against User ID: \n ${subscriptionError.message}`
      );
    }

    if (subscriptionData.id) {
      if (subscriptionId === subscriptionData.id) {
        console.log("IDs have matched.");

        //Cancellation
        if (
          subscription.cancel_at_period_end === true &&
          subscription?.cancellation_details?.reason ===
            "cancellation_requested"
        ) {

          //Delete subscription from Stripe
          

          console.log("Cancellation event triggered, update record in DB.");
          const { data: updateRes, error: updateError } = await supabaseAdmin
            .from("subscriptions")
            .update({ status: "canceled", cancel_at_period_end: true })
            .eq("id", subscriptionId)
            .single();
          if (updateError) {
            throw new Error(
              `Error updating Subscription's cancellation status: \n ${updateError.message}`
            );
          } else {
            console.log("Cancellation scheduled successfully: ", updateRes);
          }
        }

        // Reactivation
        else if (
          subscription.cancel_at_period_end === false &&
          prevAttributes.cancel_at_period_end === true
        ) {
          console.log("Renewal requested. Update record in DB accordingly.");
          const { data: updateRes, error: updateError } = await supabaseAdmin
            .from("subscriptions")
            .update({ status: "active", cancel_at_period_end: false })
            .eq("id", subscriptionId)
            .single();
          if (updateError) {
            throw new Error(
              `Error updating Subscription's renewal status: \n ${updateError.message}`
            );
          } else {
            console.log("Cancellation scheduled successfully: ", updateRes);
          }
        }
      }
    } else {
      console.log(
        "Subscription ID not present in Data object: ",
        subscriptionData
      );
    }
  }
};

const manageFreePlanSubscription = async (uuid: string) => {
  let plan_id;
  let metadata;
  try {
    const { data, error } = await supabaseAdmin
      .from("plans")
      .select("*")
      .eq("name", "Free Plan")
      .single();
    plan_id = data?.id;
    metadata = data?.metadata as PlanMetadata;
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
    total_requests: metadata?.requests || 10,
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
  manageSubscriptionUpdate,
};
