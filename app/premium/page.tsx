import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";
import React from "react";
import { SubscriptionWithPlan } from "@/components/ui/Demos/free-demo";
import PremiumDemo from "@/components/ui/Demos/premium-demo";
import { redirect } from "next/navigation";

export default async function PremiumIndex() {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) {
    redirect("/signin");
  }

  let subData: any;
  //check if customer record has been created

  const { data: sub, error } = await supabase
    .from("subscriptions")
    .select("*, plans(name)")
    .eq("user_id", user?.id || "")
    .single();

  subData = sub as SubscriptionWithPlan;

  //if subscription Data not present, it means subscription record is being inserted and null is returned due to race condition
  if (!subData) {
    //check if customer record exists

    // if customer Record exists, it means customer was created,
    // and subscription was still under creation, and since no subscription record returned
    // it means customer is new, redirect to Onboarding
    let cust;
    try {
      const { data: customer, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      cust = customer;
      if (error) {
        throw new Error(
          `Error fetching Customer Record in Premium Index, ${error.message}`
        );
      }
    } catch (e) {
      console.error(`Error fetching Customer Record in Premium Index, ${e}`);
    }


    if (cust === null) {
      redirect("/pricing");
      // throw new Error(
      //   `Error fetching Customer Record in Premium Index, ${error.message}`
      // );
    } else if (cust) {
      console.log(
        "CUSTOMER in Premium Index: ",
        cust,
        "\n SUBSCRIPTION in Prmeium Index: ",
        subData
      );
      redirect("/onboarding");
    } 
  } else if (subData?.plans.name === "Free Plan") {
    redirect("/demo");
  }

  // if subscription did return, it could possibly be an old record
  // meaning customer simply updated their subscription
  // take to Premium page, no need for Onboarding
  // console.log("SUBS found in premium: ", subData && subData?.plans.name);
  return (
    <div className="w-screen min-h-screen px-5 py-3">
      {subData && subData?.plans.name !== "Free Plan" && (
        <PremiumDemo sub={subData} user={user} />
      )}
    </div>
  );
}
