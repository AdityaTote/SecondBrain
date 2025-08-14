import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

// Declare global interface for mongoose cache
declare global {
	var mongoose:
		| {
				conn: mongoose.Connection | null;
				promise: Promise<mongoose.Connection> | null;
		  }
		| undefined;
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
	if (cached!.conn) {
		return cached!.conn;
	}

	if (!cached!.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose.connection;
		});
	}

	try {
		cached!.conn = await cached!.promise;
	} catch (e) {
		cached!.promise = null;
		throw e;
	}

	return cached!.conn;
}
