"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ slides }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	// Pehli render (server) par sirf pehli image, phir Swiper
	if (!mounted) {
		const first = slides[0];
		return (
			<div className="relative w-full">
				<Image
					src={first.image}
					alt={first.alt}
					width={1920}
					height={900}
					sizes="100vw"
					className="h-auto w-full"
					priority
				/>
			</div>
		);
	}

	return (
		<Swiper
			modules={[Autoplay, Pagination]}
			loop={slides.length > 1}
			autoplay={{ delay: 5000, disableOnInteraction: false }}
			pagination={{ clickable: true }}
			className="hero-swiper"
		>
			{slides.map((s, i) => (
				<SwiperSlide key={s.id}>
					<div className="relative w-full">
						<Image
							src={s.image}
							alt={s.alt}
							width={1920}
							height={900}
							sizes="100vw"
							className="h-auto w-full"
							priority={i === 0}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
