"use client";

import Link from "next/link";
import { SignOut } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import Logo from "@/components/icons/Logo";
import { usePathname, useRouter } from "next/navigation";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import s from "./Navbar.module.css";
import { ModeToggle } from "../Layout/theme-toggle";

interface NavlinksProps {
  user?: any;
  planTypes: {
    premium: boolean | undefined;
    basic: boolean | undefined;
    unsubbed: boolean | undefined;
  };
}

export default function Navlinks({ user, planTypes }: NavlinksProps) {
  const router = getRedirectMethod() === "client" ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/pricing" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/pricing" className={s.link}>
            Pricing
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
          {user && planTypes.premium && (
            <Link href={"/premium"} className={s.link}>
              Premium
            </Link>
          )}

          {user && planTypes.basic && (
            <Link href={"/demo"} className={s.link}>
              Demo
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
