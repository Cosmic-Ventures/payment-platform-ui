"use client";

import Button from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createStripePortal } from "@/utils/stripe/server";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Tables } from "@/types_db";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Plan = Tables<"plans">;

type SubscriptionWithPriceAndPlan = Subscription & {
  prices:
    | (Price & {
        plans: Plan | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndPlan | any;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.plans?.prices?.[0]?.currency! || "usd",
      minimumFractionDigits: 0,
    }).format((subscription?.plans?.prices?.[0]?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card
      title="Your Plan"
      description={
        subscription
          ? `You are currently on the ${subscription?.plans?.name} plan.`
          : "You are not currently subscribed to any plan."
      }
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
          <Button
            variant="slim"
            onClick={handleStripePortalRequest}
            loading={isSubmitting}
          >
            Open customer portal
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        {subscription ? (
          `${subscriptionPrice}/${subscription?.plans?.prices?.[0]?.interval}`
        ) : (
          <Link href="/">Choose your plan</Link>
        )}
      </div>
    </Card>
  );
}
