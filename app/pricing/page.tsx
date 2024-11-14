import LandingPage from "@/components/ui/landing";
import Pricing from "@/components/ui/Pricing/Pricing";
import { Tables } from "@/types_db";
import { getUser, getPlans, getSubscription } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

type Plan = Tables<"plans">;

export default async function PricingIndex() {
  const supabase = createClient();
  const [user, plans, subscription] = await Promise.all([
    getUser(supabase),
    getPlans(supabase),
    getSubscription(supabase),
  ]);

  
  let existingCustomer = null;
  //add check that if user is already customer in stripe, no free demo
  if (user) {
    try {
      const { data: customer } = await supabase
        .from("customers")
        .select("*") //set exisiting customer to false
        .eq("id", user?.id)
        .single();

      if (!customer && (!subscription || subscription?.plans?.name === "Free Plan")) {
        existingCustomer = false;
      } else {
        existingCustomer = true;
      }
    } catch (e) {
      console.error(
        `Error while confirming if User exists as Stripe Customer already: ${e}`
      );
    }
  }

  console.log("Existing Customer: ", existingCustomer);

  return (
    <Pricing
      user={user}
      plans={plans || []}
      subscription={subscription || null}
      existingCustomer={existingCustomer}
    />
  );
}
