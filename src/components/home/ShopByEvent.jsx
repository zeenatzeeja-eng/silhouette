import Link from "next/link";
import Image from "next/image";
import { events } from "@/data/events";
import { getNavigation, getCollectionPage } from "@/services/collectionService";
import { cloudinaryUrl, isCloudinary } from "@/lib/cloudinaryUrl";

export default async function ShopByEvent() {
	// DB se "shop-by-events" parent ke active children
	const nav = await getNavigation();
	const parent = nav.find((p) => p.slug === "shop-by-events");
	const children = parent?.children ?? [];

	// Har child ki pehli product ki image, na ho to events.js ki fallback image
	const cards = await Promise.all(
		children.map(async (c) => {
			const page = await getCollectionPage("shop-by-events", c.slug);
			const firstImage = page?.products?.[0]?.images?.[0];
			const fallback = events.find((e) => e.slug === c.slug)?.image;
			return {
				slug: c.slug,
				label: c.name,
				image: firstImage ?? fallback ?? null,
			};
		}),
	);

	const visible = cards.filter((c) => c.image);
	if (visible.length === 0) return null;

	return (
		<section className="site-container py-12">
			<h2 className="mb-8 text-center text-[18px]">Shop by Event</h2>

			<div className="grid grid-cols-2 gap-[17px] md:grid-cols-3 lg:grid-cols-5">
				{visible.map((c) => {
					const cloud = isCloudinary(c.image);
					const src = cloud ? cloudinaryUrl(c.image, { width: 600 }) : c.image;

					return (
						<Link
							key={c.slug}
							href={`/collections/shop-by-events/${c.slug}`}
							prefetch={false}
							className="group relative block aspect-[3/4] overflow-hidden bg-soft-2"
						>
							<Image
								src={src}
								alt={c.label}
								fill
								unoptimized={cloud}
								sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-x-0 bottom-5 flex justify-center">
								<span className="bg-white px-3 py-1.5 text-[13px] uppercase tracking-[0.2em] text-black">
									{c.label}
								</span>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
