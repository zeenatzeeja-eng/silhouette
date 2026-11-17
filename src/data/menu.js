export const announcements = [
	"We offer worldwide shipping.",
	"For bookings: 03154204981 / 03310397865",
	"Free shipping all over world on $500 and above orders",
];

// DB ke collection / childCollection ke hisaab se
export const menu = [
	{
		label: "New Arrivals",
		slug: "new-arrivals",
		children: [
			{ label: "Silk Solids '26", slug: "silk-solids-26" },
			{ label: "Raha Eid Pret '26", slug: "raha-eid-pret-26", highlight: true },
			{
				label: "Lumiere Luxury Formals '26",
				slug: "lumiere-luxury-formals-26",
			},
			{ label: "Maahi II Luxury Eid Pret", slug: "maahi-ii-luxury-eid-pret" },
		],
	},
	{
		label: "Bridals",
		slug: "bridals",
		children: [
			{ label: "Husan Ara - Bridal '25", slug: "husan-ara-bridal-25" },
			{ label: "Anarkali - Bridal '24", slug: "anarkali-bridal-24" },
			{ label: "Noor Jahan - Bridal '23", slug: "noor-jahan-bridal-23" },
			{ label: "Roshanara - Bridal '22", slug: "roshanara-bridal-22" },
		],
	},
	{
		label: "Formal",
		slug: "formal",
		children: [
			{ label: "Meeras", slug: "meeras" },
			{ label: "Zarqa", slug: "zarqa" },
			{ label: "Riwaj Formals", slug: "riwaj-formals" },
			{ label: "Rang-e-Bahar", slug: "rang-e-bahar" },
			{ label: "Tosha Kinari", slug: "tosha-kinari" },
			{ label: "SHAWL COLLECTION", slug: "shawl-collection" },
		],
	},

	{
		label: "LUXURY PRET",
		slug: "formal",
		children: [
			{ label: "MAAHI LUXURY PRET", slug: "meeras" },
			{ label: "SILK SOLID'S 26 ", slug: "zarqa" },
			{ label: "MAAHI LUXURY PRET '25 ", slug: "tosha-kinari" },
			{ label: "LUXE", slug: "noor-jahan-bridal-23" },
			{ label: "OPAL", slug: "noor-jahan-bridal-23" },
			{ label: "RIWAJ LUXURY PRET", slug: "silk-solids-26" },
		],
	},

	{
		label: " PRET",
		slug: "formal",
		children: [{ label: "RAHA EID PRET '26 ", slug: "raha-eid-pret-26" }],
	},

	{
		label: "Shop by Events",
		slug: "shop-by-events",
		children: [
			{ label: "Engagement", slug: "engagement" },
			{ label: "Mehndi", slug: "mehndi" },
			{ label: "Nikkah", slug: "nikkah" },
			{ label: "Barat", slug: "barat" },
			{ label: "Walima", slug: "walima" },
		],
	},

	{
		label: "ACCESSORIES",
		slug: "shop-by-events",
		children: [{ label: "CLUTCHES & POUTCHES", slug: "clutches-pouches" }],
	},
];

// Dropdown nahi, direct links
export const topLinks = [
	{ label: "Sale", slug: "sale", highlight: true },
	{ label: "Maahi II Luxury Eid Pret", slug: "maahi-ii-luxury-eid-pret" },
	{ label: "Best Sellers", slug: "best-sellers" },
	{ label: "SPOOTED", slug: "spooted" },
];

export const footerLinks = [
	{ label: "Privacy Policy", slug: "privacy-policy" },
	{ label: "Made-to-Order Policy", slug: "made-to-order-policy" },
	{
		label: "Exchange, Refund & Cancelation Policy",
		slug: "exchange-refund-policy",
	},
	{ label: "Terms and Conditions", slug: "terms-and-conditions" },
	{ label: "Brand Story", slug: "brand-story" },
	{ label: "Shipping Policy", slug: "shipping-policy" },
	{ label: "Contact Us", slug: "contact" },
	{ label: "FAQs", slug: "faqs" },
];

export const contact = {
	pakistan: {
		office: "327-B, Street 7, Lane 15, Cavalry Ground, Lahore",
		studio: "Sillhouete, Almas Tower, MM Alam Rd, Block T, Gulberg 2, Lahore",
		phone: "+92 331 0397865",
	},
	usa: {
		company: "ADVENT BUSINESS CONSULTAX LLC",
		address: "18w100 22nd St, Ste 124, Oakbrook Terrace, IL, Zip Code 60181",
		phone: "+1 217 2909383",
	},
	email: "info@sillhouete.com",
};
