/**
 * EN keyword landing copy — source of truth for primary SEO URLs (pubg-hack.org).
 */

export type KeywordInternalLink = { href: string; label: string };

export type KeywordSection = {
	h2: string;
	paragraphs: string[];
	list?: string[];
};

export type KeywordPageSchema =
	| 'website-organization'
	| 'collection-itemlist'
	| 'article-itemlist'
	| 'article-faq';

export type KeywordPageConfig = {
	path: string;
	primaryKeyword: string;
	title: string;
	description: string;
	h1: string;
	/** Opening paragraph — primary keyword appears once here */
	intro: string;
	sections: KeywordSection[];
	internalLinks: KeywordInternalLink[];
	imageAlt: (feature: string) => string;
	schema: KeywordPageSchema;
	/** Visible FAQ blocks — FAQPage JSON-LD only when present */
	faqs?: { question: string; answer: string }[];
};

const paths = {
	home: '/',
	pubgCheats: '/pubg-cheats/',
	price: '/pubg-cheat-price/',
	best: '/best-pubg-cheats/',
	reviews: '/pubg-cheat-reviews/',
	aimbot: '/pubg-aimbot/',
	esp: '/pubg-esp/',
} as const;

export const pubgKeywordPages: Record<
	'home' | 'pubgCheats' | 'price' | 'best' | 'reviews' | 'aimbot' | 'esp',
	KeywordPageConfig
> = {
	home: {
		path: paths.home,
		primaryKeyword: 'PUBG hack',
		title: 'PUBG Hack & Cheats – Compare Current Options',
		description:
			'Compare PUBG hack and cheat options, features, pricing, and reviews. Explore available options and choose the right fit.',
		h1: 'PUBG Hacks',
		intro:
			'This hub compares current PUBG hack options for PC — including how popular PUBG hacks differ on features, pricing, and support — so you can pick a license that matches how you play.',
		sections: [
			{
				h2: 'PUBG Hack Options Compared',
				paragraphs: [
					'A PUBG hack can mean player ESP, loot filters, aim assist, or a bundle that includes several modules. This site compares what our license includes against the questions buyers usually ask before checkout.',
					'Use the guides below to see features, plan lengths, and how BattlEye maintenance is communicated after patches — without relying on hype or ban promises.',
				],
			},
			{
				h2: 'PUBG Cheat Features',
				paragraphs: [
					'Our package focuses on visibility: player ESP with boxes and skeleton options, loot ESP with category filters, and world overlays for vehicles, care packages, and corpses.',
					'Full toggle lists live on the Features page. Compare them to what you need for ranked or casual battle royale sessions on Windows PC.',
				],
			},
			{
				h2: 'PUBG Cheats for PC',
				paragraphs: [
					'Cheats for PUBG on Steam target Windows 10 and 11. Licenses deliver digitally after payment; setup walks through loader steps and overlay toggles.',
					'If you are comparing pubg battlegrounds hacks from several sites, verify BattlEye maintenance notes and support email before you load in after a patch.',
				],
			},
			{
				h2: 'PUBG Cheat Pricing',
				paragraphs: [
					'Many providers sell by license length — daily, weekly, monthly, or lifetime. We publish monthly and lifetime plans with the same feature stack so you can match budget to how often you play.',
					'See the pricing comparison page for plan details and what to verify before you buy.',
				],
			},
			{
				h2: 'How to Compare PUBG Cheats',
				paragraphs: [
					'Start with feature coverage (player, loot, and world ESP), then compare license duration, support channels, and how rebuilds are announced after anti-cheat updates.',
					'Read buyer reviews for setup experience, and use the best-cheats comparison for side-by-side notes — not a single “winner” claim.',
				],
			},
		],
		internalLinks: [
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.best, label: 'Best PUBG cheats' },
			{ href: paths.reviews, label: 'PUBG cheat reviews' },
		],
		imageAlt: (feature) => `PUBG hack interface showing ${feature}`,
		schema: 'website-organization',
	},
	pubgCheats: {
		path: paths.pubgCheats,
		primaryKeyword: 'buy PUBG cheats',
		title: 'Buy PUBG Cheats for PC | Current Options',
		description:
			'Compare PUBG cheats for PC by features, pricing, platform support, and license length. Review available options before you buy.',
		h1: 'Buy PUBG Cheats',
		intro:
			'When you buy PUBG cheats for PC, compare feature depth, license length, and how the seller handles BattlEye updates before you checkout.',
		sections: [
			{
				h2: 'PUBG Cheats for PC',
				paragraphs: [
					'Buying PUBG cheats for PC should start with platform support and delivery: Windows 10/11, digital license email, and a setup guide you can follow without Discord-only support.',
					'Players who search cheat PUBG or similar phrases still need the same checks — feature list, license length, and how updates are published after BattlEye patches.',
				],
			},
			{
				h2: 'Available Cheat Features',
				paragraphs: [
					'Player ESP covers boxes, health, skeleton, equipment, and distance controls. Loot ESP filters weapons, meds, attachments, and grenades. World ESP adds vehicles, airdrops, corpses, and thrown grenades.',
					'Open the Features page for the complete control list before you purchase.',
				],
			},
			{
				h2: 'Aimbot, ESP & Radar Options',
				paragraphs: [
					'Searchers often group aimbot, ESP, and radar together. Our license emphasizes ESP depth first; radar-style awareness is covered through player and world overlays rather than a separate radar-only SKU.',
					'Compare aimbot-focused pages only if you need targeting assist — many squads prioritize information overlays for rotations and loot speed.',
				],
			},
			{
				h2: 'License Lengths & Pricing',
				paragraphs: [
					'License length is one of the biggest pricing variables in this niche. We sell monthly ($35) and lifetime ($150) tiers with identical features.',
					'If you are comparing other shops, note whether they charge extra for loot ESP or world markers before you judge a headline price.',
				],
			},
			{
				h2: 'What to Check Before Buying',
				paragraphs: [
					'Confirm BattlEye maintenance notes, refund terms, and support email before checkout. Avoid sellers that promise permanent safety or “no ban” outcomes — Krafton continues to update anti-cheat enforcement.',
					'Use reviews and the pricing page to sanity-check delivery times and setup difficulty.',
				],
			},
		],
		internalLinks: [
			{ href: paths.price, label: 'PUBG cheat prices' },
			{ href: paths.best, label: 'Best PUBG cheats' },
			{ href: paths.aimbot, label: 'PUBG aimbot' },
		],
		imageAlt: (feature) => `PUBG cheats for PC product screenshot – ${feature}`,
		schema: 'collection-itemlist',
	},
	price: {
		path: paths.price,
		primaryKeyword: 'PUBG cheat price',
		title: 'PUBG Cheat Price & Plans | Daily, Monthly, Lifetime',
		description:
			'Compare PUBG cheat prices, license durations, and plan features. Check daily, weekly, monthly, and lifetime options before buying.',
		h1: 'PUBG Cheat Price & Plans',
		intro:
			'PUBG cheat price varies by license duration and bundled modules. Use this page to compare monthly, lifetime, and short-term options before you pay.',
		sections: [
			{
				h2: 'PUBG Hack Price Comparison',
				paragraphs: [
					'Headline cost depends on how long the license lasts and which modules are bundled. Some vendors sell ESP-only keys; others include loot and world overlays in one package.',
					'Our published rates are $35 per month and $150 lifetime, both with the same feature set listed on Features.',
				],
			},
			{
				h2: 'Daily, Weekly & Monthly Plans',
				paragraphs: [
					'Daily and weekly keys are common in the market when you only want to test a build for a weekend. We focus on monthly access for recurring players who want maintenance included during the term.',
					'When you compare shops, convert every quote to “price per day” and check whether rebuilds after patches are included.',
				],
			},
			{
				h2: 'Monthly vs Lifetime Licenses',
				paragraphs: [
					'Monthly fits short seasons or trial periods. Lifetime suits players who expect to return across multiple patches and prefer one upfront payment.',
					'Neither plan changes the feature list — only how long you can download maintenance builds while your license stays active.',
				],
			},
			{
				h2: 'What Affects PUBG Cheat Pricing',
				paragraphs: [
					'Module count, support level, and how often the team ships BattlEye-compatible rebuilds all influence what vendors charge.',
					'Resellers with minimal documentation sometimes undercut on price but hide extra fees for loot ESP or priority support.',
				],
			},
			{
				h2: 'Pricing Questions',
				paragraphs: [
					'See the FAQ below for billing, refunds, and currency. Email support with your order ID if a charge does not match the plan you selected.',
				],
			},
		],
		internalLinks: [
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.best, label: 'Best PUBG cheats' },
			{ href: paths.reviews, label: 'PUBG cheat reviews' },
		],
		imageAlt: (feature) => `PUBG cheat pricing comparison for ${feature}`,
		schema: 'article-faq',
		faqs: [
			{
				question: 'What PUBG cheat price plans do you sell?',
				answer:
					'We list monthly ($35 USD) and lifetime ($150 USD) licenses. Both include the same player, loot, and world ESP features on Windows PC.',
			},
			{
				question: 'Do you offer daily or weekly keys?',
				answer:
					'Our store focuses on monthly and lifetime lengths. If you only need a short test window, compare other providers — and verify what happens after a BattlEye patch.',
			},
			{
				question: 'Is tax included in the listed price?',
				answer:
					'Checkout may add tax or fees depending on your region and payment method. The total appears before you confirm payment.',
			},
		],
	},
	best: {
		path: paths.best,
		primaryKeyword: 'best PUBG cheats',
		title: 'Best PUBG Cheats 2026 | Compare Features & Prices',
		description:
			'Compare the best PUBG cheats by features, pricing, compatibility, and license options. Review the differences before choosing.',
		h1: 'Best PUBG Cheats',
		intro:
			'Searching for the best PUBG cheats usually means comparing features, compatibility, and plan length — not chasing undetected marketing slogans.',
		sections: [
			{
				h2: 'How We Compare PUBG Cheats',
				paragraphs: [
					'We do not rank anonymous “top ten” lists. Instead we document our feature stack, license lengths, maintenance workflow, and support channels so you can compare against other PUBG hacks you are already considering.',
					'Commercial investigation queries deserve transparent tables — not copied marketing claims.',
				],
			},
			{
				h2: 'PUBG Cheat Feature Comparison',
				paragraphs: [
					'Player ESP depth, loot filters, and world markers are the core buying criteria for battle royale. Aim assist may matter for some buyers but is not required for map control or loot speed.',
					'Use our Features and ESP pages as the checklist when you evaluate another provider.',
				],
			},
			{
				h2: 'Pricing & License Options',
				paragraphs: [
					'Translate every offer into monthly equivalent cost and note whether loot or world ESP costs extra.',
					'Our monthly and lifetime plans are published on the pricing page with no hidden module upsells.',
				],
			},
			{
				h2: 'PC Compatibility',
				paragraphs: [
					'PUBG on Steam requires a supported Windows build. Close conflicting overlays before first launch and follow the setup guide if BattlEye blocks the loader.',
				],
			},
			{
				h2: 'PUBG Cheat Comparison FAQ',
				paragraphs: [
					'Open the FAQ hub for delivery, refunds, and update checks. Comparison pages should not promise detection outcomes — Krafton can change enforcement at any time.',
				],
			},
		],
		internalLinks: [
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.reviews, label: 'PUBG cheat reviews' },
			{ href: paths.price, label: 'PUBG cheat price' },
		],
		imageAlt: (feature) => `Best PUBG cheats comparison showing ${feature} and pricing`,
		schema: 'article-itemlist',
	},
	reviews: {
		path: paths.reviews,
		primaryKeyword: 'PUBG cheat reviews',
		title: 'PUBG Cheat Reviews 2026 | Compare Providers',
		description:
			'Read PUBG cheat reviews covering features, pricing, compatibility, and provider details. Compare options before making a purchase.',
		h1: 'PUBG Cheat Reviews',
		intro:
			'These PUBG cheat reviews summarize what license holders say about setup, ESP clarity, and support — use them alongside the feature and pricing pages.',
		sections: [
			{
				h2: 'How We Review PUBG Cheats',
				paragraphs: [
					'Reviews on this site come from license holders describing setup time, ESP clarity, and support replies — not paid endorsements.',
					'We do not assign star ratings to competing brands we do not operate.',
				],
			},
			{
				h2: 'Provider & Product Reviews',
				paragraphs: [
					'Each review card below notes which modules the buyer used most (player ESP, loot filters, world markers) and whether maintenance notes were clear after a patch week.',
				],
			},
			{
				h2: 'Features, Pricing & Licensing',
				paragraphs: [
					'Readers should cross-check quoted prices with the current store page. License length and refund policy matter as much as overlay quality.',
				],
			},
			{
				h2: 'Compatibility & Update History',
				paragraphs: [
					'Reviews mention Windows version and whether the buyer checked the status page before playing after an update.',
				],
			},
			{
				h2: 'PUBG Cheat Review FAQ',
				paragraphs: [
					'Want to leave feedback? Contact support with your order ID. We edit or remove reviews that include personal data or third-party slurs.',
				],
			},
		],
		internalLinks: [
			{ href: paths.best, label: 'Best PUBG cheats' },
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.price, label: 'PUBG cheat prices' },
		],
		imageAlt: (feature) => `PUBG cheat review screenshot of ${feature}`,
		schema: 'article-itemlist',
	},
	aimbot: {
		path: paths.aimbot,
		primaryKeyword: 'PUBG aimbot',
		title: 'PUBG Aimbot Cheats | Features & Pricing',
		description:
			'Compare PUBG aimbot options by targeting features, pricing, and license length. Review available choices before buying.',
		h1: 'PUBG Aimbot Cheats',
		intro:
			'PUBG aimbot listings often bundle targeting assist with ESP. Here is how our package treats aim settings, pricing, and PC requirements.',
		sections: [
			{
				h2: 'PUBG Aimbot Features',
				paragraphs: [
					'Aimbot modules typically add FOV limits, smoothing, and bone or hitbox priority. They are bundled with our ESP license rather than sold as a standalone script.',
					'Read feature notes carefully — some listings label recoil helpers as aimbot even when they only adjust pull-down.',
				],
			},
			{
				h2: 'Aimbot Settings & Targeting Options',
				paragraphs: [
					'Conservative FOV and smoothing settings reduce obvious snap movement in kill cams. Pair aim settings with player ESP so you still choose when to take fights.',
				],
			},
			{
				h2: 'PUBG Aimbot Pricing',
				paragraphs: [
					'Pricing follows the same monthly and lifetime plans as the rest of the package. Compare total cost if another shop charges extra for “aim only” keys.',
				],
			},
			{
				h2: 'PC Compatibility',
				paragraphs: [
					'Run on Windows 10 or 11 with current GPU drivers. Disable other overlay tools if the loader reports a conflict.',
				],
			},
			{
				h2: 'Aimbot vs ESP Features',
				paragraphs: [
					'ESP answers “where are they and what loot is nearby?” Aim assist answers “can I land shots faster?” Many players buy for ESP first; add aim tuning only after overlays feel stable.',
				],
			},
		],
		internalLinks: [
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.esp, label: 'PUBG ESP hack' },
			{ href: paths.reviews, label: 'PUBG cheat reviews' },
		],
		imageAlt: (feature) => `PUBG aimbot cheat interface showing ${feature}`,
		schema: 'collection-itemlist',
	},
	esp: {
		path: paths.esp,
		primaryKeyword: 'PUBG ESP hack',
		title: 'PUBG ESP Hack | Features, Pricing & Options',
		description:
			'Compare PUBG ESP hack options, including player, loot, and vehicle ESP features, pricing, and available licenses.',
		h1: 'PUBG ESP Hack',
		intro:
			'A PUBG ESP hack in this context means player, loot, and world overlays — boxes, filters, vehicles, and care packages — on Windows PC.',
		sections: [
			{
				h2: 'PUBG Player ESP',
				paragraphs: [
					'Player ESP highlights enemies and bots with boxes, skeleton lines, health, weapons, and distance. Enemy-only mode hides friendly models during squad play.',
					'Visible-check options help reduce clutter when targets are behind hard cover.',
				],
			},
			{
				h2: 'Loot & Item ESP',
				paragraphs: [
					'Loot ESP tags weapons, armor, meds, scopes, attachments, and grenades on the ground. Filters let you hide categories you do not need during a fast loot phase.',
				],
			},
			{
				h2: 'Wallhack & Radar Features',
				paragraphs: [
					'Wallhack-style boxes show players through structures; world ESP covers vehicles, care packages, and corpses. Many shoppers look for ESP for PUBG or ESP PUBG overlays — the same player and loot toggles cover that intent.',
					'A dedicated PUBG radar minimap is not sold separately here; off-screen threat cues come from player ESP and world markers instead of a second minimap module.',
				],
			},
			{
				h2: 'PUBG ESP Pricing',
				paragraphs: [
					'ESP modules are included in both monthly and lifetime licenses. Compare shops that charge separately for loot or vehicle overlays.',
				],
			},
			{
				h2: 'ESP vs Aimbot',
				paragraphs: [
					'ESP improves information; aim modules change gunfight execution. Start with player and loot ESP, then decide whether you need aim tuning for your play style.',
				],
			},
		],
		internalLinks: [
			{ href: paths.pubgCheats, label: 'Buy PUBG cheats' },
			{ href: paths.aimbot, label: 'PUBG aimbot' },
			{ href: paths.reviews, label: 'PUBG cheat reviews' },
		],
		imageAlt: (feature) => `PUBG ESP hack showing player and loot information`,
		schema: 'collection-itemlist',
	},
};

export const pubgKeywordPaths = paths;
