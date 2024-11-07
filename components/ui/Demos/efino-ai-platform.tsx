import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs";
import { Button } from "@/primitives/button";
import { Input } from "@/primitives/input";
import { Label } from "@/primitives/label";
import { Textarea } from "@/primitives/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card";
import {
  BarChart3,
  Users,
  DollarSign,
  PieChart,
  ChevronLeft,
  ChevronRight,
  Star,
  LineChart,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
// import { useTheme } from "next-themes"

interface RequestSimProps {
  maxReqs: number;
  remReqs: number;
  // setRemReqs: (value: number) => void;
  handleUsage: () => void;
  loading: boolean;
  disable: boolean;
}

export default function EfinoPremiumTools({
  handleUsage,
  loading,
  disable,
  maxReqs,
  remReqs,
}: RequestSimProps) {
  const [showOutput, setShowOutput] = useState(false);
  const [version, setVersion] = useState(1);
  const [history, setHistory] = useState<any>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleVersionChange = (direction: any) => {
    const newIndex = direction === "back" ? historyIndex - 1 : historyIndex + 1;
    if (newIndex >= 0 && newIndex < history.length) {
      setHistoryIndex(newIndex);
      setVersion(history[newIndex]?.version);
    }
  };

  const handleAutofill = () => {
    // Implement autofill logic here
    console.log("Autofill triggered");
  };

  return (
    <div
      className="container mx-auto p-4 font-sans dark:bg-gray-900 dark:text-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <header className="flex items-center justify-between mb-8">
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

          {remReqs === 0 && <div className="flex gap-x-1 items-center">
            <AlertTriangle color="#ffffff" size={22} strokeWidth={1.75} />
            <p className="text-xs font-semibold tracking-tight">
              Your have used up all your requests, {" "}
              <Link href={"/"} className="underline">subscribe to a new plan.</Link> 
            </p>
          </div>}

        </div>

      </header>

      <Tabs defaultValue="fundraising" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 gap-2 border border-zinc-700">
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
            <Card className="dark:bg-gray-800 dark:text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Fundraising Readiness Assessment</CardTitle>
                <Button variant="ghost" onClick={handleAutofill}>
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

            {showOutput && (
              <Card className="dark:bg-gray-800 dark:text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Fundraising Readiness Report</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleVersionChange("back")}
                      disabled={historyIndex <= 0}
                      className="dark:bg-gray-700 dark:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      Version: {version}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleVersionChange("forward")}
                      disabled={historyIndex >= history.length - 1}
                      className="dark:bg-gray-700 dark:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="md:col-span-3 space-y-4">
                      <div className="bg-[#f0f4ed] dark:bg-[#2a3c24] p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Overall Readiness Score: 7/10
                        </h3>
                        <p>
                          Your startup shows promising potential for
                          fundraising, with some areas for improvement.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          Detailed Evaluation:
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Current Stage: Pre-seed - Appropriate for
                            early-stage funding
                          </li>
                          <li>
                            Product Description: Clear value proposition,
                            consider refining market fit
                          </li>
                          <li>
                            Target Market: Large addressable market, validate
                            with more specific data
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Recommendations:</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Develop a more detailed financial projection</li>
                          <li>
                            Strengthen your team by adding key roles or advisors
                          </li>
                          <li>
                            Create a compelling pitch deck highlighting your
                            unique value proposition
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="feedback"
                          className="text-base font-semibold"
                        >
                          Provide Feedback or Ask Questions
                        </Label>
                        <Textarea
                          id="feedback"
                          placeholder="Enter your feedback or questions about the report here..."
                          className="w-full dark:bg-gray-700 dark:text-white"
                          rows={4}
                        />
                      </div>
                      <Button className="w-full bg-[#7bb369] hover:bg-[#4a6b3f] dark:bg-[#4a6b3f] dark:hover:bg-[#7bb369]">
                        Submit Feedback
                      </Button>
                      <div className="bg-[#f0f4ed] dark:bg-[#2a3c24] p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">AI Response:</h4>
                        <p className="text-sm">
                          The AI's response to your feedback or questions will
                          appear here.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="investors">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Prospective Investors</CardTitle>
              <CardDescription>
                Find and analyze potential investors for your startup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Content for Prospective Investors tool will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Investment Evaluation</CardTitle>
              <CardDescription>
                Evaluate potential investments and their impact on your startup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Content for Investment Evaluation tool will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle>Startup Valuation</CardTitle>
              <CardDescription>
                Estimate the value of your startup using various methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content for Startup Valuation tool will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
