import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { dbConnect } from "@/db";
import { compareHashPass, genHashPass } from "@/utils/hashPass";
import { User } from "@/db/user.model";
import { loginSchema } from "./schema";
import { generateJWT } from "@/utils/jwt";

function randomStringGen(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

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

            const payload = {
              id: userExist._id.toString(),
              email: userExist.email,
              username: userExist.username,
            };

            const token = generateJWT(payload);

            const user = await User.findOneAndUpdate(
              {
                _id: userExist._id.toString(),
              },
              {
                $set: {
                  token: token,
                },
              },
              { new: true }
            );

            return {
              id: user._id.toString(),
              username: user.username,
              email: user.email,
              token: user.token,
            };
          }

          const tempToken = randomStringGen(10)

          const newUser = await User.create({
            username: username,
            email: email,
            password: hashPass,
            token: tempToken,
          });

          if (!newUser) {
            return null;
          }

          const payload = {
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
          };

          const token = generateJWT(payload);

          const user = await User.findOneAndUpdate(
            {
              _id: newUser._id.toString(),
            },
            {
              $set: {
                token: token,
              },
            },
            { new: true }
          );

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            token: user.token,
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
    async signIn({ account, user }) {
      if (account?.provider === "google" && user) {
        try {
          await dbConnect();
          if (!user.name || !user.email || !user.image) {
            return false;
          }
          const username =
            user.name.replace(" ", "") || user.email.split("@")[0];
          const userExist = await User.findOne({ email: user.email });

          if (!userExist) {
            const userData = {
              username: username,
              email: user.email,
              profile_picture: user.image,
              token: randomStringGen(10),
            };

            const newUser = await User.create(userData);

            const payload = {
              id: newUser._id.toString(),
              email: newUser.email,
              username: newUser.username,
            };

            const token = generateJWT(payload);
            console.log(token)

            const updateToken = await User.findOneAndUpdate(
              {
                _id: newUser._id.toString(),
              },
              {
                $set: {
                  token: token,
                },
              },
              { new: true }
            );
            
            if (!newUser) {
              return false;
            }
            
            account.userId = updateToken._id.toString();
            account.username = updateToken.username;
            account.email = updateToken.email;
            account.token = updateToken.token;
            return true;
          }

          const payload = {
            id: userExist._id.toString(),
            email: userExist.email,
            username: userExist.username,
          };

          const token = generateJWT(payload);
          console.log(token)

          const updateToken = await User.findOneAndUpdate(
            {
              _id: userExist._id.toString(),
            },
            {
              $set: {
                token: token,
              },
            },
            { new: true }
          );

          account.userId = updateToken._id.toString();
          account.username = updateToken.username;
          account.email = updateToken.email;
          account.token = updateToken.token;
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
        token.token = account.token;
      } else if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = "username" in user ? user.username : token.username;
        token.token = "token" in user ? user.token : token.token;
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
          token: token.token,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
};
