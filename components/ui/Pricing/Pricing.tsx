"use client";

import Button from "@/components/ui/Button";
import LogoCloud from "@/components/ui/LogoCloud";
import type { Tables } from "@/types_db";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import cn from "classnames";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs";
import { manageFreePlanSubscription } from "@/utils/supabase/admin";
import PlanCard from "./Plan-Card";

type Subscription = Tables<"subscriptions">;
type Plan = Tables<"plans">;
export type Price = Tables<"prices">;

export interface PlansWithPrices extends Plan {
  prices: Price[];
}
interface SubscriptionWithPlan extends Subscription {
  plans: Plan;
}

interface Props {
  user: User | null | undefined;
  plans: PlansWithPrices[];
  subscription: SubscriptionWithPlan | null;
  existingCustomer: boolean | null;
}

export default function Pricing({
  user,
  plans,
  subscription,
  existingCustomer,
}: Props) {
  const intervals = Array.from(
    new Set(
      plans.flatMap((plan) => {
        return plan?.prices?.map((price) => {
          return !price?.interval ? "lifetime" : price?.interval;
        });
      })
    )
  );

  const router = useRouter();

  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    if (!user) {
      return router.push("/signin/signup");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      !existingCustomer ? "/onboarding": "/premium"
    );

    if (errorRedirect) {
      console.log("Error redirect occured");
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      console.log("NO session ID in checkout");
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };

  if (!plans.length) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        <LogoCloud />
      </section>
    );
  } else {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col space-y-5 sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <Tabs
              defaultValue="premium"
              className="border border-zinc-800 py-5 rounded-xl flex flex-col items-center"
            >
              <TabsList className="flex gap-x-2 p-1 border border-zinc-700">
                <TabsTrigger
                  value="premium"
                  className="h-full  p-3 rounded-md active:bg-gray-700"
                >
                  Premium Plans
                </TabsTrigger>
                <TabsTrigger
                  value="free"
                  className="h-full  p-3 rounded-md active:bg-gray-700"
                >
                  Free Demo
                </TabsTrigger>
              </TabsList>
              <TabsContent value="premium">
                <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                  {plans
                    .filter((item: Plan) => item.name !== "Free Plan")
                    .map((plan) => (
                      <PlanCard
                        user={user || null}
                        subscription={subscription}
                        plan={plan}
                        key={plan.id}
                        existingCustomer={existingCustomer}
                        handleStripeCheckout={handleStripeCheckout}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="free">
                <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                  {plans
                    .filter((item: Plan) => item.name === "Free Plan")
                    .map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        subscription={subscription}
                        user={user || null}
                        existingCustomer={existingCustomer}
                        handleStripeCheckout={handleStripeCheckout}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <LogoCloud />
        </div>
      </section>
    );
  }
}
