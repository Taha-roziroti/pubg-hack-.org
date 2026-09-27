#!/usr/bin/env node
/**
 * Rebrand Dota 2 template → buy-wardogs-cheat.com (WARDOGS).
 * Run from project root: node scripts/rebrand-wardogs.mjs
 */
import { readFile, writeFile, readdir, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro']);
const SKIP_FILES = new Set(['package-lock.json', 'rebrand-wardogs.mjs']);

const REPLACEMENTS = [
	['https://dota2cheat.org', 'https://buy-wardogs-cheat.com'],
	['dota2cheat.org', 'buy-wardogs-cheat.com'],
	['support@dota2cheat.org', 'support@buy-wardogs-cheat.com'],
	['cheats-for-dota2', 'buy-wardogs-cheat'],
	['cheatsfordota2', 'buy-wardogs-cheat'],
	['Dota 2 Cheats', 'War Dogs Cheats'],
	['dota 2 cheats', 'WARDOGS cheats'],
	['dota 2 cheat', 'WARDOGS cheat'],
	['Dota 2 cheats', 'WARDOGS cheats'],
	['Dota 2 cheat', 'WARDOGS cheat'],
	['dota2 cheats', 'WARDOGS cheats'],
	['dota2 cheat', 'WARDOGS cheat'],
	['Dota 2', 'WARDOGS'],
	['dota 2', 'WARDOGS'],
	['dota2', 'wardogs'],
	['DOTA2', 'WARDOGS'],
	['VAC bypass', 'Elytra maintenance'],
	['VAC Bypass', 'Elytra Maintenance'],
	['VAC maintenance', 'Elytra maintenance'],
	['VAC patches', 'Elytra patches'],
	['VAC patch', 'Elytra patch'],
	['VAC updates', 'Elytra updates'],
	['VAC update', 'Elytra update'],
	['VAC anti-cheat', 'Elytra anti-cheat'],
	['VAC compatibility', 'Elytra compatibility'],
	['VAC security', 'Elytra security'],
	['VAC signatures', 'Elytra signatures'],
	['VAC modules', 'Elytra modules'],
	['VAC rebuilds', 'Elytra rebuilds'],
	['VAC rebuild', 'Elytra rebuild'],
	['VAC guide', 'Elytra guide'],
	['VAC FAQ', 'Elytra FAQ'],
	['VAC notes', 'Elytra notes'],
	['VAC reality', 'Elytra reality'],
	['after VAC', 'after Elytra'],
	['post-VAC', 'post-Elytra'],
	['Valve', 'Bulkhead Interactive'],
	['Valve terms', 'Steam terms'],
	['Roshan', 'extraction zone'],
	['Invoker', 'raider'],
	['Pudge', 'operator'],
	['Shadow Fiend', 'scout'],
	['Arc Warden', 'squad lead'],
	['Anti-Mage', 'runner'],
	['hero ESP', 'player ESP'],
	['enemy heroes', 'enemy players'],
	['heroes', 'players'],
	['hero ', 'player '],
	['ranked matches', 'extraction raids'],
	['ranked match', 'extraction raid'],
	['MMR', 'rank'],
	['/dota2-', '/wardogs-'],
	['dota2-', 'wardogs-'],
	['dota2_', 'wardogs_'],
	['Buy Dota 2 Cheats', 'Buy WARDOGS Cheat'],
	['buy dota 2 cheats', 'buy WARDOGS cheat'],
	['project-name=cheatsfordota2', 'project-name=buy-wardogs-cheat'],
];

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const rel = path.relative(ROOT, file);
	if (SKIP_FILES.has(path.basename(file))) return false;
	if (rel === 'src/data/brand.ts') return false;
	if (/\.(png|jpg|jpeg|gif|ico|woff2?|mp4|webp)$/i.test(file) && rel.startsWith('public/images/')) {
		return false;
	}
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

async function duplicateImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	const pairs = [];
	for (const entry of await readdir(imagesDir)) {
		if (entry.startsWith('dota2-')) {
			pairs.push([entry, entry.replace(/^dota2-/, 'wardogs-')]);
		}
	}
	for (const [from, to] of pairs) {
		try {
			await copyFile(path.join(imagesDir, from), path.join(imagesDir, to));
		} catch {
			// source may be missing
		}
	}
	console.log(`Duplicated ${pairs.length} image variants dota2-* → wardogs-*`);
}

let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	let text = await readFile(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) {
		text = text.split(from).join(to);
	}
	if (text !== original) {
		await writeFile(file, text, 'utf8');
		changed++;
		console.log('updated', path.relative(ROOT, file));
	}
}

await duplicateImages();

// Patch EXT links in constants after generic replace
const constantsPath = path.join(ROOT, 'scripts/i18n-data/constants.mjs');
let constants = await readFile(constantsPath, 'utf8');
constants = constants.replace(
	/export const EXT = \{[\s\S]*?\};/,
	`export const EXT = {
	wardogs:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS on Steam</a>',
	status:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS on Steam</a>',
	elytra:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">Elytra anti-cheat</a>',
	eac:
		'<a href="https://www.easy.ac/" target="_blank" rel="noopener noreferrer">Easy Anti-Cheat</a>',
	vac:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">Elytra anti-cheat</a>',
	dota2:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS</a>',
	Valve:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS</a>',
	rust:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS</a>',
	finals:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS</a>',
	naraka:
		'<a href="https://store.steampowered.com/app/1867240/WARDOGS/" target="_blank" rel="noopener noreferrer">WARDOGS</a>',
};`,
);
constants = constants.replaceAll('dota2cheat.org', 'buy-wardogs-cheat.com');
constants = constants.replaceAll('VAC maintenance', 'Elytra maintenance');
await writeFile(constantsPath, constants, 'utf8');
console.log('patched scripts/i18n-data/constants.mjs');

console.log(`\nrebrand-wardogs: ${changed} text file(s) updated`);
