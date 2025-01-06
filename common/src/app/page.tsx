import { authOptions } from "@/lib/auth"
import { fetchCheck } from "@/lib/fetchData";
import { SessionType } from "@/types/types";
import { getServerSession } from "next-auth"

async function getCheck(){
  const session: SessionType = await getServerSession(authOptions);
    const token = session?.user.token || "";
    const {
      error,
      message,
      data,
    }: {
      error: boolean;
      message: string;
      data: string;
    } = await fetchCheck({ token: token });
    return { error, message, data };
}

export default async function Home(){
  const { error, message, data } = await getCheck();
  if(error === false && data !== null){
    return(
      <div>{data}</div>
    )
  }
  if(error === true && data === null){
    return(
      <div>{message}</div>
    )
  }
}