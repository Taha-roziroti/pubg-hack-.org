#!/usr/bin/env node
/**
 * Clean leftover Naraka/Bladepoint/VAC/checkout references after PUBG rebrand.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	['PUBG', 'PUBG'],
	['pubg', 'pubg'],
	['PUBG', 'PUBG'],
	['pubg', 'pubg'],
	['PUBG hacks', 'PUBG hacks'],
	['PUBG hacks', 'PUBG hacks'],
	['PUBG Hack', 'PUBG Hack'],
	['PUBG hack', 'PUBG hack'],
	['PUBG esp', 'PUBG esp'],
	['PUBG aimbot', 'PUBG aimbot'],
	['PUBG wallhack', 'PUBG wallhack'],
	['pubg soft aim', 'pubg soft aim'],
	['pubg mod menu', 'pubg mod menu'],
	['pubg radar', 'pubg radar'],
	['pubg patch', 'pubg patch'],
	['pubg/pubg', 'pubg/pubg'],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['battle royale matches', 'battle royale matches'],
	['Immortal lobbies', 'Immortal lobbies'],
	['Haven', 'Haven'],
	['Bind', 'Bind'],
	['Ascent', 'Ascent'],
	['Split', 'Split'],
	['Lotus', 'Lotus'],
	['operator ESP', 'operator ESP'],
	['operator markers', 'operator markers'],
	['agent ability', 'agent ability'],
	['agents', 'agents'],
	['Agents', 'Agents'],
	['agent ', 'agent '],
	['Agent ', 'Agent '],
	['spike', 'spike'],
	['Spike', 'Spike'],
	['weapon drops', 'weapon drops'],
	['Weapon drops', 'Weapon drops'],
	['operator', 'operator'],
	['Operator', 'Operator'],
	['assault rifle vs SMG', 'assault rifle vs SMG'],
	['vanLifePUBG', 'vanLifePUBG'],
	['pubg-vac-bypass', 'pubg-vac-bypass'],
	['meilleures-triches-pubg', 'meilleures-triches-pubg'],
	['checkout', 'checkout'],
	['checkout', 'checkout'],
	['pubg-hack', 'pubg-hack'],
	['EXT.pubg', 'EXT.pubg'],
	['${EXT.pubg}', '${EXT.pubg}'],
	['vac:', 'vac:'],
	["'vac'", "'vac'"],
	['/images/pubg', '/images/pubg'],
	['antiCheatShort": "VAC', 'antiCheatShort": "VAC'],
	['antiCheatShort": "VAC supported', 'antiCheatShort": "VAC supported'],
];

const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.md']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
		if (file.includes('adapt-naraka') || file.includes('adapt-pubg-site')) continue;
		const original = await readFile(file, 'utf8');
		let updated = original;
		for (const [from, to] of REPLACEMENTS) {
			updated = updated.split(from).join(to);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Fixed ${changed} files`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
