"use client";
import { Tables } from "@/types_db";
import React, { useEffect, useState } from "react";
import { PlansWithPrices, Price } from "./Pricing";
import { SubscriptionWithPlan } from "../Demos/free-demo";
import { cn } from "@/utils/cn";
import Button from "../Button/Button";
import { manageFreePlanSubscription } from "@/utils/supabase/admin";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { AlertTriangle } from "lucide-react";

interface PlanCardProps {
  user: User | null;
  plan: PlansWithPrices;
  subscription: SubscriptionWithPlan | null;
  existingCustomer: boolean | null;
  handleStripeCheckout: (value: Price) => Promise<void>;
}

export default function PlanCard({
  plan,
  subscription,
  user,
  existingCustomer,
  handleStripeCheckout,
}: PlanCardProps) {
  const router = useRouter();

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: plan.prices[0]?.currency! || "USD",
    minimumFractionDigits: 0,
  }).format((plan.prices[0]?.unit_amount || 0) / 100);

  const [disabler, setDisable] = useState(false);

  useEffect(() => {
    if (existingCustomer && plan.name === "Free Plan") {
      setDisable(true);
    }
  }, [user, existingCustomer]);

  return (
    <div
      key={plan.id}
      className={cn(
        "flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900",
        {
          //adds border to currently subscribed plan
          "border border-pink-500": subscription
            ? plan.name === subscription?.plans?.name
            : plan.name === "Freelancer",
        },
        "flex-1", // This makes the flex item grow to fill the space
        "basis-1/3", // Assuming you want each card to take up roughly a third of the container's width
        "max-w-xs" // Sets a maximum width to the cards to prevent them from getting too large
      )}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold leading-6 text-white">
          {plan.name}
        </h2>

        <p className="mt-4 text-zinc-300">{plan.description}</p>
        <p className="mt-8">
          {plan.prices[0]?.interval ? (
            <>
              <span className="text-5xl font-extrabold white">
                {priceString}
              </span>
              <span className="text-base font-medium text-zinc-100">
                /month
              </span>
            </>
          ) : (
            <>
              <span className="text-5xl font-extrabold white">
                {priceString || "NO price found"}
              </span>
              <span className="text-base font-medium text-zinc-100">
                /one time
              </span>
            </>
          )}
        </p>

        {disabler && (
          <div className="flex gap-x-2 p-2 items-center border border-dashed rounded-lg border-zinc-700 mt-4">
            <AlertTriangle size={22} strokeWidth={1.75} color=" #a1a1aa" />
            <p className="text-xs font-semibold tracking-tight text-zinc-500">
              Not eligible for Free Demo, subscribe to a Premium Plan.
            </p>
          </div>
        )}

        <Button
          variant="slim"
          type="button"
          disabled={disabler}
          // loading={priceIdLoading !== price?.id}
          onClick={async () => {
            if (user) {
              if (existingCustomer && plan.name !== "Free Plan") {
                await handleStripeCheckout(plan?.prices?.[0]);
              } else if (existingCustomer && plan.name === "Free Plan") {
                setDisable(true);
              } else if (!existingCustomer && plan.name == "Free Plan") {
                const response = await manageFreePlanSubscription(
                  user?.id || ""
                );
                if (response) {
                  router.push("/demo");
                }
              } else if (!existingCustomer && plan.name !== "Free Plan") {
                await handleStripeCheckout(plan?.prices?.[0]);
              }
            } else {
              router.push("/signin");
            }
          }}
          className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
        >
          {subscription ? "Manage" : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}
