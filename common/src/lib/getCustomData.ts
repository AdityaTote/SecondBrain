import { SessionType } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getTagTitle } from "./fetchData";

export const getUser = async () => {
  const session: SessionType = await getServerSession(authOptions);
  return session?.user;
};

export async function getTitle(id: string) {
  const { data } = await getTagTitle(id);
  return data;
}