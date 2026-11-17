import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

function escapeRegex(text) {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function searchProducts(query, limit = 8) {
	const q = String(query ?? "")
		.trim()
		.slice(0, 60);
	if (q.length < 2) return [];

	await connectDB();
	const pattern = new RegExp(escapeRegex(q), "i");

	return Product.find({
		isActive: true,
		$or: [{ name: pattern }, { color: pattern }, { style: pattern }],
	})
		.sort({ createdAt: -1 })
		.limit(limit)
		.select("name slug images minPrice minSalePrice onSale")
		.lean();
}
