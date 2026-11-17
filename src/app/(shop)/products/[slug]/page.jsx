import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ReviewSection from "@/components/product/Reviews";
import SimilarProducts from "@/components/product/SimilarProducts";
import ProductRowSkeleton from "@/components/ui/ProductRowSkeleton";
import { getCachedProductBySlug, getCachedSettings } from "@/lib/cache";
import { getCurrentUser } from "@/lib/session";
import { AppError } from "@/lib/errors";
import { getSimilarProducts } from "@/services/similarProductService";
import { listReviews } from "@/services/reviewService";

// Reviews aur user ek saath aate hain, page ka baaki hissa inka intezar nahi karta
async function ReviewsBlock({ productId, product }) {
	const [reviews, user] = await Promise.all([
		listReviews(productId).then((r) => JSON.parse(JSON.stringify(r))),
		getCurrentUser(),
	]);

	return (
		<section className="site-container pb-16">
			<ReviewSection
				productId={productId}
				avgRating={product.avgRating ?? 0}
				reviewCount={product.reviewCount ?? 0}
				reviews={reviews}
				loggedInName={user?.firstName ?? null}
			/>
		</section>
	);
}

async function SimilarBlock({ product }) {
	const similar = JSON.parse(JSON.stringify(await getSimilarProducts(product)));
	return <SimilarProducts products={similar} />;
}

function ReviewsFallback() {
	return (
		<section className="site-container pb-16" aria-busy="true">
			<div className="mb-6 h-6 w-40 animate-pulse bg-neutral-200" />
			<div className="h-24 w-full animate-pulse bg-neutral-200" />
		</section>
	);
}

export default async function ProductPage({ params, searchParams }) {
	const { slug } = await params;
	const { sale } = await searchParams;
	const saleView = sale === "1";

	let product;
	try {
		product = await getCachedProductBySlug(slug);
	} catch (error) {
		if (error instanceof AppError && error.status === 404) notFound();
		throw error;
	}

	const productId = String(product._id);
	const settings = await getCachedSettings();

	return (
		<>
			<section className="site-container py-8 md:py-10">
				<nav className="mb-8 text-[11px] uppercase tracking-[0.12em] text-black/60">
					<Link href="/" prefetch={false} className="hover:text-black">
						Home
					</Link>
					<span className="mx-2">&gt;</span>
					<span className="text-black">{product.name}</span>
				</nav>

				<div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
					<ProductGallery images={product.images} name={product.name} />

					<ProductPurchase
						product={product}
						saleView={saleView}
						settings={settings}
					/>
				</div>
			</section>

			<Suspense fallback={<ReviewsFallback />}>
				<ReviewsBlock productId={productId} product={product} />
			</Suspense>

			<Suspense fallback={<ProductRowSkeleton />}>
				<SimilarBlock product={product} />
			</Suspense>
		</>
	);
}
