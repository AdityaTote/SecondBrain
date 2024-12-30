import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compareHashPass, genHashPass } from "../utils/hashPass";
import { User } from "../db/user.model";
import type { NextAuthOptions } from "next-auth";
import {  dbConnect } from "@/db";

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
          const username = credentials?.username as string;
          const email = credentials?.email as string;
          const password = credentials?.password as string;

          console.log(username, email, password);

          if (!email || !password || !username) {
            return null;
          }
          const hashPass = await genHashPass(password);

          const userExist = await User.findOne({ email });

          if (userExist) {

            const isMatch = await compareHashPass(password, userExist.password);

            if(!isMatch){
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
      if (account?.provider === "google") {
        try {
          await dbConnect();
          const userExist = await User.findOne({ email: profile?.email });
          console.log(`Account: ${JSON.stringify(account)}`)
          console.log(`Profile: ${JSON.stringify(profile)}`)
          console.log(`User: ${JSON.stringify(user)}`)
          console.log(`Profile pic: ${profile?.image}`)

          if (!userExist) {
            const newUser = await User.create({
              username: profile?.name,
              email: profile?.email,
              profilePic: profile?.image || "",
            });

            if (!newUser) {
              return false;
            }
          }
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        if ("username" in user) {
          token.username = user.username;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin"
  }
};
