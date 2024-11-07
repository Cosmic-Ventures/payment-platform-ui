import { createClient } from "@/utils/supabase/server";
import s from "./Navbar.module.css";
import Navlinks from "./Navlinks";
import { getPlans, getSubscription } from "@/utils/supabase/queries";
import { SubscriptionWithPlan } from "../Demos/free-demo";

export default async function Navbar() {
  const supabase = createClient();
  let premium;
  let basic;
  let unsubbed;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //check user & plan type
  const subscription: SubscriptionWithPlan = await getSubscription(supabase)
  
  if(subscription && subscription?.plans.name === "Free Plan") {
    basic = true;
  } else if(subscription && subscription?.plans.name !== "Free Plan") {
    premium = true;
  } else {
    unsubbed = true
  } 
  const planTypes = {
    premium, basic, unsubbed
  }
  // console.log("Plan Type Obj in Navbar", planTypes)
 
  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={user} planTypes={planTypes} />
      </div>
    </nav>
  );
}
