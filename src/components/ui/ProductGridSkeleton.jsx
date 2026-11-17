export default function ProductGridSkeleton({ count = 8 }) {
	return (
		<div className="grid grid-cols-2 gap-6 md:grid-cols-4" aria-busy="true">
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="space-y-3">
					<div className="aspect-[3/4] animate-pulse bg-neutral-200" />
					<div className="h-3 w-3/4 animate-pulse bg-neutral-200" />
					<div className="h-3 w-1/3 animate-pulse bg-neutral-200" />
				</div>
			))}
		</div>
	);
}
