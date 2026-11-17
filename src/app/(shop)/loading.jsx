import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

export default function Loading() {
	return (
		<div aria-busy="true">
			<div className="aspect-[16/7] w-full animate-pulse bg-neutral-200 md:aspect-[16/6]" />

			<section className="site-container py-10">
				<div className="mx-auto mb-8 h-6 w-56 animate-pulse bg-neutral-200" />
				<ProductGridSkeleton count={8} />
			</section>
		</div>
	);
}
