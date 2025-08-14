import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { userSchema } from "@/types/schema";
import { dbConnect } from "../db/connectDb";
import { compareHashPass, genHashPass } from "../utils/hashPass";
import { generateJWT } from "../utils/jwt";
import { User } from "../db/user.models";

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
					const cred = userSchema.safeParse(credentials);

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

					const tempToken = randomStringGen(10);

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
					if (user.email === null || user.name === null) {
						return false;
					}
					const email = user.email as string;
					const username =
						(user.name?.replace(" ", "") as string) ||
						(user.email?.split("@")[0] as string);
					const profileImage = (user.image as string) || "";
					const userExist = await User.findOne({ email: email });
					if (!userExist) {
						const tempToken = randomStringGen(20);
						const newUser = await User.create({
							username: username,
							email: email,
							profileImage: profileImage,
							token: tempToken,
						});
						if (!newUser) {
							return false;
						}
						const payload = {
							id: newUser._id.toString(),
							email: newUser.email,
							username: newUser.username,
						};
						const token = generateJWT(payload);
						const updatedToken = await User.findOneAndUpdate(
							{
								_id: newUser._id,
							},
							{
								$set: {
									token: token,
								},
							},
							{ new: true }
						);

						if (!updatedToken) {
							return false;
						}

						account.userId = updatedToken._id.toString();
						account.username = updatedToken.username;
						account.email = updatedToken.email;
						account.token = updatedToken.token;
						return true;
					}
					const payload = {
						id: userExist._id.toString(),
						email: userExist.email,
						username: userExist.username,
					};

					const token = generateJWT(payload);

					const updatedToken = await User.findOneAndUpdate(
						{
							_id: userExist._id,
						},
						{
							$set: {
								token: token,
							},
						},
						{ new: true }
					);

					if (!updatedToken) {
						return false;
					}

					account.userId = updatedToken._id.toString();
					account.username = updatedToken.username;
					account.email = updatedToken.email;
					account.token = updatedToken.token;
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
