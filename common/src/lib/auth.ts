import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compareHashPass, genHashPass } from "../utils/hashPass";
import { User } from "../db/user.model";
import type { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/db";
import { loginSchema } from "./schema";

// interface CustomToken {
//   id: string;
//   email: string;
//   username: string;
// }

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "email and password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const cred = loginSchema.safeParse(credentials);

          if (!cred.success) {
            return null;
          }

          const { username, email, password } = cred.data;
          // const username = credentials?.username as string;
          // const email = credentials?.email as string;
          // const password = credentials?.password as string;

          if (!email || !password || !username) {
            return null;
          }

          const hashPass = await genHashPass(password);

          const userExist = await User.findOne({ email });

          if (userExist) {
            const isMatch = await compareHashPass(password, userExist.password);

            if (!isMatch) {
              return null;
            }

            return {
              id: userExist._id.toString(),
              username: userExist.username,
              email: userExist.email,
            };
          }

          const user = await User.create({
            username: username,
            email: email,
            password: hashPass,
          });

          if (!user) {
            return null;
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          };
        } catch (e) {
          console.log(e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          await dbConnect();
          if (!user.name || !user.email || !user.image) {
            return false;
          }
          const username = user.name.replace(" ","") || user.email.split("@")[0];
          const userExist = await User.findOne({ email: user.email });

          if (!userExist) {
            const userData = {
              username: username,
              email: profile.email,
              profile_picture: user.image,
            };

            const newUser = await User.create(userData);

            if (!newUser) {
              return false;
            }

            account.userId = newUser._id.toString();
            account.username = newUser.username;
            account.email = newUser.email;
            return true;
          }

          account.userId = userExist._id.toString();
          account.username = userExist.username;
          account.email = userExist.email;
          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account?.provider === "google") {
        token.id = account.userId;
        token.username = account.username;
        token.email = account.email as string;
      } else if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = "username" in user ? user.username : token.username;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          email: token.email,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
};