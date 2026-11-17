"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteProgress() {
	const pathname = usePathname();
	const search = useSearchParams();
	const [active, setActive] = useState(true);
	const [done, setDone] = useState(false);
	const routeMounted = useRef(false);

	function start() {
		setDone(false);
		setActive(true);
	}

	function finish() {
		setDone(true);
		setTimeout(() => setActive(false), 300);
	}

	// Pehli baar page load: window load hone par bar khatam
	useEffect(() => {
		if (document.readyState === "complete") {
			finish();
			return;
		}
		const onLoad = () => finish();
		window.addEventListener("load", onLoad, { once: true });
		return () => window.removeEventListener("load", onLoad);
	}, []);

	// Route badle: naya page commit hone ke baad bar khatam
	useEffect(() => {
		if (!routeMounted.current) {
			routeMounted.current = true;
			return;
		}
		const raf = requestAnimationFrame(() => requestAnimationFrame(finish));
		return () => cancelAnimationFrame(raf);
	}, [pathname, search]);

	// Link click par bar shuru
	useEffect(() => {
		function onClick(e) {
			const a = e.target.closest?.("a[href]");
			if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey)
				return;

			const url = new URL(a.href);
			if (url.origin !== window.location.origin) return;
			if (
				url.pathname + url.search ===
				window.location.pathname + window.location.search
			)
				return;

			start();
		}

		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

	if (!active) return null;

	return (
		<div
			aria-hidden="true"
			className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-black transition-transform duration-300"
			style={{ transform: done ? "scaleX(1)" : "scaleX(0.6)" }}
		/>
	);
}
