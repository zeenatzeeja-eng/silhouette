"use client";

import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { User, Search, ShoppingBag } from "lucide-react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useCartStore } from "@/store/cartStore";
import { useCartDrawer } from "@/store/cartDrawerStore";
import { menu, topLinks } from "@/data/menu";

// Search sirf tab load ho jab khule
const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });

const navLink =
	"relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100";

// Parent item: children ho to hover par dropdown dikhega
function NavItem({ item }) {
	const [open, setOpen] = useState(false);
	const children = item.children || [];

	if (children.length === 0) {
		return (
			<Link
				href={`/collections/${item.slug}`}
				prefetch={false}
				className={navLink}
			>
				{item.label}
			</Link>
		);
	}

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<Link
				href={`/collections/${item.slug}`}
				prefetch={false}
				className={`${navLink} flex items-center`}
			>
				{item.label}
				<RiArrowDropDownLine size={22} className="-ml-1" />
			</Link>

			{open && (
				<div className="absolute left-0 top-full z-30 min-w-[200px] border border-line bg-white py-3 shadow-sm">
					{children.map((c) => (
						<Link
							key={c.slug}
							href={`/collections/${item.slug}/${c.slug}`}
							prefetch={false}
							className="block px-5 py-2 text-[14px] uppercase hover:bg-soft-2"
						>
							{c.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export default function Header({ user }) {
	const [mounted, setMounted] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
	const setCartOpen = useCartDrawer((s) => s.setOpen);

	useEffect(() => setMounted(true), []);

	return (
		<header className="bg-white border-b border-line">
			<div className="site-container flex items-center justify-between py-4">
				<Link href="/" prefetch={false}>
					<Image
						src="/logo.avif"
						alt="Silhouette"
						width={160}
						height={48}
						priority
						sizes="160px"
						style={{ width: 160, height: "auto" }}
					/>
				</Link>

				<nav className="hidden lg:flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-[13px] uppercase">
					{topLinks.map((l) => (
						<Link
							key={l.slug}
							href={`/collections/${l.slug}`}
							prefetch={false}
							className={`${navLink} ${l.slug === "sale" ? "blink text-sale" : ""}`}
						>
							{l.label}
						</Link>
					))}

					{menu.map((item) => (
						<NavItem key={item.slug} item={item} />
					))}
				</nav>

				<div className="flex items-center gap-4">
					<MobileMenu />

					<Link
						href={user ? "/account" : "/account/login"}
						prefetch={false}
						aria-label="Account"
						className="flex items-center gap-2"
					>
						<User size={20} strokeWidth={1.5} />
						{user && (
							<span className="hidden text-[13px] uppercase md:inline">
								{user.firstName}
							</span>
						)}
					</Link>

					<button
						type="button"
						onClick={() => setSearchOpen(true)}
						aria-label="Search"
					>
						<Search size={20} strokeWidth={1.5} />
					</button>

					<button
						type="button"
						onClick={() => setCartOpen(true)}
						aria-label="Cart"
						className="relative"
					>
						<ShoppingBag size={20} strokeWidth={1.5} />
						{mounted && count > 0 && (
							<span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-dot" />
						)}
					</button>
				</div>
			</div>

			{searchOpen && (
				<SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
			)}
		</header>
	);
}
