import Brain from "@/components/Brain";
import { Redirect } from "@/components/Redirect";
import { SessionType } from "@/types/types";
import { getServerSession } from "next-auth";

export default async function BrainPage() {
  const session: SessionType = await getServerSession();
  if (!session?.user) {
    return <Redirect to={"/signin"} />;
  }
  return <Brain />;
}
