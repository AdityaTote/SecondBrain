import { fetchBrain } from "@/lib/fetchData";
import SiderBar from "./SiderBar";
import { BrainContent, SessionType } from "@/types/types";
import { getServerSession } from "next-auth";
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
      <div className="bg-gray-100 h-screen w-screen">
        <div className="fixed top-0 left-0">
          <SiderBar />
        </div>
        <div className="pl-14 pt-6 flex">
          <h1>{message}</h1>
        </div>
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
