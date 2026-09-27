#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clea PUBG source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['pubg-esp', 'pubg-esp'],
	['pubg-aimbot', 'pubg-aimbot'],
	['vac', 'vac'],
	['reliable-pubg-cheats', 'reliable-pubg-cheats'],
	['pubg-wallhack', 'pubg-wallhack'],
	['pubg-radar-hack', 'pubg-radar-hack'],
	['pubg-cheats-2026', 'pubg-cheats-2026'],
	['vac-bypass', 'vac-bypass'],
	['pubg-hack.org', 'pubg-hack.org'],
	['trucos-pubg', 'trucos-pubg'],
	['triche-pubg', 'triche-pubg'],
	['pubg-cheats', 'pubg-cheats'],
	['cheats-pubg', 'cheats-pubg'],
	['trucchi-pubg', 'trucchi-pubg'],
	['cheaty-pubg', 'cheaty-pubg'],
	['chity-pubg', 'chity-pubg'],
	['chitov-pubg', 'chitov-pubg'],
	['chitiv-pubg', 'chitiv-pubg'],
	['cheatow-pubg', 'cheatow-pubg'],
	['hile-pubg', 'hile-pubg'],
	['pubg-hile', 'pubg-hile'],
	['pubg-esp-chity', 'pubg-esp-chity'],
	['pubg-aimbot-chity', 'pubg-aimbot-chity'],
	['unentdeckte-pubg-cheats', 'unentdeckte-pubg-cheats'],
	['cheats-pubg-indetectaveis', 'cheats-pubg-indetectaveis'],
	['trucchi-pubg-indetectabili', 'trucchi-pubg-indetectabili'],
	['niewykrywalne-cheats-pubg', 'niewykrywalne-cheats-pubg'],
	['nedecektiruemye-chity-pubg', 'nedecektiruemye-chity-pubg'],
	['tespit-edilemeyen-pubg-hileleri', 'tespit-edilemeyen-pubg-hileleri'],
	['nedecektovani-chity-pubg', 'nedecektovani-chity-pubg'],
	['cheats-pubg-nedetectabile', 'cheats-pubg-nedetectabile'],
	['basta-pubg-cheats', 'basta-pubg-cheats'],
	['vac-bypass-trucos-pubg', 'vac-bypass-trucos-pubg'],
	['vac-bypass-triche-pubg', 'vac-bypass-triche-pubg'],
	['vac-bypass-hacks-pubg', 'vac-bypass-hacks-pubg'],
	['vac-bypass-chity-pubg', 'vac-bypass-chity-pubg'],
	['vac-bypass-rust', 'vac-bypass'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix eac key in englishPaths
	content = content.replace(/\teac: '/, "\t'vac': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Agent image per page topic — keyword-rich pubg-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/the-pubg-cheats-hero.webp',
	'pubg-esp': '/images/the-pubg-cheats-esp-wallhack.webp',
	'pubg-aimbot': '/images/the-pubg-cheats-aimbot-combat.webp',
	features: '/images/pubg-cheats-package.webp',
	pricing: '/images/pubg-cheats-cover.webp',
	setup: '/images/rust-loadout-builder.webp',
	updates: '/images/rust-header-art.webp',
	faq: '/images/rust-pack-fight.webp',
	support: '/images/pubg-cheats-package.webp',
	reliable: '/images/rust-survival-combat.webp',
	wallhack: '/images/the-pubg-cheats-esp-wallhack.webp',
	radar: '/images/rust-player-esp.webp',
	'vac': '/images/rust-reboot-van-fight.webp',
	'cheats-2026': '/images/the-pubg-cheats-hero.webp',
	privacy: '/images/the-pubg-cheats-aimbot-combat.webp',
	refund: '/images/pubg-cheats-cover.webp',
	terms: '/images/pubg-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'pubg-esp', 'pubg-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'reliable', 'wallhack', 'radar', 'vac',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Agent image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'pubg-esp' | 'pubg-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'reliable' | 'wallhack' | 'radar' | 'vac' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'playerEsp');
	content = content.replace(/extractFight/g, 'raidFight');
	content = content.replace(/alMazrah/g, 'raidMap');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
