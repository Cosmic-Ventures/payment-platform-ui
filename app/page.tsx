import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingIndex() {

  
  const supabase = createClient()

  const user = await getUser(supabase)

  console.log("User in index: ", user)

  if(user) {
    redirect('/account')
  }
  else {
    redirect('/pricing')
  }

  return (
    <h1 className="text-4xl font-bold tracking-tight">Put Dashboard here.</h1>
  );
}
