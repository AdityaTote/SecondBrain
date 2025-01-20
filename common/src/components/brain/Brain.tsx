import { getServerSession } from "next-auth";
import { fetchBrain } from "@/lib/fetchData";
import { BrainContent, SessionType } from "@/types/types";
import { authOptions } from "@/lib/auth";
import BrainData from "./BrainData";

const getUser = async () => {
  const session: SessionType = await getServerSession(authOptions);
  return session?.user;
};

const getBrain = async () => {
  const user = await getUser();
  const token = user?.token || "";
  const {
    error,
    message,
    data,
  }: {
    error: boolean;
    message: string;
    data: BrainContent[];
  } = await fetchBrain({ token: token });
  return { error, message, data };
};

export default async function Brain() {
  const { error, message, data } = await getBrain();

  if (error === true && data === null) {
    return (
        <div className="pl-14 pt-6 flex">
          <h1>{message}</h1>
        </div>
    );
  }

  if (error === false && data !== null) {
    const user = await getUser();
    if (user) {
      return <BrainData user={user} data={data} />;
    }
  }
}
