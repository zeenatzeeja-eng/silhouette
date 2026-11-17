import { Suspense } from "react";
import ProductRow from "@/components/home/ProductRow";
import ProductRowSkeleton from "@/components/ui/ProductRowSkeleton";
import { listHomeSections } from "@/services/homeSectionService";
import { listProductsByCollection } from "@/services/productService";

// Har row apna products khud load karti hai, is liye baaki rows ka intezar nahi hota
async function HomeRow({ section: s }) {
	const products = JSON.parse(
		JSON.stringify(await listProductsByCollection(s.collection)),
	);

	if (products.length === 0) return null;

	return (
		<ProductRow
			title={s.title}
			products={products}
			viewAll={
				s.showViewAll
					? {
							href: `/collections/${s.collection}`,
							label: "View All",
							variant: s.viewAllStyle,
						}
					: undefined
			}
		/>
	);
}

export default async function HomeRows() {
	const sections = JSON.parse(JSON.stringify(await listHomeSections()));

	return sections.map((s) => (
		<Suspense key={s._id} fallback={<ProductRowSkeleton title={s.title} />}>
			<HomeRow section={s} />
		</Suspense>
	));
}
