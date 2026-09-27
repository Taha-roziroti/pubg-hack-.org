#!/usr/bin/env node
/**
 * Final-pass PUBG lexicon cleanup — removes leftover PUBG/Vanguard strings.
 * Run: node scripts/fix-pubg-lexicon.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro', 'pubg-hacks-org']);

/** Ordered — specific patterns first. */
const REPLACEMENTS = [
	['pubg vac bypass', 'naraka vac bypass'],
	['pubg soft aim', 'pubg soft aim'],
	['pubg mod menu', 'pubg mod menu'],
	['pubg external hack', 'naraka external cheat'],
	['pubg 2d radar', 'naraka 2d radar'],
	['soft aim pubg', 'soft aim naraka'],
	['vac bypass pubg', 'vac bypass naraka'],
	['pubg anti cheat bypass', 'naraka anti cheat bypass'],
	['hwid spoofer pubg', 'hwid spoofer naraka'],
	['vac update', 'BattlEye update'],
	['vac reliable', 'Vanguard reliable'],
	['Vanguard Safe', 'Vanguard Safe'],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['Vanguard rebuilds', 'Vanguard rebuilds'],
	['BattlEye patches', 'BattlEye patches'],
	['Vanguard and PUBG', 'Vanguard and PUBG'],
	['Vanguard or PUBG', 'Vanguard or PUBG'],
	['Vanguard', 'Vanguard'],
	['vac', 'vac'],
	['vanlifepubg', 'vanlifenaraka'],
	['vanLifePUBG', 'vanLifePUBG'],
	['valo hack', 'PUBG hack'],
	['valo cheats', 'PUBG hacks'],
	['pubg-patch-notes', 'naraka-patch-notes'],
	['pubg-cosmetics', 'naraka-cosmetics'],
	['pubg-weapon-tier-list', 'naraka-weapon-tier-list'],
	['pubg-weapon drops-run', 'naraka-weapon drops-run'],
	['pubg-competitive-meta', 'naraka-competitive-meta'],
	['pubg-cashout-routes', 'naraka-weapon drops-routes'],
	['pubg-pro-settings', 'naraka-pro-settings'],
	['pubg-warmup-routine', 'naraka-warmup-routine'],
	['free-pubg-hack-download', 'free-pubg-cheat-download'],
	['how-long-pubg-hack-setup-takes', 'how-long-pubg-cheat-setup-takes'],
	['agent tiers', 'agent tiers'],
	['agents and abilities', 'agents and weapons'],
	['agents &', 'agents &'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['internalLinks.vac', 'internalLinks.vac'],
	['PUBG hacks', 'PUBG hacks'],
	['PUBG hacks', 'PUBG hacks'],
	['PUBG hack', 'PUBG hack'],
	['{game} hacks', '{game} cheats'],
	['Hacks FAQ', 'Cheats FAQ'],
	['navPreview: \'Hacks\'', "navPreview: 'Cheats'"],
	["navPreview: 'Hacks'", "navPreview: 'Cheats'"],
	['/products/pubg', '/products/pubg'],
	['valo/valo cheats', 'naraka/PUBG hacks'],
	['antiCheat: \'Vanguard\'', "antiCheat: 'Vanguard'"],
	['sitemap-meta.ts', 'sitemap-meta.ts'], // noop anchor
];

function walk(dir, files = []) {
	for (const name of readdirSync(dir)) {
		if (SKIP_DIRS.has(name)) continue;
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) walk(full, files);
		else files.push(full);
	}
	return files;
}

const TEXT_EXT = /\.(ts|tsx|js|mjs|astro|css|json|toml|txt|md|mdc)$/i;
let changed = 0;

for (const file of walk(ROOT)) {
	if (!TEXT_EXT.test(file)) continue;
	if (path.basename(file) === 'fix-pubg-lexicon.mjs') continue;
	if (path.basename(file) === 'adapt-pubg-site.mjs') continue;
	if (path.basename(file) === 'adapt-pubg.mjs') continue;
	let text = readFileSync(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		text = text.split(from).join(to);
	}
	if (text !== original) {
		writeFileSync(file, text, 'utf8');
		changed++;
	}
}

console.log(`fix-pubg-lexicon: ${changed} file(s) updated`);
