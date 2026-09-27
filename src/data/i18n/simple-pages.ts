import type { PageId } from './content.generated';
import { fillBrandTokens, seoDescription } from '../brand';
import { brandCopy, brandSeo, seoPageTitle } from '../site-core';

export type SimpleSection = {
	h2: string;
	paragraphs: string[];
	list?: string[];
};

export type SimplePageCopy = {
	title: string;
	description: string;
	h1: string;
	intro: string;
	ctaPrimary: string;
	ctaSecondary?: string;
	ctaSecondaryHref?: string;
	galleryTitle: string;
	sections: SimpleSection[];
};

function page(copy: SimplePageCopy): SimplePageCopy {
	return {
		...copy,
		title: seoPageTitle(copy.title),
		description: seoDescription(copy.description),
		intro: fillBrandTokens(copy.intro),
		sections: copy.sections.map((section) => ({
			...section,
			h2: fillBrandTokens(section.h2),
			paragraphs: section.paragraphs.map(fillBrandTokens),
			list: section.list?.map(fillBrandTokens),
		})),
	};
}

/** Short, plain-English overrides for key EN nav pages — meta from brand.seo */
export const simplePageCopy: Partial<Record<PageId, SimplePageCopy>> = {
	features: page({
		title: brandSeo.featuresTitle,
		description: brandSeo.featuresDescription,
		h1: 'Features',
		intro: brandCopy.featuresIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'View store',
		ctaSecondaryHref: '/pricing/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Player visual options',
				paragraphs: [
					'Player ESP shows who is around you before you commit to a push or rotate.',
					'Toggle visibility checks, bot labels, and enemy-only filters so the overlay stays readable in late-game circles.',
				],
				list: [
					'Players ESP',
					'Visible check',
					'Show bots (AI)',
					'Boxes — 2D, corners, or filled',
					'Health (text or bar)',
					'Skeleton',
					'Knocked state',
					'Equipment, weapon, and ammo',
					'Snaplines',
					'Kill score and level',
					'Distance and max distance',
					'Enemy only',
				],
			},
			{
				h2: 'Loot visual options',
				paragraphs: [
					'Loot ESP highlights weapons, meds, and attachments on the ground so you loot faster after a fight.',
					'Use loot filters to hide categories you do not need during a hot drop or compound clear.',
				],
				list: [
					'Loot ESP',
					'Loot filter',
					'Armor',
					'Blade',
					'Pistols',
					'Submachine guns',
					'Shotguns',
					'Rifles',
					'Snipers',
					'Scopes',
					'Medicine',
					'Attachments',
					'Grenades',
				],
			},
			{
				h2: 'World visual options',
				paragraphs: [
					'World overlays track vehicles, care packages, and death boxes without tabbing through the map.',
					'Grenade markers help you avoid frags during compound holds and final circles.',
				],
				list: [
					'Vehicles',
					'Vehicle info (health, fuel)',
					'Airdrop',
					'Airdrop content',
					'Corpses',
					'Corpse content',
					'Name tags',
					'Show grenades',
				],
			},
			{
				h2: 'Explore related topics',
				paragraphs: [
					'Setup, status, and deeper ESP guides live on separate pages. Use these next:',
				],
				list: [
					'<a href="/esp/">Player ESP guide</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/updates/">Live status</a>',
					'<a href="/pricing/">Pricing</a>',
					'<a href="/forums/">Community forums</a>',
					'<a href="https://pubg.com/en/news" target="_blank" rel="noopener noreferrer">Official PUBG patch notes</a>',
					'<a href="https://pubg.fandom.com/wiki/PUBG:_Battlegrounds" target="_blank" rel="noopener noreferrer">PUBG Wiki (Fandom)</a>',
				],
			},
			{
				h2: 'Updates & support',
				paragraphs: [
					'We rebuild after big {game} or {antiCheat} patches.',
					'Check Status before you play after a patch day.',
					'Verify official changes on <a href="https://www.pubg.com//news" target="_blank" rel="noopener noreferrer">PUBG patch notes</a> and the <a href="https://pubg.fandom.com/wiki/Call_of_Duty:_PUBG" target="_blank" rel="noopener noreferrer">PUBG Wiki</a> before you tune overlays.',
				],
				list: ['Status on the Status page', 'Setup guide included', 'Email support with your order ID'],
			},
		],
	}),
	pricing: page({
		title: brandSeo.storeTitle,
		description: brandSeo.storeDescription,
		h1: 'Store',
		intro: brandCopy.storeIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Setup guide',
		ctaSecondaryHref: '/setup/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'What you get',
				paragraphs: [
					'Full package access for Windows 10 / 11.',
					'Same ESP, Skillshot assist, and radar on monthly and lifetime plans.',
				],
				list: ['ESP, aimbot, and radar', 'Patch rebuilds while active', 'Digital delivery after checkout'],
			},
			{
				h2: 'Plans',
				paragraphs: [
					'Pick monthly to try first, or lifetime for one payment.',
					'Both plans unlock the same features after checkout.',
				],
				list: ['Monthly — 30 days', 'Lifetime — one-time', 'Instant license by email'],
			},
			{
				h2: 'Before you buy',
				paragraphs: ['Read the refund policy if you need it. Contact support with your order ID for help.'],
				list: [
					'<a href="/refund-policy/">Refund policy</a>',
					'<a href="/faq/">FAQ</a>',
					'<a href="/support/">Support</a>',
				],
			},
		],
	}),
	updates: page({
		title: brandSeo.statusTitle,
		description: brandSeo.statusDescription,
		h1: 'Status',
		intro: brandCopy.statusIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'PUBG Hack overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Current status',
				paragraphs: [
					'As of 13 Aug 2026 the package is online for PUBG on Windows PC. We post a new note here when a game or BattlEye patch needs a rebuild.',
					'If Status is green, you can match. If we are rebuilding, wait for the next note.',
				],
				list: [
					'Check this page before every match after a patch',
					'Monthly and lifetime licenses get rebuilds while active',
					'No cheat stays reliable forever — status first, then play',
				],
			},
			{
				h2: 'After a patch',
				paragraphs: [
					'Wait for our rebuild note, then launch. Do not play on an old build after a big update.',
				],
				list: ['Read the latest status note', 'Follow setup if something fails', 'Email support with your order ID'],
			},
			{
				h2: 'Important',
				paragraphs: ['No cheat is 100% safe forever. Stay updated and use safe settings.'],
				list: ['Status first, then play', '<a href="/support/">Support</a> for license help'],
			},
		],
	}),
	hacks: page({
		title: brandSeo.previewTitle,
		description: brandSeo.previewDescription,
		h1: 'PUBG Hack — Full Guide',
		intro:
			'PUBG hacks add ESP, radar, and Skillshot assist on top of the base game. This page explains what PUBG hacks are, what PUBG Hack includes, how BattlEye maintenance works, and where to go next before you buy.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'View features',
		ctaSecondaryHref: '/features/',
		galleryTitle: 'PUBG hacks in action',
		sections: [
			{
				h2: 'What are PUBG hacks?',
				paragraphs: [
					'PUBG hacks are third-party tools that give you extra information and combat assist during matches. Most players search for PUBG hacks when they want player ESP, weapon drops visibility, off-screen radar, or smoother aim under pressure.',
					'PUBG Hack bundles those tools in one license for Windows PC — no stacking separate downloads for wallhack, radar, and aimbot.',
				],
			},
			{
				h2: 'What PUBG Hack includes',
				paragraphs: [
					'One license covers the full match stack: player ESP with distance, operator markers, 2D radar for flanks, and configurable Skillshot assist profiles per weapon.',
					'Monthly and lifetime plans include the same feature stack with BattlEye rebuilds.',
				],
				list: [
					'ESP / wallhack with distance readouts',
					'Weapon drops and resource markers',
					'2D radar for off-screen threats',
					'Skillshot assist & aimbot profiles',
					'BattlEye rebuilds after patches',
				],
			},
			{
				h2: 'Module guides',
				paragraphs: [
					'Each tool has its own deep-dive page if you want details before checkout.',
				],
				list: [
					'<a href="/pubg-esp/">PUBG ESP & wallhack</a>',
					'<a href="/pubg-aimbot/">PUBG Aimbot & Skillshot assist</a>',
					'<a href="/pubg-radar-hack/">Radar hack overlay</a>',
					'<a href="/features/">Full feature list</a>',
				],
			},
			{
				h2: 'patch status & patches',
				paragraphs: [
					'PUBG uses VAC. No cheat stays reliable forever — maintenance after patches is what matters. Check the Status page after every PUBG or BattlEye update before you load in.',
				],
				list: [
					'<a href="/updates/">Live status & patch notes</a>',
					'<a href="/updates/">patch status guide</a>',
					'<a href="/vac-bypass/">BattlEye maintenance</a>',
					'<a href="/faq/">FAQ before you buy</a>',
				],
			},
			{
				h2: 'How to get started',
				paragraphs: [
					'Pick monthly ($35) or lifetime ($150) on the store — same features on both. After checkout you receive license details by email. Follow the setup guide, then check status after major patches.',
				],
				list: [
					'<a href="/pricing/">Compare plans</a>',
					'<a href="/setup/">Setup guide</a>',
					'<a href="/support/">Contact support</a>',
				],
			},
		],
	}),
	'pubg-esp': page({
		title: 'PUBG ESP | Wallhack & Player Boxes | {brand}',
		description:
			'PUBG ESP wallhack — player boxes, operator markers & distance tags on PC. Reliable cheats with aimbot & radar. Shop at pubg-hack.org.',
		h1: 'ESP',
		intro: 'See players and weapon drops through walls during PUBG matches. Part of the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'PUBG Hack overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'ESP in match',
		sections: [
			{
				h2: 'What ESP shows',
				paragraphs: ['Boxes, distance, and filters for players, scientists, and weapon drops.'],
				list: ['Player ESP', 'Weapon drops markers', 'Heli and Bradley filters'],
			},
			{
				h2: 'When to use it',
				paragraphs: ['Clear monument zones and weapon drops runs without flooding the screen.'],
				list: ['Tune opacity', 'Filter noise', 'Pair with radar'],
			},
			{
				h2: 'Next steps',
				paragraphs: ['ESP is included with aimbot and radar in one plan.'],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	'pubg-aimbot': page({
		title: 'PUBG Aimbot | Skillshot assist & FOV Settings | {brand}',
		description:
			'PUBG aimbot with Skillshot assist, FOV, bone priority & hotkeys on PC. Reliable {brand} with ESP & radar included. pubg-hack.org.',
		h1: 'Aimbot',
		intro: 'Skillshot assist and aim assist you can tune for PUBG. Included in the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'PUBG Hack overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Aimbot view',
		sections: [
			{
				h2: 'Controls',
				paragraphs: ['Set FOV, smoothness, and bone priority before you queue.'],
				list: ['Skillshot assist strength', 'Bone priority', 'Hotkeys mid-match'],
			},
			{
				h2: 'Play styles',
				paragraphs: ['Keep settings subtle for longer matches. Raise strength only when you accept more risk.'],
				list: ['Legit Skillshot assist', 'Per-weapon profiles', 'Works with ESP'],
			},
			{
				h2: 'Next steps',
				paragraphs: ['Aimbot ships with ESP and radar in one license.'],
				list: [
					'<a href="/">Full product</a>',
					'<a href="/features/">All features</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	radar: page({
		title: 'PUBG Radar Hack | 2D Threat Map | {brand}',
		description:
			'2D radar hack for flank awareness on PC. Bundled with ESP wallhack & Skillshot assist in one license. BattlEye maintenance at pubg-hack.org.',
		h1: 'Radar',
		intro: 'A simple 2D radar for threats outside your view. Included in the same {brand} license.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'PUBG Hack overview',
		ctaSecondaryHref: '/',
		galleryTitle: 'Radar overlay',
		sections: [
			{
				h2: 'What it shows',
				paragraphs: ['Nearby enemy cues with adjustable range for solo farmers and matchers.'],
				list: ['Flank awareness', 'Base approaches', 'Adjustable range'],
			},
			{
				h2: 'With ESP',
				paragraphs: ['Use radar for threats you cannot see yet. Use ESP when you push.'],
				list: [
					'<a href="/pubg-esp/">ESP guide</a>',
					'<a href="/">Full product</a>',
					'<a href="/pricing/">Store</a>',
				],
			},
		],
	}),
	setup: page({
		title: brandSeo.setupTitle,
		description: brandSeo.setupDescription,
		h1: 'Setup',
		intro: brandCopy.setupIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Check status',
		ctaSecondaryHref: '/updates/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Before you install',
				paragraphs: ['Buy a plan first. You get a license by email.'],
				list: ['Windows 10 / 11 PC', 'Disable conflicting overlays', 'Have your order email ready'],
			},
			{
				h2: 'Install steps',
				paragraphs: ['Run the loader as admin, paste your license, then launch {game}.'],
				list: ['Download the loader from your delivery email', 'Paste license key', 'Launch the game'],
			},
			{
				h2: 'If something fails',
				paragraphs: ['Check Status after a patch. Email {email} with your order ID.'],
				list: ['<a href="/updates/">Status page</a>', '<a href="/support/">Support</a>', '<a href="/faq/">FAQ</a>'],
			},
		],
	}),
	support: page({
		title: brandSeo.supportTitle,
		description: brandSeo.supportDescription,
		h1: 'Support',
		intro: brandCopy.supportIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'FAQ',
		ctaSecondaryHref: '/faq/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'How to contact us',
				paragraphs: ['Email {email}. Include your order ID and a short note about the issue.'],
				list: ['Order ID from your receipt', 'Windows version', 'What you already tried'],
			},
			{
				h2: 'Faster answers',
				paragraphs: ['Check FAQ and Status before you write. Many setup questions are already covered.'],
				list: ['<a href="/faq/">FAQ</a>', '<a href="/updates/">Status</a>', '<a href="/setup/">Setup</a>'],
			},
		],
	}),
	faq: page({
		title: brandSeo.faqTitle,
		description: brandSeo.faqDescription,
		h1: 'FAQ',
		intro: brandCopy.faqIntro,
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Support',
		ctaSecondaryHref: '/support/',
		galleryTitle: 'In-game look',
		sections: [
			{
				h2: 'Buying & delivery',
				paragraphs: ['You get a digital license by email after payment.'],
				list: ['Instant delivery after checkout', 'Keep your order email', 'One license per purchase'],
			},
			{
				h2: 'Setup & updates',
				paragraphs: ['Follow Setup after you buy. Check Status after big {game} or {antiCheat} patches.'],
				list: ['<a href="/setup/">Setup guide</a>', '<a href="/updates/">Status</a>'],
			},
			{
				h2: 'Refunds',
				paragraphs: ['Read the refund policy before you buy if you need details.'],
				list: ['<a href="/refund-policy/">Refund policy</a>', '<a href="/support/">Support</a>'],
			},
		],
	}),
};
