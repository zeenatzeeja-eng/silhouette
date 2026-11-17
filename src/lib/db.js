import mongoose from "mongoose";

// Dev mode mein file baar baar reload hoti hai, is liye connection global mein save karte hain
let cached = global.mongoose;
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
	if (cached.conn) return cached.conn;

	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error("MONGODB_URI .env.local mein set nahi hai");

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(uri, {
				bufferCommands: false,
				maxPoolSize: 10,
				serverSelectionTimeoutMS: 5000,
			})
			.catch((err) => {
				cached.promise = null; // error par agli request dobara try kare
				throw err;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
