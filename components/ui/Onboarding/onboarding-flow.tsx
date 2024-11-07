"use client";
import React, { useState } from "react";
import { Button } from "@/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card";
import { Input } from "@/primitives/input";
import { Label } from "@/primitives/label";
import {
  ArrowRight,
  Moon,
  Sun,
  Upload,
  Link,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileVideo,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { useTheme } from "next-themes"

export default function OnboardingFlow() {
  // const { theme, setTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    fundingStage: "",
    documents: [
      { type: "url", content: "https://www.ourcompany.com" },
      { type: "file", name: "pitch_deck.pptx" },
      { type: "file", name: "financial_report.xlsx" },
      { type: "file", name: "executive_summary.pdf" },
    ],
  });

  const totalSteps = 4;
  const stepTitles = [
    "Basic Information",
    "Company Details",
    "Document Upload",
    "Completion",
  ];

  const router = useRouter();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleStepClick = (clickedStep: number) => {
    if (clickedStep <= step) {
      setStep(clickedStep);
    }
  };

  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      documents: [
        ...formData.documents,
        ...files.map((file: any) => ({ type: "file", name: file?.name })),
      ],
    });
  };

  const handleUrlAdd = () => {
    const url = prompt("Enter the URL of your document:");
    if (url) {
      setFormData({
        ...formData,
        documents: [...formData.documents, { type: "url", content: url }],
      });
    }
  };

  const renderProgressBar = () => (
    <div className="flex flex-col items-center mt-8">
      <div className="flex justify-between w-full max-w-md mb-4">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`text-center ${index + 1 <= step ? "text-[#91d02d]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer mb-2
                ${index + 1 <= step ? "bg-[#91d02d] text-white" : "bg-gray-200 text-gray-500"}
                ${index + 1 < step ? "hover:bg-[#7bb369]" : ""}`}
              onClick={() => handleStepClick(index + 1)}
            >
              {index + 1}
            </div>
            <span className="text-xs">{title}</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md bg-gray-200 h-2 rounded-full">
        <div
          className="bg-[#91d02d] h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Welcome to Efino</CardTitle>
              <CardDescription>
                Let's get started with some basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#91d02d] hover:bg-[#7bb369] text-white"
                onClick={handleNextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>
                Tell us more about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Enter your industry"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingStage">Current Funding Stage</Label>
                <Input
                  id="fundingStage"
                  name="fundingStage"
                  value={formData.fundingStage}
                  onChange={handleInputChange}
                  placeholder="e.g., Pre-seed, Seed, Series A"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button
                className="bg-[#91d02d] hover:bg-[#7bb369] text-white"
                onClick={handleNextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Share any relevant documents about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  //   onClick={() => document.getElementById("file-upload").click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt"
                />
                <Button variant="outline" onClick={handleUrlAdd}>
                  <Link className="mr-2 h-4 w-4" />
                  Add URL
                </Button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  Uploaded Documents:
                </h4>
                <ul className="space-y-2">
                  {formData.documents.map((doc: any, index) => (
                    <li key={index} className="flex items-center">
                      {doc.type === "url" ? (
                        <Link className="mr-2 h-4 w-4" />
                      ) : doc.name.endsWith(".pdf") ? (
                        <FileText className="mr-2 h-4 w-4" />
                      ) : doc.name.endsWith(".ppt") ||
                        doc.name.endsWith(".pptx") ? (
                        <FileImage className="mr-2 h-4 w-4" />
                      ) : doc.name.endsWith(".xls") ||
                        doc.name.endsWith(".xlsx") ||
                        doc.name.endsWith(".csv") ? (
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                      ) : doc.name.endsWith(".mp4") ||
                        doc.name.endsWith(".avi") ||
                        doc.name.endsWith(".mov") ? (
                        <FileVideo className="mr-2 h-4 w-4" />
                      ) : (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {doc.type === "url" ? doc.content : doc.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button
                className="bg-[#91d02d] hover:bg-[#7bb369] text-white"
                onClick={handleNextStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      case 4:
        return (
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Onboarding Complete!</CardTitle>
              <CardDescription>
                You're all set to start using Efino
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Thank you for providing your information. You can now access all
                the tools and features of your plan.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button
                className="bg-[#91d02d] hover:bg-[#7bb369] text-white"
                onClick={() => router.push("/premium")}
              >
                Go to Premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-bac font-sans"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/efino%20logo%20signature-lvv872S0ayEbr64TJYlAs27dhczXRD.jpg"
          alt="Efino Logo"
          className="h-12"
        /> */}
        {/* <Button
          variant="ghost"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button> */}
      {/* </header> */}

      <main className="container mx-auto px-4 py-12 max-w-md">
        {renderStep()}
        {renderProgressBar()}
      </main>
    </div>
  );
}
