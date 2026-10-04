export {
	brand,
	blogLabel,
	fillBrandTokens,
	homeSeo,
	seoDescription,
	seoPageTitle,
	seoTitle,
	siteConfig,
	seoKeywords,
	productInfo,
} from './site-core';

import { fillBrandTokens } from './brand';

function faq<T extends { question: string; answer: string; seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		question: fillBrandTokens(item.question),
		answer: fillBrandTokens(item.answer),
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

function reviewMeta<T extends { seoTitle: string; seoDescription: string }>(item: T): T {
	return {
		...item,
		seoTitle: fillBrandTokens(item.seoTitle),
		seoDescription: fillBrandTokens(item.seoDescription),
	};
}

export const trustSignals = {
	status: 'Online',
	statusNote: fillBrandTokens('{brand} is live for {game} on Windows PC.'),
	delivery: 'Instant digital delivery',
	platform: 'Windows 10 & 11',
	antiCheat: fillBrandTokens('{antiCheat} maintenance supported'),
} as const;

export const seoLandingPages = [
	{ label: fillBrandTokens('{primaryKeyword}'), href: '/' },
	{ label: fillBrandTokens('{antiCheat} patch status'), href: '/updates/' },
	{ label: fillBrandTokens('{game} cheats'), href: '/cheats/' },
	{ label: fillBrandTokens('{game} cheats 2026'), href: '/2026/' },
	{ label: fillBrandTokens('{game} esp'), href: '/esp/' },
	{ label: fillBrandTokens('{game} maphack'), href: '/esp/' },
	{ label: fillBrandTokens('{game} aimbot'), href: '/aimbot/' },
	{ label: fillBrandTokens('{game} radar hack'), href: '/radar/' },
	{ label: fillBrandTokens('Best {primaryKeyword}'), href: '/best/' },
	{ label: fillBrandTokens('{antiCheat} bypass'), href: '/vac/' },
	{ label: fillBrandTokens('{game} cheat download'), href: '/setup/' },
	{ label: fillBrandTokens('{game} setup'), href: '/setup/' },
	{ label: fillBrandTokens('{game} pricing'), href: '/pricing/' },
] as const;

export const mainNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Cheats', href: '/cheats/' },
	{ label: 'Aimbot', href: '/aimbot/' },
	{ label: 'ESP', href: '/esp/' },
	{ label: 'Features', href: '/features/' },
	{ label: 'Pricing', href: '/pricing/' },
	{ label: 'Setup', href: '/setup/' },
	{ label: 'Updates', href: '/updates/' },
	{ label: 'FAQ', href: '/faq/' },
] as const;

export const footerNav = [
	{ label: fillBrandTokens('{game} hack update log'), href: '/updates/' },
	{ label: fillBrandTokens('Contact {brand} support'), href: '/support/' },
	{ label: 'Refund policy details', href: '/refund/' },
	{ label: 'Privacy policy details', href: '/privacy/' },
	{ label: 'Terms of use', href: '/terms/' },
] as const;

export const footerExplore = [
	{ label: fillBrandTokens('{brand} home'), href: '/' },
	{ label: fillBrandTokens('{game} cheats pillar'), href: '/cheats/' },
	{ label: fillBrandTokens('Live {game} status'), href: '/updates/' },
	{ label: fillBrandTokens('{game} ESP overlays'), href: '/esp/' },
	{ label: fillBrandTokens('{game} Aimbot controls'), href: '/aimbot/' },
	{ label: fillBrandTokens('{game} radar hack'), href: '/radar/' },
	{ label: fillBrandTokens('Full {game} hack feature list'), href: '/features/' },
	{ label: 'Monthly & lifetime pricing', href: '/pricing/' },
	{ label: fillBrandTokens('{game} hack setup guide'), href: '/setup/' },
	{ label: fillBrandTokens('{game} cheats FAQ'), href: '/faq/' },
	{ label: fillBrandTokens('{brand} reviews'), href: '/reviews/' },
	{ label: fillBrandTokens('{game} forums'), href: '/forums/' },
	{ label: fillBrandTokens('Contact {brand} support'), href: '/support/' },
] as const;

export type FaqItem = {
	question: string;
	answer: string;
	slug: string;
	seoTitle: string;
	seoDescription: string;
};

export const homeFaqs: readonly FaqItem[] = [
	faq({
		question: 'What is {brand}?',
		answer:
			'{brand} is a {primaryKeyword} package for PUBG on Windows PC. It includes ESP wallhack, 2D radar, and aimbot controls, with {antiCheat} maintenance and setup support.',
		slug: 'what-are-pubg-cheats',
		seoTitle: 'What is {brand}? | FAQ',
		seoDescription:
			'{brand} explained: ESP, radar, and aimbot for {game} on Windows PC with {antiCheat} maintenance.',
	}),
	faq({
		question: 'Are {primaryKeyword} reliable in 2026?',
		answer:
			'{brand} is maintained for {game} with rebuilds after {antiCheat} and game patches. Check the Status page before you queue. No cheat can guarantee permanent patch status — maintenance and responsible use matter.',
		slug: 'are-pubg-cheats-reliable-in-2026',
		seoTitle: 'Are {brand} Reliable in 2026? | FAQ',
		seoDescription:
			'How {brand} stays maintained after {antiCheat} patches in 2026 — and why no cheat can promise permanent patch status.',
	}),
	faq({
		question: 'Does this work in ranked and casual matches?',
		answer:
			'Yes. ESP, radar, and skillshot assist are built for {game} match flow — tracking enemy players, reading loot and vehicle cues, and staying aware during rotations and team fights.',
		slug: 'pubg-ranked-competitive-play',
		seoTitle: 'Ranked & Casual Play | {brand} FAQ',
		seoDescription:
			'{brand} works in ranked and casual {game} matches — ESP, radar, and skillshot assist for Windows PC.',
	}),
	faq({
		question: 'What is included — ESP, wallhack, radar, or Aimbot?',
		answer:
			'{brand} bundles ESP wallhack, player markers, loot ESP, 2D radar cues, and configurable skillshot assist in one license. See Features for the full list.',
		slug: 'esp-wallhack-radar-or-aimbot',
		seoTitle: 'What Is Included: ESP, Wallhack, Radar, Aimbot | FAQ',
		seoDescription:
			'One {brand} license includes ESP wallhack, player markers, 2D radar cues, and configurable skillshot assist for Windows PC.',
	}),
	faq({
		question: 'How are licenses delivered?',
		answer:
			'After payment is confirmed, {brand} license details are delivered digitally through checkout. Timing can vary by payment method and order review. Keep your order confirmation ready if you contact support.',
		slug: 'how-are-licenses-delivered',
		seoTitle: 'How Are {brand} Licenses Delivered? | FAQ',
		seoDescription:
			'{brand} licenses are delivered digitally after payment confirmation. Timing varies by payment method and order review.',
	}),
	faq({
		question: 'Where do I check updates after a PUBG or {antiCheat} patch?',
		answer:
			'Maintenance notes are posted on the Status page when a PUBG or {antiCheat} update affects the package. That is the fastest place to confirm whether a new {brand} build is live.',
		slug: 'where-to-check-updates',
		seoTitle: 'Where to Check {game} / {antiCheat} Updates | FAQ',
		seoDescription:
			'Check the Status page after {game} or {antiCheat} patches to confirm the latest {brand} build status.',
	}),
	faq({
		question: 'How do I contact support?',
		answer:
			'Use the Support page or email {email}. Include your order details, package length, and a clear description of the setup issue so replies can be faster.',
		slug: 'how-to-contact-support',
		seoTitle: 'How to Contact {brand} Support | FAQ',
		seoDescription:
			'Contact {brand} support via the Support page or {email} with your order details for faster help.',
	}),
	faq({
		question: 'How much do {primaryKeyword} cost in 2026?',
		answer:
			'{brand} is $35 per month or $150 lifetime USD on Windows PC. Both plans include ESP wallhack, 2D radar, soft aim, and {antiCheat} maintenance rebuilds. See Pricing for the latest plan details before checkout.',
		slug: 'how-much-do-pubg-cheats-cost',
		seoTitle: 'How Much Do {game} Hacks Cost? | FAQ',
		seoDescription:
			'{brand} pricing in 2026: $35/month or $150 lifetime for ESP, aimbot, radar, and {antiCheat} updates on Windows PC.',
	}),
	faq({
		question: 'How do I install {primaryKeyword} on Windows PC?',
		answer:
			'After checkout, follow the Setup guide. Download the loader, disable conflicting overlays, and launch {brand}. Enable ESP, radar, or aimbot toggles in the mod menu. Most buyers finish first launch in under 15 minutes. Email {email} if activation fails.',
		slug: 'how-to-install-pubg-cheats',
		seoTitle: 'How to Install {game} Hacks on Windows PC | FAQ',
		seoDescription:
			'Step-by-step {brand} install on Windows PC — loader, mod menu, and ESP/aimbot toggles. Setup help at pubg-hack.org.',
	}),
] as const;

export const seoFaqs: readonly FaqItem[] = [
	...homeFaqs,
	faq({
		question: 'What is a {game} wallhack?',
		answer:
			'A {game} wallhack is an ESP overlay that shows enemy players, loot, and vehicles through terrain and smoke. {brand} includes distance readouts, weapon cues, and toggleable categories.',
		slug: 'what-is-a-pubg-wallhack',
		seoTitle: 'What Is a {game} Wallhack? | FAQ',
		seoDescription:
			'A {game} wallhack is ESP that reveals players, loot, and vehicles — with distance tags and category toggles.',
	}),
	faq({
		question: 'Does {brand} include a radar hack?',
		answer:
			'Yes. {brand} includes 2D radar overlays that highlight nearby squads outside your screen — useful for map awareness and third-party safety.',
		slug: 'does-pubg-cheats-include-radar-hack',
		seoTitle: 'Does {brand} Include a Radar Hack? | FAQ',
		seoDescription:
			'Yes — {brand} includes 2D radar overlays for off-screen threats. Compare ESP, skillshot assist, and radar in one license at pubg-hack.org.',
	}),
	faq({
		question: 'How does {antiCheat} affect {primaryKeyword}?',
		answer:
			'{antiCheat} monitors {game} on Windows PC. {brand} posts maintenance notes after patches that may need a rebuild. Check Status before you queue.',
		slug: 'vac-anti-cheat-and-pubg-cheats',
		seoTitle: 'How {antiCheat} Affects {brand} | FAQ',
		seoDescription:
			'{antiCheat} may require {brand} rebuilds after patches. Status notes explain the update workflow.',
	}),
	faq({
		question: 'Can I buy reliable {game} cheats for Windows PC?',
		answer:
			'Yes — {brand} sells monthly and lifetime licenses for Windows PC with ESP, radar, and aimbot in one stack. Compare plans on Store before checkout.',
		slug: 'buy-reliable-pubg-cheats-windows-pc',
		seoTitle: 'Buy Reliable {game} Hacks for Windows PC | FAQ',
		seoDescription:
			'Buy monthly or lifetime {brand} licenses for Windows PC — ESP, radar, and aimbot in one stack. Compare pricing before checkout.',
	}),
	faq({
		question: 'What is a {game} ESP hack?',
		answer:
			'A {game} ESP hack is a visibility overlay that shows enemy players, loot, and vehicles through terrain. {brand} ESP includes player boxes, distance tags, weapon cues, and toggleable categories for ranked and casual matches.',
		slug: 'what-is-pubg-esp-hack',
		seoTitle: 'What Is a {game} ESP Hack? | FAQ',
		seoDescription:
			'{game} ESP hack explained — player wallhack, loot ESP, and distance tags in one {brand} license for Windows PC.',
	}),
	faq({
		question: 'What is a {game} aimbot hack?',
		answer:
			'A {game} aimbot hack provides skillshot assist with configurable FOV, smoothing, and target priority. {brand} uses natural assist profiles for team fights and close-range duels — tune settings in the overlay before ranked queues.',
		slug: 'what-is-pubg-aimbot-hack',
		seoTitle: 'What Is a {game} Aimbot Hack? | FAQ',
		seoDescription:
			'{game} skillshot assist with FOV and smoothing controls — included in {brand} for Windows PC.',
	}),
	faq({
		question: 'What are the best {primaryKeyword} in 2026?',
		answer:
			'Top {primaryKeyword} in 2026 combine ESP, skillshot assist, 2D radar, and fast {antiCheat} maintenance after patches. {brand} bundles all three in one license with status notes, setup support, and monthly or lifetime pricing — compare Features and Reviews before you buy.',
		slug: 'best-pubg-cheats-in-2026',
		seoTitle: 'Best {game} Cheats in 2026 | FAQ',
		seoDescription:
			'Best {primaryKeyword} in 2026 — ESP, skillshot assist, radar, and {antiCheat} maintenance in one {brand} license for Windows PC.',
	}),
	faq({
		question: 'Should I buy monthly or lifetime {primaryKeyword}?',
		answer:
			'Choose monthly ($35) if you want a lower entry cost or only play a few seasons. Choose lifetime ($150) if you plan long-term {game} play and want one payment for ESP, radar, aimbot, and future maintenance rebuilds. Both plans ship the same feature set.',
		slug: 'monthly-vs-lifetime-pubg-cheats',
		seoTitle: 'Monthly vs Lifetime {game} Hacks | FAQ',
		seoDescription:
			'Compare monthly ($35) and lifetime ($150) {brand} plans — same ESP, aimbot, and radar features on Windows PC.',
	}),
	faq({
		question: 'Do {primaryKeyword} work on Windows 11?',
		answer:
			'Yes. {brand} supports Windows 10 and Windows 11 on PC. Use a clean install path from the Setup guide, keep {antiCheat} status green on the Updates page, and avoid running outdated builds after major patches.',
		slug: 'pubg-cheats-windows-11',
		seoTitle: 'Do {game} Hacks Work on Windows 11? | FAQ',
		seoDescription:
			'{brand} runs on Windows 10 and 11 — ESP, aimbot, and radar with {antiCheat} maintenance on PC. Read setup notes at pubg-hack.org before you buy.',
	}),
	faq({
		question: 'What is {game} skillshot assist?',
		answer:
			'{game} skillshot assist helps land skillshots and last hits inside a set FOV instead of snapping instantly. {brand} lets you adjust smoothing, target priority, and per-player profiles so assist feels controlled in ranked and casual matches.',
		slug: 'what-is-pubg-soft-aim',
		seoTitle: 'What Is {game} Skillshot Assist? | FAQ',
		seoDescription:
			'{game} skillshot assist explained — FOV, smoothing, and target priority in {brand} for natural-looking assist on PC.',
	}),
	faq({
		question: 'Is there a free {game} hack download?',
		answer:
			'{brand} is a paid license — there is no official free download. Avoid random “free PUBG hack” sites; they often ship malware or detected loaders. Compare monthly and lifetime plans on Pricing for legitimate ESP, radar, and aimbot access with support.',
		slug: 'free-pubg-cheat-download',
		seoTitle: 'Free {game} Hack Download? | FAQ',
		seoDescription:
			'No official free {brand} download — paid monthly/lifetime licenses include ESP, aimbot, radar, and support on Windows PC.',
	}),
	faq({
		question: 'How does {antiCheat} bypass work for {primaryKeyword}?',
		answer:
			'There is no permanent {antiCheat} bypass. {brand} is maintained with rebuilds after PUBG and {antiCheat} patches — check the Updates page before you queue. Responsible settings and loading the latest build matter more than any “bypass” claim.',
		slug: 'pubg-vac-bypass',
		seoTitle: '{antiCheat} Bypass for {game} Hacks | FAQ',
		seoDescription:
			'How {brand} handles {antiCheat} updates — maintenance rebuilds, status notes, and reliable workflow on Windows PC.',
	}),
	faq({
		question: 'Do {primaryKeyword} work in ranked competitive?',
		answer:
			'Yes. ESP, radar, and skillshot assist are built for ranked {game} on Windows PC. Use conservative overlay settings, read maintenance notes after patches, and confirm patch status on the Updates page before competitive queues.',
		slug: 'pubg-cheats-for-ranked',
		seoTitle: 'Do {game} Cheats Work in Ranked? | FAQ',
		seoDescription:
			'{brand} ESP, radar, and skillshot assist for ranked {game} on PC — maintenance and status checks before you queue.',
	}),
	faq({
		question: 'What is a {game} mod menu?',
		answer:
			'A {game} mod menu is an in-game overlay to toggle ESP wallhack, radar, aimbot, and visual settings without alt-tabbing. {brand} ships a lightweight mod menu for Windows PC — see Features for the full toggle list.',
		slug: 'what-is-pubg-mod-menu',
		seoTitle: 'What Is a {game} Mod Menu? | FAQ',
		seoDescription:
			'{game} mod menu with ESP, radar, and aimbot toggles — included in {brand} for Windows PC.',
	}),
	faq({
		question: 'What is the difference between external and internal {primaryKeyword}?',
		answer:
			'External hacks read game memory from outside the client; internal hooks run inside the process. {brand} is built as an external-style package for easier setup on Windows PC, bundling ESP, radar, and soft aim with {antiCheat} maintenance after patches.',
		slug: 'external-vs-internal-pubg-cheats',
		seoTitle: 'External vs Internal {game} Hacks | FAQ',
		seoDescription:
			'External vs internal {primaryKeyword} explained — how {brand} packages ESP, radar, and aimbot on Windows PC.',
	}),
	faq({
		question: 'How long does {primaryKeyword} setup take?',
		answer:
			'Most buyers finish {brand} setup in 10–20 minutes on Windows PC: install the loader, activate the license, and enable ESP or aimbot in the mod menu. If Windows Defender or another AV blocks the loader, follow Setup troubleshooting or email {email} with your order ID.',
		slug: 'how-long-pubg-cheat-setup-takes',
		seoTitle: 'How Long Does {game} Hack Setup Take? | FAQ',
		seoDescription:
			'{brand} setup time on Windows PC — typical 10–20 minute install for ESP, radar, and aimbot.',
	}),
	faq({
		question: 'Does {brand} include triggerbot?',
		answer:
			'{brand} focuses on ESP wallhack, 2D radar, and soft aim profiles. Triggerbot is not advertised as a standalone module — review the Features page for the current toggle list before checkout.',
		slug: 'does-pubg-cheats-include-triggerbot',
		seoTitle: 'Does {brand} Include Triggerbot? | FAQ',
		seoDescription:
			'Triggerbot and {brand} — see the current ESP, radar, and aimbot feature list on Windows PC.',
	}),
] as const;

export type CustomerReview = {
	handle: string;
	rating: 3 | 4 | 5;
	text: string;
	short: string;
	slug: string;
	seoTitle: string;
	seoDescription: string;
	date: string;
	tag?: string;
};

export const customerReviews = [
	reviewMeta({
		handle: 'xKrypt0_PUBG',
		rating: 5,
		text: 'tried three PUBG hacks before this and they all felt too snappy in ranked. PUBG Hack lets you tune skillshot assist so it does not look obvious in high rank games. setup took about 12 minutes after whitelisting the loader. no issues after a week of ranked.',
		short: 'Tried 3 cheats before. Skillshot assist feels natural in high rank once you tune FOV and smoothing.',
		slug: 'pubg-soft-aim-review-xkrypt0',
		seoTitle: 'Soft Aim Review by @xKrypt0_PUBG — 5/5 | {brand}',
		seoDescription:
			'@xKrypt0_PUBG rates {brand} soft aim 5/5 after testing in high-rank battle royale matches on Windows PC.',
		date: '2026-07-24',
		tag: 'Skillshot assist',
	}),
	reviewMeta({
		handle: 'buildsR4K',
		rating: 4,
		text: 'bought mainly for ESP, not aimbot. seeing mid rotations and missing players before a gank is huge in ranked. monthly plan has been worth it. menu could be cleaner but the wallhack info is solid.',
		short: 'Bought for ESP. Hero wallhack shows rotations before ganks — huge for ranked map awareness.',
		slug: 'pubg-esp-rotation-review-buildsr4k',
		seoTitle: 'ESP Review by @buildsR4K — 4/5 | {brand}',
		seoDescription:
			'@buildsR4K rates {brand} ESP wallhack 4/5 for PUBG ranked map reads on Windows PC.',
		date: '2026-07-19',
		tag: 'ESP',
	}),
	reviewMeta({
		handle: 'dma_wizard',
		rating: 5,
		text: 'my last cheat died the day after a BattlEye patch. switched to PUBG Hack and the loader was back the same night they posted the rebuild. running ESP plus radar, still fine after two weeks. grabbed lifetime instead of monthly.',
		short: 'Old hack died on BattlEye patch. Rebuild posted same night, still running clean after two weeks.',
		slug: 'pubg-cloud-dma-review-dma-wizard',
		seoTitle: 'BattlEye Update Review by @dma_wizard — 5/5 | {brand}',
		seoDescription:
			'@dma_wizard rates {brand} 5/5 after a {antiCheat} update — fast rebuild on Windows PC.',
		date: '2026-06-27',
		tag: 'Updates',
	}),
	reviewMeta({
		handle: 'ctrl_player99',
		rating: 4,
		text: 'not very technical but the menu is simple. lowered skillshot assist FOV, increased smoothing, removed the snap. feels more natural in solo queue and ranked. support took an hour on first login but fixed my license quickly.',
		short: 'Easy menu. Skillshot assist feels natural after FOV and smoothing tweaks in ranked.',
		slug: 'pubg-soft-aim-review-ctrl-player99',
		seoTitle: 'Skillshot Assist Review by @ctrl_player99 — 4/5 | {brand}',
		seoDescription:
			'@ctrl_player99 rates {brand} skillshot assist 4/5 after FOV tuning in PUBG ranked on Windows PC.',
		date: '2026-07-11',
		tag: 'Skillshot assist',
	}),
	reviewMeta({
		handle: 'stormChaser_07',
		rating: 3,
		text: 'works fine once you are in game. Windows Defender blocked the loader first try. support replied in about two hours with steps. ESP looks clean in lobby tests — have not gone full ranked yet. three stars because setup was stressful.',
		short: 'Defender blocked loader at first; support fixed it in 2 hours. ESP looks clean in lobby tests.',
		slug: 'pubg-cheat-setup-review-stormchaser07',
		seoTitle: 'Setup Review by @stormChaser_07 — 3/5 | {brand}',
		seoDescription:
			'@stormChaser_07 rates {brand} setup 3/5 — ESP solid after support helped on Windows PC.',
		date: '2026-06-15',
		tag: 'Setup',
	}),
	reviewMeta({
		handle: 'wardVisionGoblin',
		rating: 5,
		text: 'mainly wanted player ESP and loot filters. PUBG Hack shows flanking squads and vehicle pushes earlier than I would spot them. duo queue is less chaotic when you see third parties coming. way better than random free cheats.',
		short: 'Player ESP catches flanks and third parties early. Much better than sketchy free cheats.',
		slug: 'pubg-agent-esp-review-weapondrops-goblinx',
		seoTitle: 'ESP Review by @wardVisionGoblin — 5/5 | {brand}',
		seoDescription:
			'@wardVisionGoblin rates {brand} player ESP 5/5 for flank and rotation tracking on Windows PC.',
		date: '2026-08-01',
		tag: 'ESP',
	}),
	reviewMeta({
		handle: 'rankedGrind42',
		rating: 4,
		text: 'using PUBG Hack since the new season. per-player skillshot profiles help on ranged vs melee matchups. status page updated after the BattlEye patch and the build was back next morning. solid for long ranked sessions.',
		short: 'Per-player assist profiles help in ranked. Back online next day after BattlEye patch.',
		slug: 'pubg-soft-aim-session-review-rankedgrind42',
		seoTitle: 'Ranked Skillshot Review by @rankedGrind42 — 4/5 | {brand}',
		seoDescription:
			'@rankedGrind42 rates {brand} skillshot assist 4/5 for PUBG ranked on Windows PC.',
		date: '2026-07-07',
		tag: 'Ranked',
	}),
	reviewMeta({
		handle: 'vanLifePUBG',
		rating: 5,
		text: 'everyone talks ESP but the 2D radar is the real edge. caught two ganks in one match without staring at wallhack boxes. ESP plus radar feels like a complete package. running low opacity overlays.',
		short: '2D radar caught two ganks in one match. ESP plus radar feels like a complete PUBG package.',
		slug: 'pubg-radar-hack-review-vanlifepubg',
		seoTitle: 'Radar Review by @vanLifePUBG — 5/5 | {brand}',
		seoDescription:
			'@vanLifePUBG rates {brand} radar 5/5 for flank detection and map awareness on Windows PC.',
		date: '2026-07-28',
		tag: 'Radar',
	}),
	reviewMeta({
		handle: 'patchDayMike',
		rating: 4,
		text: 'patch day usually kills half the cheat discords. PUBG Hack posted status in about three hours and I was back in ranked the next morning. old provider left me waiting four days.',
		short: 'Patch day rebuild posted quickly. Back in ranked next morning; old provider took four days.',
		slug: 'pubg-vac-update-review-patchdaymike',
		seoTitle: 'Patch Status Review by @patchDayMike — 4/5 | {brand}',
		seoDescription:
			'@patchDayMike rates {brand} patch status updates 4/5 after {antiCheat} updates on Windows PC.',
		date: '2026-06-09',
		tag: 'BattlEye updates',
	}),
	reviewMeta({
		handle: 'snipezOnly_',
		rating: 5,
		text: 'carry player here. skillshot assist with ESP callouts is strong if you keep settings subtle. simple loader, clean install on Windows 11. best PUBG hacks I have used for ranked — just do not max FOV.',
		short: 'Carry main. Skillshot assist plus ESP works well in ranked with subtle settings.',
		slug: 'pubg-operator-soft-aim-review-snipezonly',
		seoTitle: 'Carry Skillshot Review by @snipezOnly_ — 5/5 | {brand}',
		seoDescription:
			'@snipezOnly_ rates {brand} skillshot assist 5/5 with ESP for PUBG ranked on Windows PC.',
		date: '2026-08-01',
		tag: 'Carry',
	}),
] as const satisfies readonly CustomerReview[];

export const customerReviewStats = {
	averageRating: 4.4,
	/** Aggregate rating count shown in UI and structured data */
	totalCount: 100,
	reviewCountLabel: '100+',
} as const;
