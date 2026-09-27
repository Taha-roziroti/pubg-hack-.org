#!/usr/bin/env node
/**
 * Fix path-redirects.json: rewrite pubg destinations → naraka and add legacy pubg → naraka 301s.
 * Run: node scripts/fix-naraka-path-redirects.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SLUG_MAP = [
	['pubg-hacks', 'pubg-cheats'],
	['pubg-esp', 'pubg-esp'],
	['pubg-aimbot', 'pubg-aimbot'],
	['pubg-wallhack', 'pubg-wallhack'],
	['pubg-radar-hack', 'pubg-radar-hack'],
	['pubg-soft-aim', 'pubg-soft-aim'],
	['pubg-mod-menu', 'pubg-mod-menu'],
	['pubg-cheat-download', 'pubg-cheat-download'],
	['pubg-aimbot-hack', 'pubg-aimbot-hack'],
	['pubg-esp-hack', 'pubg-esp-hack'],
	['pubg-unlock-all', 'pubg-unlock-all'],
	['reliable-pubg-hacks', 'reliable-pubg-cheats'],
	['best-pubg-hacks', 'best-pubg-cheats'],
	['pubg-hacks-2026', 'pubg-cheats-2026'],
	['vac-bypass', 'vac-bypass'],
	['pubg-cheats', 'pubg-cheats'],
	['pubg-cheat', 'pubg-cheat'],
	['hacks-pubg', 'cheats-pubg'],
	['pubg', 'naraka'],
];

function rewritePath(p) {
	let out = p;
	for (const [from, to] of SLUG_MAP) {
		out = out.split(from).join(to);
	}
	return out;
}

function addPair(map, from, to) {
	if (!from || !to || from === to) return;
	map[from] = to;
	const noSlash = from.replace(/\/$/, '');
	if (noSlash !== from) map[noSlash] = to;
}

const raw = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const fixed = {};

for (const [key, value] of Object.entries(raw)) {
	const newKey = rewritePath(key);
	const newValue = rewritePath(value);
	addPair(fixed, newKey, newValue);
}

// Legacy pubg EN paths → naraka
const EN_REDIRECTS = [
	['/pubg-hacks', '/pubg-cheats/'],
	['/pubg-esp', '/pubg-esp/'],
	['/pubg-aimbot', '/pubg-aimbot/'],
	['/pubg-wallhack', '/pubg-wallhack/'],
	['/pubg-radar-hack', '/pubg-radar-hack/'],
	['/pubg-soft-aim', '/pubg-soft-aim/'],
	['/pubg-mod-menu', '/pubg-mod-menu/'],
	['/pubg-cheat-download', '/pubg-cheat-download/'],
	['/pubg-aimbot-hack', '/pubg-aimbot-hack/'],
	['/pubg-esp-hack', '/pubg-esp-hack/'],
	['/pubg-unlock-all', '/pubg-unlock-all/'],
	['/reliable-pubg-hacks', '/reliable-pubg-cheats/'],
	['/best-pubg-hacks', '/best-pubg-cheats/'],
	['/pubg-hacks-2026', '/pubg-cheats-2026/'],
	['/vac-bypass', '/vac-bypass/'],
	['/pubg-cheats', '/pubg-cheats/'],
];

for (const [from, to] of EN_REDIRECTS) {
	addPair(fixed, from, to);
	addPair(fixed, `${from}/`, to);
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(fixed, null, 2)}\n`);
console.log(`fix-naraka-path-redirects: ${Object.keys(fixed).length} redirect entries`);
