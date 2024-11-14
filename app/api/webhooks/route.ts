import Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  deleteProductRecord,
  deletePriceRecord,
  manageSubscriptionUpdate,
} from "@/utils/supabase/admin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;
  const stripeAPIkey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    let subscription = null;  
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          //check for pricing object in here
          // console.log("EVENT OBJECT RECEIEVED: ", event.data.object)
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case "price.deleted":
          await deletePriceRecord(event.data.object as Stripe.Price);
          break;
        case "product.deleted":
          await deleteProductRecord(event.data.object as Stripe.Product);
          break;
        
        case "customer.subscription.created":
          subscription = event.data.object as Stripe.Subscription;
          console.log("Subscription Object received in CREATE event: ", subscription);
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created"
          );
          break;
        case "customer.subscription.updated":
          subscription = event.data.object as Stripe.Subscription
          const prevAttributes = event.data.previous_attributes
          await manageSubscriptionUpdate(subscription.id, subscription.customer as string, prevAttributes as Partial<Stripe.Subscription>)
          break;
        case "customer.subscription.deleted":
          subscription = event.data.object as Stripe.Subscription
          console.log("Subscription received in DELETE event: ", subscription)
          break;
        

        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          console.log("CHECKOUT SESSION CALLED, session received: ", checkoutSession)
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            
            // await manageSubscriptionStatusChange(
            //   subscriptionId as string,
            //   checkoutSession.customer as string,
            //   true
            // );
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        }
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ received: true }));
}
