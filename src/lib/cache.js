import { unstable_cache } from "next/cache";
import { getSettings } from "@/services/settingService";
import { getProductBySlug } from "@/services/productService";

// ObjectId aur Date ko cache ke liye plain values banata hai
const plain = (value) => JSON.parse(JSON.stringify(value));

export const getCachedSettings = unstable_cache(
	async () => plain(await getSettings()),
	["site-settings"],
	{ revalidate: 60 },
);

export function getCachedProductBySlug(slug) {
	return unstable_cache(
		async () => plain(await getProductBySlug(slug)),
		["product", slug],
		{ revalidate: 60 },
	)();
}
