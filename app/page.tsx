import Pricing from "@/components/ui/Pricing/Pricing";
import { createClient } from "@/utils/supabase/server";
import {
  getPlans,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

export default async function PricingPage() {
  const supabase = createClient();
  const [user, plans, subscription] = await Promise.all([
    getUser(supabase),
    getPlans(supabase),
    getSubscription(supabase),
  ]);
  
  
  return (
    <Pricing
      user={user}
      plans={plans ?? []}
      subscription={subscription}
    />
  );
}
