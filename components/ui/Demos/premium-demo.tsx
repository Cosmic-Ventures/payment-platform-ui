"use client";
import React, { useState } from "react";
import { SubscriptionWithPlan } from "./free-demo";
import { User } from "@supabase/supabase-js";
import { getErrorRedirect } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/client";
import { Paperclip } from "lucide-react";
import { Input } from "@/primitives/input";
import { Button } from "@/primitives/button";
import EfinoPremiumTools from "./efino-ai-platform";

interface PremiumDemoProps {
  user: User | null;
  sub: SubscriptionWithPlan;
}

export default function PremiumDemo({ sub, user }: PremiumDemoProps) {
  const [maxReqs, setMaxReqs] = useState(sub?.total_requests);
  const [remReqs, setRemReqs] = useState(
    (sub?.total_requests &&
      typeof sub?.used_requests === "number" &&
      sub?.total_requests - sub?.used_requests) ||
      0
  );
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const supabase = createClient();

  const handleUsage = async () => {
    //disable button & update state
    // setLoading(true)
    //update requests in subscription record
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("used_requests, total_requests")
        .eq("user_id", user?.id || "")
        .single();
      if (data) {
        const { used_requests, total_requests } = data;
        if (used_requests !== total_requests) {
          try {
            const { error } = await supabase
              .from("subscriptions")
              .update({ used_requests: used_requests + 1 })
              .eq("user_id", user?.id || "");
            if (error) {
              getErrorRedirect(
                "/premium",
                "Something went wrong",
                "Usage increment could not be applied."
              );
            }
            console.log("Response from update call data: ");
            setRemReqs((remReqs) => (remReqs !== 0 ? remReqs - 1 : 0));
            setLoading(false);
          } catch (e) {
            console.error("Error while updating Requests Counter: ", e);
            getErrorRedirect(
              "/premium",
              "Something went wrong.",
              "Requests could not be updated."
            );
          }
        } else {
          setDisable(true);
          console.log(
            "Used Requests: ",
            used_requests,
            "\n Total Requests: ",
            total_requests
          );
          getErrorRedirect(
            "/",
            "Requests finished.",
            "The maximum number of Requests you could make with your current plan has exceeded, purchase a new plan."
          );
        }
      }
    } catch (e) {
      console.error("Error while updating Requests Counter: ", e);
      getErrorRedirect(
        "/premium",
        "Something went wrong.",
        "Requests could not be updated."
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-5 items-center justify-center">
      <p className="text-3xl font-bold tracking-tighter">{sub?.plans.name}</p>

      <div className="flex flex-col gap-y-4 h-full w-[75%] border border-zinc-700 rounded-lg">
        <EfinoPremiumTools
          maxReqs={maxReqs}
          remReqs={remReqs}
          handleUsage={handleUsage}
          loading={loading}
          disable={disable}
        />
      </div>
    </div>
  );
}
