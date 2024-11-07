import OnboardingFlow from "@/components/ui/Onboarding/onboarding-flow";
import React from "react";

export default function OnboardingIndex() {
  return (
    <div className="w-screen min-h-screen border border-zinc-700 p-4">
      {/* <p className="text-2xl font-bold tracking-tight">Onboarding</p>/ */}
      <OnboardingFlow />
    </div>
  );
}
