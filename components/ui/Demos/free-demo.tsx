"use client";
import { manageFreePlanSubscription } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState, version } from "react";
import { Button } from "@/primitives/button";
import { Tables } from "@/types_db";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/primitives/card";
import { Textarea } from "@/primitives/textarea";
import { Label } from "@/primitives/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/primitives/tabs";
import {
  LineChart,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign,
  PieChart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/primitives/card";
import { Input } from "@/primitives/input";
import { getErrorRedirect } from "@/utils/helpers";

type Subscription = Tables<"subscriptions">;
type Plan = Tables<"plans">;

export interface SubscriptionWithPlan extends Subscription {
  plans: Plan;
}

interface FreeDemoProps {
  subscription: SubscriptionWithPlan | null;
  user: User | null;
}

export default function FreeDemo({ subscription, user }: FreeDemoProps) {
  // const [activateDemo, setActDemo] = useState(
  //   subscription?.plans.name === "Free Plan"
  // );

  const [showOutput, setShowOutput] = useState(false);
  const [version, setVersion] = useState(1);
  const [history, setHistory] = useState<any>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [loading, setLoading] = useState(false);

  const [remReqs, setRemReqs] = useState(
    subscription?.total_requests &&
      typeof subscription.used_requests === "number"
      ? subscription.total_requests - subscription.used_requests
      : 0
  );

  const [maxReqs, setMaxReqs] = useState(subscription?.total_requests);

  const supabase = createClient();

  //function to decrease requests in subscription
  const [disable, setDisable] = useState(false);

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
    <div
      className="flex flex-col items-center container mx-auto p-4 font-sans dark:bg-gray-900 dark:text-white w-[80%] border  border-white rounded-lg"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex w-full items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/efino%20logo%20signature-lvv872S0ayEbr64TJYlAs27dhczXRD.jpg"
            alt="Efino Logo"
            className="h-12"
          />
          <h1 className="text-3xl font-bold text-[#91d02d] dark:text-[#a3e635]">
            efino AI Platform
          </h1>
        </div>
        {/* Usage Tracking */}
        <div className="flex flex-col items-start gap-y-4 border border-zinc-700 rounded-lg p-3">
          <div className="flex gap-x-1 items-center">
            <LineChart size={20} strokeWidth={1.25} color="#ffffff" />
            <p className="text-xs font-semibold tracking-tight">
              Usage Tracking
            </p>
          </div>

          <div className="flex gap-x-5 px-2">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-semibold tracking-tight text-zinc-500">
                Total Requests
              </p>
              <p className="text-xl font-bold tracking-tighter">{maxReqs}</p>
            </div>

            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-semibold tracking-tight text-zinc-500">
                Remaining Requests
              </p>
              <p className="text-xl font-bold tracking-tighter">{remReqs}</p>
            </div>
          </div>

          {remReqs === 0 && (
            <div className="flex gap-x-1 items-center">
              <AlertTriangle color="#ffffff" size={22} strokeWidth={1.75} />
              <p className="text-xs font-semibold tracking-tight">
                Your have used up all your requests,{" "}
                <Link href={"/"} className="underline">
                  subscribe to a new plan.
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <Tabs
        defaultValue="fundraising"
        className="space-y-4 flex flex-col items-center border border-zinc-700 rounded-lg p-2"
      >
        <TabsList className="grid grid-cols-4 gap-2 border border-zinc-700 w-full">
          <TabsTrigger
            value="fundraising"
            className="flex items-center h-full rounded-md gap-2 bg-[#7bb369] text-white dark:bg-[#4a6b3f]"
          >
            <BarChart3 className="h-4 w-4" />
            Fundraising Readiness
          </TabsTrigger>
          <TabsTrigger
            value="investors"
            className="flex items-center h-full rounded-md gap-2 bg-[#ff9d00] text-white dark:bg-[#b36e00]"
          >
            <Users className="h-4 w-4" />
            Prospective Investors
          </TabsTrigger>
          <TabsTrigger
            value="evaluation"
            className="flex items-center h-full rounded-md gap-2 bg-[#eb0046] text-white dark:bg-[#a30031]"
          >
            <DollarSign className="h-4 w-4" />
            Investment Evaluation
          </TabsTrigger>
          <TabsTrigger
            value="valuation"
            className="flex items-center h-full rounded-md gap-2 bg-[#91d02d] text-white dark:bg-[#658f1f]"
          >
            <PieChart className="h-4 w-4" />
            Startup Valuation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fundraising">
          <div className="space-y-4">
            <Card className="bg-zinc-800 border border-zinc-700 text-white ">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Fundraising Readiness Assessment</CardTitle>
                <Button variant="ghost">
                  <Star className="h-4 w-4 mr-2" />
                  Autofill
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="q1">
                    1. What is your current stage of fundraising?
                  </Label>
                  <Input
                    id="q1"
                    placeholder="e.g., Pre-seed, Seed, Series A"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q2">
                    2. Describe your product or service
                  </Label>
                  <Input
                    id="q2"
                    placeholder="Enter a brief description"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q3">
                    3. What is your target market size?
                  </Label>
                  <Input
                    id="q3"
                    placeholder="Enter market size estimate"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loading || disable}
                  className="w-full bg-[#7bb369] hover:bg-[#4a6b3f] dark:bg-[#4a6b3f] dark:hover:bg-[#7bb369]"
                  onClick={handleUsage}
                >
                  Generate Readiness Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="investors"
          className="flex flex-col gap-y-2 items-center"
        >
          <Card className="bg-zinc-700 dark:text-white border border-zinc-500 w-[80%]">
            <CardHeader>
              <CardTitle className="text-white flex gap-x-1 items-center">
                <AlertTriangle color="#ffffff" size={24} strokeWidth={1.75} />
                This is a Free Demo
              </CardTitle>
              <CardDescription className="text-zinc-200">
                The feature you are trying to access is available in our{" "}
                <Link
                  href={"/pricing"}
                  className="underline text-white font-bold"
                >
                  Premium Plans
                </Link>{" "}
                , subscribe to one to gain access to this feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Content for Startup Valuation tool will be displayed here.</p> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="evaluation"
          className="flex flex-col gap-y-2 items-center"
        >
          <Card className="bg-zinc-700 dark:text-white border border-zinc-500 w-[80%]">
            <CardHeader>
              <CardTitle className="text-white flex gap-x-1 items-center">
                <AlertTriangle color="#ffffff" size={24} strokeWidth={1.75} />
                This is a Free Demo
              </CardTitle>
              <CardDescription className="text-zinc-200">
                The feature you are trying to access is available in our{" "}
                <Link
                  href={"/pricing"}
                  className="underline text-white font-bold"
                >
                  Premium Plans
                </Link>{" "}
                , subscribe to one to gain access to this feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Content for Startup Valuation tool will be displayed here.</p> */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="valuation"
          className="flex flex-col gap-y-2 items-center"
        >
          <Card className="bg-zinc-700 dark:text-white border border-zinc-500 w-[80%]">
            <CardHeader>
              <CardTitle className="text-white flex gap-x-1 items-center">
                <AlertTriangle color="#ffffff" size={24} strokeWidth={1.75} />
                This is a Free Demo
              </CardTitle>
              <CardDescription className="text-zinc-200">
                The feature you are trying to access is available in our{" "}
                <Link
                  href={"/pricing"}
                  className="underline text-white font-bold"
                >
                  Premium Plans
                </Link>{" "}
                , subscribe to one to gain access to this feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p>Content for Startup Valuation tool will be displayed here.</p> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
