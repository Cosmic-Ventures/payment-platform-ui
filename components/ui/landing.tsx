import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-screen min-h-screen p-4 flex flex-col gap-y-10 items-center justify-center">
      <p className="text-4xl font-bold tracking-tighter">Hello, World!</p>
      <div className="flex gap-x-5 px-4">
        <Link
          href={"/signin"}
          className="h-max w-32 flex justify-center p-5 rounded-lg bg-slate-500 text-lg font-semibold tracking-tight"
        >
          Sign In
        </Link>
        <Link
          href={"/signin/signup"}
          className="h-max w-32 flex justify-center p-5 rounded-lg bg-slate-500 text-lg font-semibold tracking-tight"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
