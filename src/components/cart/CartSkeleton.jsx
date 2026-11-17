export default function CartSkeleton({ rows = 2 }) {
	return (
		<div className="space-y-6" aria-busy="true">
			{Array.from({ length: rows }).map((_, i) => (
				<div key={i} className="flex gap-4 border-b border-line pb-6">
					<div className="h-28 w-20 shrink-0 animate-pulse bg-neutral-200" />
					<div className="flex-1 space-y-3">
						<div className="h-4 w-2/3 animate-pulse bg-neutral-200" />
						<div className="h-3 w-1/3 animate-pulse bg-neutral-200" />
						<div className="h-3 w-1/4 animate-pulse bg-neutral-200" />
					</div>
				</div>
			))}

			<div className="space-y-3">
				<div className="h-4 w-full animate-pulse bg-neutral-200" />
				<div className="h-10 w-full animate-pulse bg-neutral-200" />
			</div>
		</div>
	);
}
