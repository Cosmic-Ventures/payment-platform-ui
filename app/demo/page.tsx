import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";
import FreeDemo, {
  SubscriptionWithPlan,
} from "@/components/ui/Demos/free-demo";
import { redirect } from "next/navigation";

export default async function DemoIndex() {
  const supabase = createClient();

  const user = await getUser(supabase);

  let sub;
  try {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*, plans(*)")
      .eq("user_id", user?.id || "")
      .single();
    if (error) {
      throw new Error(
        `Error fetching Subscription for user, \n ${error.message}`
      );
    }
    sub = subscription;
    console.log("SUBSCRIPTION fetched in demo index: ", subscription);
  } catch (e) {
    console.error("Could not fetch Subscription against User ID: ", e);
  }
  if (!sub) {
    console.log("User has no plan, take to pricing");
    redirect("/pricing");
  }
  if (sub?.plans?.name !== "Free Plan") {
    console.log(
      "Free Demo should not be accessible with this Subscription Type"
    );
    redirect("/account");
  }

  //fetch respective plan here, pass the values ahead
  //if plan isnt free, redirect to /account
  //if plan is free, get rem. requests -> pass ahead

  return (
    <FreeDemo
      user={user}
      subscription={(sub && (sub as SubscriptionWithPlan)) || null}
    />
  );
}
