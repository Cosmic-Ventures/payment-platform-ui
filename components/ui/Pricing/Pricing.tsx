"use client";

import Button from "@/components/ui/Button";
import LogoCloud from "@/components/ui/LogoCloud";
import type { Tables } from "@/types_db";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { getErrorRedirect } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";
import cn from "classnames";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Subscription = Tables<"subscriptions">;
type Plan = Tables<"plans">;
type Price = Tables<"prices">;
interface PlansWithPrices extends Plan {
  prices: Price[];
}
interface PriceWithPlan extends Price {
  products: Plan | null;
}
interface SubscriptionWithPlan extends Subscription {
  prices: PriceWithPlan | null;
}

interface Props {
  user: User | null | undefined;
  plans: PlansWithPrices[];
  subscription: SubscriptionWithPlan | null;
}


export default function Pricing({ user, plans, subscription }: Props) {
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

  // const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    // setPriceIdLoading(price.id);
    if (!user) {
      // setPriceIdLoading(undefined);
      return router.push("/signin/signup");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      // setPriceIdLoading(undefined);
      console.log("Error redirect occured")
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      // setPriceIdLoading(undefined);
      console.log("NO session ID in checkout")
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
    

    // setPriceIdLoading(undefined);
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
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes("month") && (
                <button
                  type="button"
                  className={`rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Plans
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {plans.map((plan) => {
              const priceString = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: plan.prices[0]?.currency! || "USD",
                minimumFractionDigits: 0,
              }).format((plan.prices[0]?.unit_amount || 0) / 100);
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900",
                    {
                      "border border-pink-500": subscription
                        ? plan.name === subscription?.prices?.products?.name
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
                      <span className="text-5xl font-extrabold white">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /month
                      </span>
                    </p>
                    <Button
                      variant="slim"
                      type="button"
                      // loading={priceIdLoading !== price?.id}
                      onClick={() => handleStripeCheckout(plan.prices[0])}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    >
                      {subscription ? "Manage" : "Subscribe"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <LogoCloud />
        </div>
      </section>
    );
  }
}
