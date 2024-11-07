import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient): Promise<any | null> => {
  try {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*, plans(*, prices(*))")
      // .in("status", ["trialing", "active"])
      .single();

    if (error) {
      console.error("ERROR while fetching Subscriptions: ", error);
      return null;
    }

    return subscription;
  } catch (e) {
    console.error("ERROR while fetching Subscriptions: ", e);
    return null;
  }
});

export const getPlans = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("plans")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .single();
  return userDetails;
});
