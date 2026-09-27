/**
 * SINGLE SOURCE OF TRUTH for template rebrands.
 */
export const brand = {
	name: 'PUBG Hack',
	shortName: 'PUBG Hack',
	url: 'https://pubg-hack.org',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@pubg-hack.org',
	checkoutUrl: 'https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fpubg',

	social: {
		twitterSite: '',
		sameAs: [
			'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/',
			'https://www.reddit.com/r/PUBATTLEGROUNDS/',
		],
	} as const,

	game: 'PUBG',
	gameUrl: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/',
	antiCheat: 'BattlEye',

	logo: '/images/pubg-cheats-logo.webp',
	logoRaster: '/images/pubg-cheats-logo.png',
	logoRasterWidth: 512,
	logoRasterHeight: 512,
	logoAlt: 'PUBG hack site icon — player ESP, loot ESP and world overlays for Windows PC',
	defaultOgImage: '/images/pubg-screenshot-05.webp',
	heroImage: '/images/pubg-cheats-hero.webp',
	heroVideoUrl: '',
	heroVideoMp4: '/videos/hero-priority.mp4',
	demoVideoPoster: '/images/pubg-cheats-hero-1199w.webp',
	demoScreenshot: '/images/pubg-screenshot-01.webp',

	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	] as const,
	currency: 'USD',
	platforms: ['Windows PC'] as const,

	theme: {
		accent: '#F2A900',
		bg: '#0B0D10',
		soft: '#FFD54F',
		deep: '#C88700',
		hover: '#FFE082',
		panel: '#101318',
		elevated: '#141A22',
		line: '#1E2630',
		ink: '#F4F4F5',
		inkHeading: '#FFFFFF',
		inkSecondary: '#D4D4D8',
		inkMuted: '#A1A1AA',
		link: '#FFD54F',
	},

	keywords: {
		primary: 'pubg hack',
		list: [
			'pubg hack',
			'pubg hacks',
			'pubg cheats',
			'pubg cheat',
			'pubg esp',
			'pubg wallhack',
			'pubg aimbot',
			'pubg radar hack',
			'pubg loot esp',
			'pubg hack pc',
			'best pubg hack',
			'pubg mod menu',
			'pubg soft aim',
			'pubg battleye',
			'pubg cheats 2026',
		] as const,
	},

	seo: {
		homeTitle: 'PUBG Hack — Player ESP, Loot ESP & World ESP',
		homeDescription:
			'PUBG hack with player ESP, loot filters, and world overlays for battle royale on Windows PC. Visible check, vehicles, airdrops, and BattlEye maintenance notes after patches.',
		featuresTitle: 'PUBG Hack Features | Player, Loot & World ESP',
		featuresDescription:
			'Full PUBG hack feature list — player ESP with boxes and skeleton, loot ESP with weapon filters, vehicles, airdrops, corpses, and grenade markers on PC.',
		storeTitle: 'PUBG Hack Pricing | $35/mo or $150 Lifetime',
		storeDescription:
			'Buy PUBG hack — $35/month or $150 lifetime. Player ESP, loot ESP, and world overlays for battle royale on PC. Instant digital delivery worldwide.',
		statusTitle: 'PUBG Hack Status | BattlEye Patch Updates',
		statusDescription:
			'Live status after {game} and {antiCheat} patches. Check ESP and overlay rebuilds on PC before you queue.',
		previewTitle: 'PUBG Hacks | ESP, Loot ESP & Overlay Guide',
		previewDescription:
			'PUBG hacks guide — player ESP, loot filters, vehicle and airdrop markers, plus {antiCheat} maintenance for battle royale on PC.',
		setupTitle: 'PUBG Hack Setup | Windows PC Install Guide',
		setupDescription:
			'Install {brand} on PC — activate player ESP, loot ESP, and world overlays step by step. Check {antiCheat} status before your first match.',
		supportTitle: 'PUBG Hack Support | License & Setup Help',
		supportDescription:
			'Support for license delivery, ESP setup, and billing on PC. Email {email} with your order ID before you queue.',
		faqTitle: 'PUBG Hack FAQ | ESP, Loot ESP & BattlEye',
		faqDescription:
			'FAQ for PUBG hack — delivery, setup, {antiCheat} updates, and pricing on PC. Answers at pubg-hack.org before you buy.',
		reviewsTitle: 'PUBG Hack Reviews | ESP & Loot Overlays',
		reviewsDescription:
			'Buyer reviews for PUBG hack — player ESP, loot ESP, world markers, and {antiCheat} maintenance on PC.',
		blogTitle: 'PUBG Hack Forums | Setup Tips & ESP Talk',
		blogDescription:
			'PUBG hack forums — ESP presets, loot filters, and BattlEye patch notes for PC at pubg-hack.org/forums/.',
	},

	copy: {
		tagline: '{primaryKeyword} — player ESP, loot ESP, and world overlays for PC',
		summary:
			'{brand} is a {game} hack package for Windows PC. Player ESP, loot ESP with filters, and world overlays for vehicles, airdrops, and corpses, with {antiCheat} maintenance after patches.',
		heroLede: 'Player ESP, loot ESP, and world overlays for PUBG on Windows PC.',
		blogLabel: 'Community Forums',
		ctaBuy: 'Get Access',
		ctaBuyShort: 'Buy',
		featuresIntro:
			'Every player ESP, loot ESP, and world overlay control listed below is included in one license for {game} on Windows PC.',
		storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
		statusIntro: 'Check here after a {game} or {antiCheat} patch before you queue.',
		previewIntro:
			'{brand} for PUBG — player ESP, loot filters, vehicle and airdrop markers, and BattlEye rebuilds after patches.',
		setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
		supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
		faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
		reviewsIntro: 'Real feedback on PUBG hack — ESP overlays and support from {brand} buyers.',
		chipEsp: 'Player ESP',
		chipAim: 'Loot ESP',
		chipRadar: 'World ESP',
		chipUpdates: 'Patch updates',
		navHome: 'Home',
		navPreview: 'Hacks',
		navFeatures: 'Features',
		navStore: 'Store',
		navStatus: 'Status',
		navReviews: 'Reviews',
	},

	sitemap: {
		contentLastmod: '2026-09-27',
		blogImageTitle: '{brand} forums',
		blogImageCaption: 'Community discussions for {primaryKeyword}',
		reviewsImageTitle: '{brand} reviews',
		reviewsImageCaption: 'PUBG hack reviews — what buyers say about {primaryKeyword}',
		images: [
			{
				src: '/images/pubg-screenshot-01.webp',
				title: 'PUBG player ESP boxes in a match',
				caption: 'PUBG hack player ESP with boxes and distance during battle royale on PC',
			},
			{
				src: '/images/pubg-screenshot-02.webp',
				title: 'PUBG loot ESP weapon filters',
				caption: 'PUBG loot ESP highlighting rifles and attachments on PC',
			},
			{
				src: '/images/pubg-screenshot-03.webp',
				title: 'PUBG vehicle ESP with health and fuel',
				caption: 'PUBG world ESP showing vehicle health and fuel readouts on PC',
			},
			{
				src: '/images/pubg-screenshot-04.webp',
				title: 'PUBG airdrop and corpse markers',
				caption: 'PUBG hack airdrop and corpse content overlays on PC',
			},
			{
				src: '/images/pubg-screenshot-05.webp',
				title: 'PUBG ESP mod menu toggles',
				caption: 'PUBG hack menu with player, loot, and world ESP categories on PC',
			},
			{
				src: '/images/pubg-screenshot-06.webp',
				title: 'PUBG grenade and enemy-only ESP preset',
				caption: 'PUBG ESP showing grenades with enemy-only player filter on PC',
			},
		],
	},
} as const;

export type Brand = typeof brand;

export function fillBrandTokens(input: string): string {
	return input
		.replaceAll('{brand}', brand.name)
		.replaceAll('{game}', brand.game)
		.replaceAll('{antiCheat}', brand.antiCheat)
		.replaceAll('{email}', brand.supportEmail)
		.replaceAll('{primaryKeyword}', brand.keywords.primary)
		.replaceAll('{checkout}', brand.checkoutUrl);
}

export function seoTitle(topic: string): string {
	const title = `${brand.game} ${topic} | ${brand.name}`;
	return title.length <= 60 ? title : `${topic} | ${brand.name}`;
}

export function seoDescription(template: string): string {
	let text = fillBrandTokens(template).trim();
	if (text.length < 140) {
		const pad = text.toLowerCase().includes('pubg-hack.org')
			? ' Windows PC license with BattlEye maintenance after patches.'
			: ' Compare plans and guides at pubg-hack.org.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= 160) return text;
	const trimmed = text.slice(0, 160);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 160);
}

export function homeSeo() {
	return {
		title: fillBrandTokens(brand.seo.homeTitle),
		description: seoDescription(brand.seo.homeDescription),
	};
}
