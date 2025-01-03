import { DefaultSession } from "next-auth";

interface UserType {
  id: string;
  username: string;
  email: string;
}

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }
}

interface Session {
  user: {
    name: string;
    email: string;
    image?: string;
    id: string;
    username?: string;
  };
}

export type SessionType = Session | null;

export interface BrainContent {
  _id: {
    // @ts-ignore
    $oid: string | any
  };
  title: string;
  link: string;
  types: "youtube" | "twitter";
  tags: string[];
  user_id: string;
  created_at: {
    $date: string
  };
  updated_at: {
    $date: string;
  }
}
