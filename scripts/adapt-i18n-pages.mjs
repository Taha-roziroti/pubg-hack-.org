#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from PUBG source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['pubg-esp', 'pubg-esp'],
	['pubg-aimbot', 'pubg-aimbot'],
	["'vac'", "'vac'"],
	['vac-bypass', 'vac-bypass'],
	['reliable-pubg-cheats', 'reliable-pubg-cheats'],
	['pubg-wallhack', 'pubg-wallhack'],
	['pubg-radar-hack', 'pubg-radar-hack'],
	['pubg-cheats-2026', 'pubg-cheats-2026'],
	['pubg-cheats', 'pubg-cheats'],
	['the-rust', 'rust'],
	['PUBG's, 'PUBG's],
	['PUBG's, 'PUBG's],
	['PUBG Hack', 'PUBG Hack'],
	['PUBG hacks', 'PUBG hacks'],
	['PUBG hack', 'PUBG hack'],
	['PUBG ESP', 'PUBG ESP'],
	['PUBG Aimbot', 'PUBG Aimbot'],
	['PUBG wallhack', 'PUBG wallhack'],
	['pubg radar', 'PUBG radar'],
	['PUBG competitive fights', 'PUBG competitive fights'],
	['PUBG combat', 'PUBG combat'],
	['PUBG patches', 'PUBG patches'],
	['PUBG updates', 'PUBG updates'],
	['PUBG setup', 'PUBG setup'],
	['PUBG license', 'PUBG license'],
	['PUBG licenses', 'PUBG licenses'],
	['PUBG matches', 'PUBG matches'],
	['in PUBG', 'in PUBG'],
	['for PUBG', 'for PUBG'],
	['PUBG on', 'PUBG on'],
	['PUBG or', 'PUBG or'],
	['PUBG\'s', 'PUBG\'s'],
	['PUBG ', 'PUBG '],
	['VAC', 'VAC'],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['BattlEye Maintenance', 'BattlEye Maintenance'],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['support@pubg-hack.org', 'support@pubg-hack.org'],
	['maps, sites, and buy stations', 'maps, sites, and buy stations'],
	['maps, sites and buy stations', 'maps, sites and buy stations'],
	['raid fights', 'raid fights'],
	['raid fight', 'raid fight'],
	['match rounds', 'match rounds'],
	['extract', 'extract'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['raid timer', 'raid timer'],
	['battle royale matches rounds and battle royale matches matches', 'battle royale matches rounds and battle royale matches matches'],
	['battle royale matches rounds and battle royale matches matches', 'battle royale matches rounds and battle royale matches matches'],
	['agents & ranked teams', 'agents & ranked teams'],
	['high-value weapon drops', 'high-value weapon drops'],
	['high-value weapon drops', 'high-value weapon drops'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['PUBG combat pace', 'PUBG combat pace'],
	['COD', 'PUBG's],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'PUBG Hack',
	game: 'PUBG's,
	checkout: 'checkout',
	eac: 'VAC',
};`,
);
phrases = phrases.replace(/KW\.eac/g, 'KW.eac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'maps, sites, and buy stations'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
