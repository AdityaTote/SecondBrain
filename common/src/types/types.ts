import { DefaultSession } from "next-auth";
import { contentSchema } from "./schema";
import { z } from "zod";

export interface UserType {
  id: string;
  username: string;
  email: string;
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }
}

interface Session {
  user: {
    id: string;
    username: string;
    email: string;
    token: string;
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

export type ContentType = z.infer<typeof contentSchema>