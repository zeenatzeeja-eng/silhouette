"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, lineKeyOf, toApiItem } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import CartSkeleton from "@/components/cart/CartSkeleton";

const JSON_HEADERS = { "Content-Type": "application/json" };

export default function CartPage() {
	const items = useCartStore((s) => s.items);
	const updateQty = useCartStore((s) => s.updateQty);
	const removeItem = useCartStore((s) => s.removeItem);

	const [mounted, setMounted] = useState(false);
	const [quote, setQuote] = useState(null);
	const [quoteError, setQuoteError] = useState(false);

	const itemsKey = JSON.stringify(items);

	useEffect(() => setMounted(true), []);

	// Price aur stock server se. Sirf items badalne par call hogi.
	useEffect(() => {
		if (!mounted) return;
		if (items.length === 0) {
			setQuote(null);
			setQuoteError(false);
			return;
		}

		let cancelled = false;
		fetch("/api/cart/quote", {
			method: "POST",
			headers: JSON_HEADERS,
			body: JSON.stringify({ items: items.map(toApiItem) }),
		})
			.then(async (res) => {
				const data = await res.json();
				if (cancelled) return;
				if (res.ok) {
					setQuote(data.data);
					setQuoteError(false);
				} else {
					setQuoteError(true);
				}
			})
			.catch(() => {
				if (!cancelled) setQuoteError(true);
			});

		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mounted, itemsKey]);

	// localStorage server par nahi hota, is liye mount se pehle skeleton dikhayein
	if (!mounted) {
		return (
			<section className="site-container py-12">
				<div className="mx-auto mb-10 h-6 w-40 animate-pulse bg-neutral-200" />
				<CartSkeleton />
			</section>
		);
	}

	const lines = quote?.items ?? [];
	const loading = items.length > 0 && !quote && !quoteError;

	return (
		<section className="site-container py-12">
			<h1 className="mb-10 text-center text-[24px] tracking-[0.2em]">CART</h1>

			{items.length === 0 ? (
				<div className="text-center">
					<p className="mb-6 text-[15px]">Your cart is currently empty.</p>
					<Link href="/" className="btn-primary inline-block">
						Continue shopping
					</Link>
				</div>
			) : loading ? (
				<div className="mx-auto max-w-5xl">
					<CartSkeleton rows={Math.min(items.length, 3)} />
				</div>
			) : (
				<div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_320px]">
					<ul className="divide-y divide-line">
						{lines.map((line) => {
							const key = lineKeyOf(line);
							const unavailable = line.status === "unavailable";
							const canIncrease = !unavailable && line.qty < line.stock;

							return (
								<li key={key} className="flex gap-5 py-6">
									<div className="relative h-36 w-28 shrink-0 bg-soft">
										{line.image && (
											<Image
												src={line.image}
												alt={line.name}
												fill
												sizes="112px"
												className="object-cover"
											/>
										)}
									</div>

									<div className="flex flex-1 flex-col text-[15px]">
										<div className="flex justify-between gap-4">
											<p className="uppercase tracking-[0.1em]">{line.name}</p>
											<button
												type="button"
												onClick={() => removeItem(key)}
												aria-label="Remove item"
											>
												<Trash2 size={18} strokeWidth={1.5} />
											</button>
										</div>

										{line.variant && (
											<p className="mt-1 text-black/60">{line.variant}</p>
										)}
										<p className="mt-1">{formatPrice(line.price)}</p>

										{line.status !== "ok" && (
											<p className="mt-1 text-[13px] text-sale">
												{line.message ??
													(line.status === "out_of_stock"
														? "Out of stock"
														: `Only ${line.stock} left`)}
											</p>
										)}

										<div className="mt-auto flex w-fit items-center border border-line">
											<button
												type="button"
												onClick={() => updateQty(key, line.qty - 1)}
												disabled={unavailable || line.qty <= 1}
												className="px-3 py-2 disabled:opacity-30"
												aria-label="Decrease quantity"
											>
												<Minus size={14} />
											</button>
											<span className="px-4">{line.qty}</span>
											<button
												type="button"
												onClick={() => updateQty(key, line.qty + 1)}
												disabled={!canIncrease}
												className="px-3 py-2 disabled:opacity-30"
												aria-label="Increase quantity"
											>
												<Plus size={14} />
											</button>
										</div>
									</div>
								</li>
							);
						})}
					</ul>

					<aside className="h-fit border border-line p-6">
						{quote ? (
							<>
								<div className="mb-3 flex justify-between text-[15px]">
									<span className="uppercase tracking-[0.1em]">Subtotal</span>
									<span>{formatPrice(quote.subtotal)}</span>
								</div>
								<div className="mb-3 flex justify-between text-[15px]">
									<span className="uppercase tracking-[0.1em]">Express</span>
									<span>{formatPrice(quote.expressTotal)}</span>
								</div>
								<div className="mb-4 flex justify-between text-[15px] font-semibold">
									<span className="uppercase tracking-[0.1em]">Total</span>
									<span>{formatPrice(quote.total)}</span>
								</div>
							</>
						) : (
							<p className="mb-4 text-[14px] text-sale">
								Prices load nahi ho sakay. Page refresh karke dobara dekhein.
							</p>
						)}
						<p className="mb-6 text-[13px] text-black/60">
							Shipping calculated at checkout.
						</p>
						<Link
							href="/checkout"
							className="btn-primary block w-full text-center"
						>
							Checkout
						</Link>
					</aside>
				</div>
			)}
		</section>
	);
}
