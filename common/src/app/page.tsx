import { authOptions } from "@/lib/auth"
import { fetchCheck } from "@/lib/fetchData";
import { getServerSession } from "next-auth"

async function getCheck(){
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const data = await fetchCheck({ token: session.user.token });
  return data;
}

export default async function Home(){
  const data = await getCheck();
  console.log(data)
  return(
    <div>{data}</div>
  )
}