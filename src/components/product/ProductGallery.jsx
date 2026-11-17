"use client";

import Image from "next/image";
import { useState } from "react";
import { cloudinaryUrl, isCloudinary } from "@/lib/cloudinaryUrl";
export default function ProductGallery({ images, name }) {
	const [active, setActive] = useState(0);

	const mainSrc = images[active];

	return (
		<div className="flex flex-col-reverse gap-3 md:flex-row md:items-start">
			<div className="flex gap-3 md:flex-col">
				{images.map((src, i) => (
					<button
						key={src + i}
						type="button"
						onClick={() => setActive(i)}
						className={`relative h-20 w-16 shrink-0 border ${
							i === active ? "border-black" : "border-line"
						}`}
					>
						<Image
							src={cloudinaryUrl(src, { width: 160 })}
							alt={`${name} ${i + 1}`}
							fill
							unoptimized={isCloudinary(src)}
							loading="lazy"
							sizes="64px"
							className="object-cover"
						/>
					</button>
				))}
			</div>

			<div className="relative aspect-[3/4] flex-1 overflow-hidden bg-soft">
				<Image
					src={cloudinaryUrl(mainSrc, { width: 1000 })}
					alt={name}
					fill
					priority
					unoptimized={isCloudinary(mainSrc)}
					sizes="(min-width: 768px) 50vw, 100vw"
					className="object-cover"
				/>
			</div>
		</div>
	);
}
