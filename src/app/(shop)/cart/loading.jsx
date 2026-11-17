import CartSkeleton from "@/components/cart/CartSkeleton";

export default function Loading() {
	return (
		<section className="site-container py-10">
			<div className="mb-8 h-6 w-40 animate-pulse bg-neutral-200" />
			<CartSkeleton />
		</section>
	);
}
