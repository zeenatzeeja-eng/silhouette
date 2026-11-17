import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import HomeRows from "@/components/home/HomeRows";
import ShowcaseGrid from "@/components/home/ShowcaseGrid";
import ShopByEvent from "@/components/home/ShopByEvent";
import InstagramGrid from "@/components/home/InstagramGrid";
import Newsletter from "@/components/home/Newsletter";
import ProductRowSkeleton from "@/components/ui/ProductRowSkeleton";
import { heroSlides } from "@/data/hero";
import { showcase } from "@/data/showcase";

export default function HomePage() {
	return (
		<>
			<HeroSlider slides={heroSlides} />

			<Suspense
				fallback={
					<>
						<ProductRowSkeleton />
						<ProductRowSkeleton />
					</>
				}
			>
				<HomeRows />
			</Suspense>

			<ShowcaseGrid {...showcase} />

			<Suspense fallback={<ProductRowSkeleton />}>
				<ShopByEvent />
			</Suspense>

			<InstagramGrid />

			<Newsletter />
		</>
	);
}
