#!/usr/bin/env node
/**
 * Rebrand site → pubg-hack.org (PUBG).
 */
import { readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'tmp', '.astro']);
const SKIP_FILES = new Set(['package-lock.json', 'rebrand-pubg.mjs', 'rebrand-wardogs.mjs']);

const REPLACEMENTS = [
	['https://buy-wardogs-cheat.com', 'https://pubg-hack.org'],
	['buy-wardogs-cheat.com', 'pubg-hack.org'],
	['support@buy-wardogs-cheat.com', 'support@pubg-hack.org'],
	['buy-wardogs-cheat', 'pubg-hack'],
	['War Dogs Cheats', 'PUBG Hack'],
	['war dogs cheats', 'PUBG hacks'],
	['war dogs cheat', 'PUBG hack'],
	['WARDOGS cheats', 'PUBG hacks'],
	['WARDOGS cheat', 'PUBG hack'],
	['WARDOGS', 'PUBG'],
	['wardogs', 'pubg'],
	['War Dogs', 'PUBG'],
	['Elytra maintenance', 'BattlEye maintenance'],
	['Elytra patches', 'BattlEye patches'],
	['Elytra patch', 'BattlEye patch'],
	['Elytra updates', 'BattlEye updates'],
	['Elytra update', 'BattlEye update'],
	['Elytra anti-cheat', 'BattlEye anti-cheat'],
	['Elytra rebuilds', 'BattlEye rebuilds'],
	['Elytra rebuild', 'BattlEye rebuild'],
	['after Elytra', 'after BattlEye'],
	['Elytra', 'BattlEye'],
	['extraction raids', 'battle royale matches'],
	['extraction raid', 'battle royale match'],
	['Bulkhead Interactive', 'KRAFTON'],
	['store.steampowered.com/app/1867240/WARDOGS/', 'store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/'],
	['www.reddit.com/r/WARDOGS/', 'www.reddit.com/r/PUBATTLEGROUNDS/'],
	['www.wardogs.com/news', 'pubg.com/en/news'],
	['www.wardogs.com/', 'pubg.com/'],
	['wardogs.fandom.com/wiki/WARDOGS', 'pubg.fandom.com/wiki/PUBG:_Battlegrounds'],
	["from '../data/wardogs'", "from '../data/pubg'"],
	["from '../../data/wardogs'", "from '../../data/pubg'"],
	['export const wardogsImages', 'export const pubgImages'],
	['wardogsImages', 'pubgImages'],
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
	if (rel.startsWith('public/images/') && /\.(png|webp|jpg)$/i.test(file)) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

async function duplicateImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let n = 0;
	for (const entry of await readdir(imagesDir)) {
		if (entry.startsWith('wardogs-')) {
			const to = entry.replace(/^wardogs-/, 'pubg-');
			try {
				await copyFile(path.join(imagesDir, entry), path.join(imagesDir, to));
				n++;
			} catch {
				/* ignore */
			}
		}
	}
	console.log(`Duplicated ${n} wardogs-* → pubg-* images`);
}

let changed = 0;
for (const file of await walk(ROOT)) {
	if (!shouldProcess(file)) continue;
	let text = await readFile(file, 'utf8');
	const original = text;
	for (const [from, to] of REPLACEMENTS) text = text.split(from).join(to);
	if (text !== original) {
		await writeFile(file, text, 'utf8');
		changed++;
	}
}

await duplicateImages();

const constantsPath = path.join(ROOT, 'scripts/i18n-data/constants.mjs');
let constants = await readFile(constantsPath, 'utf8');
constants = constants.replaceAll('wardogs-screenshot', 'pubg-screenshot');
constants = constants.replaceAll("'wardogs-esp'", "'pubg-esp'");
constants = constants.replaceAll("'wardogs-aimbot'", "'pubg-aimbot'");
constants = constants.replaceAll('pubg-hack.org', 'pubg-hack.org');
await writeFile(constantsPath, constants, 'utf8');

console.log(`rebrand-pubg: ${changed} file(s) updated`);
