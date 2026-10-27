import type { PageId } from './i18n/content.generated';

export type PageFaq = { question: string; answer: string };

/** Indexable product pages — FAQ JSON-LD supplements (not rendered as duplicate body blocks). */
export const pageSeoFaqs: Partial<Record<PageId, PageFaq[]>> = {
	features: [
		{
			question: 'What features are included in one PUBG Hack license?',
			answer:
				'Player ESP, loot ESP with filters, world overlays, skillshot assist, 2D radar, streamproof mode, and config save/load on Windows PC.',
		},
		{
			question: 'Are aimbot and ESP sold separately?',
			answer:
				'No. Monthly and lifetime plans include the same feature stack listed on the Features page.',
		},
	],
	setup: [
		{
			question: 'How long does PUBG Hack setup take?',
			answer:
				'Most buyers finish loader install and first launch in 10–20 minutes on Windows 10 or 11 after license delivery.',
		},
		{
			question: 'What if Windows Defender blocks the loader?',
			answer:
				'Follow the Setup troubleshooting section, check Updates for patch timing, then email support@pubghack.org with your order ID.',
		},
	],
	updates: [
		{
			question: 'When should I check the Updates page?',
			answer:
				'After every PUBG or BattlEye patch and before ranked sessions when a rebuild might be in progress.',
		},
		{
			question: 'Do monthly and lifetime plans get rebuilds?',
			answer:
				'Yes — active licenses receive maintenance builds while the term is valid.',
		},
	],
	support: [
		{
			question: 'What should I include in a support email?',
			answer:
				'Your order ID, Windows version, and a short description of the delivery or setup issue.',
		},
		{
			question: 'How fast is PUBG Hack support?',
			answer:
				'Requests are reviewed daily. Check FAQ and Updates first for common answers.',
		},
	],
	radar: [
		{
			question: 'Is radar sold without ESP?',
			answer:
				'The 2D radar ships in the same license as player ESP and loot overlays — not as a standalone SKU.',
		},
		{
			question: 'How should I use radar with ESP?',
			answer:
				'Use radar for off-screen flank cues; use ESP when you commit to a push or loot rotation.',
		},
	],
	'cheats-2026': [
		{
			question: 'What changed for PUBG hacks in 2026?',
			answer:
				'Continued BattlEye maintenance, the same ESP and radar stack, and published rebuild notes on Updates after patches.',
		},
		{
			question: 'What do 2026 plans cost?',
			answer:
				'$35 per month or $150 lifetime USD with identical features on both plans.',
		},
	],
};
