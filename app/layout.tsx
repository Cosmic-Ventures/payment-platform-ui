import { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/Toasts/toaster";
import { PropsWithChildren, Suspense } from "react";
import { getURL } from "@/utils/helpers";
import "styles/main.css";
import { ThemeProvider } from "@/components/ui/Layout/theme-provider";

const title = "Payment Platform Demo";
const description = "Brought to you by Vercel, Stripe, and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
        {/* </ThemeProvider> */}
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
