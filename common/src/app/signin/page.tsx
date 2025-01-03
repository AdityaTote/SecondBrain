import Signin from "@/components/Sigin";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (session?.user) {
    redirect("/brain");
  }
  return <Signin />;
}