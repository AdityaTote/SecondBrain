import { DefaultSession } from "next-auth";

interface UserType {
  id: string;
  username: string;
  email: string;
}

declare module "next-auth" {
    interface Session {
        user: UserType & DefaultSession["user"]
    }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//       id: string;
//       username: string;
//       email: string;
//     }
//   }
