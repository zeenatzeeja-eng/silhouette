import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";

export default function ProductRowSkeleton({ title }) {
	return (
		<section className="site-container py-10" aria-busy="true">
			{title ? (
				<h2 className="mb-8 text-center text-[15px] uppercase tracking-[0.2em]">
					{title}
				</h2>
			) : (
				<div className="mx-auto mb-8 h-6 w-48 animate-pulse bg-neutral-200" />
			)}
			<ProductGridSkeleton count={4} />
		</section>
	);
}
