#!/usr/bin/env node
/**
 * One-time migration: PUBG Hacks → Tarkov Cheats (Escape from Tarkov).
 * Domain: tarkovcheats.org
 * Run from project root: node scripts/adapt-tarkov.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['pubg-aimbot', 'tarkov-aimbot'],
	['pubg-esp', 'tarkov-esp'],
	['pubg-wallhack', 'tarkov-wallhack'],
	['pubg-radar-hack', 'tarkov-radar-hack'],
	['reliable-pubg-cheats', 'reliable-tarkov-cheats'],
	['pubg-cheats-2026', 'tarkov-cheats-2026'],
	['vac-bypass', 'battleye-bypass'],
	['pubg-hacks', 'tarkov-cheats'],
	['pubg-cheat-download', 'tarkov-cheat-download'],
	['pubg-mod-menu', 'tarkov-mod-menu'],
	['pubg-soft-aim', 'tarkov-soft-aim'],
	['best-pubg-cheats', 'best-tarkov-cheats'],
	['pubg-aimbot-hack', 'tarkov-aimbot-hack'],
	['pubg-esp-hack', 'tarkov-esp-hack'],
	['pubg-unlock-all', 'tarkov-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://pubghacks.net', 'https://tarkovcheats.org'],
	['https://www.pubghacks.net', 'https://www.tarkovcheats.org'],
	['www.pubghacks.net', 'www.tarkovcheats.org'],
	['pubghacks.net', 'tarkovcheats.org'],
	['support@pubghacks.net', 'support@tarkovcheats.org'],
	['support@pubgscheats.net', 'support@tarkovcheats.org'],
	['pubgscheats.net', 'tarkovcheats.org'],
	['pubgscheats.com', 'tarkovcheats.org'],
	['pubgscheats.xyz', 'tarkovcheats.org'],
	['/products/pubg', '/products/tarkov'],
	['project-name=pubghacks', 'project-name=besttarkovcheats'],
	['project-name=pubgscheats', 'project-name=besttarkovcheats'],
	['name = "pubghacks"', 'name = "besttarkovcheats"'],
	['name = "pubgscheats"', 'name = "besttarkovcheats"'],
	['"name": "pubg-hacks"', '"name": "tarkov-cheats"'],
	['pubg-esp-player-tags', 'tarkov-esp-player-tags'],
	['pubg-wallhack-skeleton', 'tarkov-wallhack-skeleton'],
	['pubg-aimbot-sniper', 'tarkov-aimbot-sniper'],
	['pubg-aimbot-skeleton', 'tarkov-aimbot-skeleton'],
	['pubg-esp-radar', 'tarkov-esp-radar'],
	['pubg-cheats-combat', 'tarkov-cheats-combat'],
	['pubg-hacks-logo', 'tarkov-cheats-logo'],
	['pubg-hero-banner', 'tarkov-hero-banner'],
	['pubg-hero-ghost', 'tarkov-hero-ghost'],
	['pubg-hero-source', 'tarkov-hero-source'],
	['reliable-pubg-cheats', 'reliable-tarkov-cheats'],
	['best-pubg-cheats', 'best-tarkov-cheats'],
	['pubg-cheat-download', 'tarkov-cheat-download'],
	['pubg-cheats-2026', 'tarkov-cheats-2026'],
	['pubg-radar-hack', 'tarkov-radar-hack'],
	['pubg-aimbot-hack', 'tarkov-aimbot-hack'],
	['pubg-esp-hack', 'tarkov-esp-hack'],
	['pubg-unlock-all', 'tarkov-unlock-all'],
	['pubg-soft-aim', 'tarkov-soft-aim'],
	['pubg-mod-menu', 'tarkov-mod-menu'],
	['pubg-wallhack', 'tarkov-wallhack'],
	['pubg-hacks', 'tarkov-cheats'],
	['pubg-aimbot', 'tarkov-aimbot'],
	['pubg-esp', 'tarkov-esp'],
	['vac-bypass', 'battleye-bypass'],
	["'vac'", "'battleye'"],
	['| vac', '| battleye'],
	['pageId="vac"', 'pageId="battleye"'],
	['pageId: \'vac\'', "pageId: 'battleye'"],
	['"vac"', '"battleye"'],
	['call-of-duty-pubg-cheats', 'escape-from-tarkov-cheats'],
	['PUBG', 'Escape from Tarkov'],
	['PUBG PUBG', 'Escape from Tarkov'],
	['PUBG Hacks', 'Tarkov Cheats'],
	['PUBG Hack', 'Tarkov Cheats'],
	['PUBG hacks', 'Tarkov cheats'],
	['PUBG hack', 'Tarkov cheat'],
	['PUBG hacks', 'Tarkov cheats'],
	['PUBG hack', 'Tarkov cheat'],
	['PUBGCheatsSite', 'TarkovCheatsSite'],
	['PUBG Intel', 'Tarkov Intel'],
	['BattlEye anti-cheat', 'BattlEye anti-cheat'],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['BattlEye maintenance', 'BattlEye bypass'],
	['BattlEye Maintenance', 'BattlEye Bypass'],
	['BattlEye patches', 'BattlEye patches'],
	['BattlEye patch', 'BattlEye patch'],
	['BattlEye updates', 'BattlEye updates'],
	['BattlEye update', 'BattlEye update'],
	['after BattlEye', 'after BattlEye'],
	['RICOCHET', 'BattlEye'],
	['VAC', 'BattlEye'],
	['vac', 'battleye'],
	['PUBG hacks', 'tarkov cheats'],
	['PUBG hacks', 'tarkov cheats'],
	['PUBG hack', 'tarkov cheat'],
	['PUBG hack', 'tarkov cheat'],
	['the map, Urzikstan, and Rebirth Island', 'Customs, Woods, and Streets of Tarkov'],
	['the map, Urzikstan and Rebirth Island', 'Customs, Woods and Streets of Tarkov'],
	['the map, Urzikstan et Rebirth Island', 'Customs, Woods et Streets of Tarkov'],
	['the map, Urzikstan e Rebirth Island', 'Customs, Woods e Streets of Tarkov'],
	['the map, Urzikstan und Rebirth Island', 'Customs, Woods und Streets of Tarkov'],
	['gulag fights', 'extract fights'],
	['gulag fight', 'extract fight'],
	['gulag rounds', 'raid rounds'],
	['gulag', 'extract'],
	['BR and Resurgence-style modes', 'PMC raids and Scav runs'],
	['BR and Resurgence', 'PMC raids and Scav runs'],
	['BR & Resurgence', 'PMC & Scav'],
	['Resurgence and battle royale matches', 'PMC raids and Scav runs'],
	['battle royale matches', 'raid'],
	['Resurgence', 'Scav run'],
	['resurgence', 'scav run'],
	['contract markers', 'extract and weapon drops markers'],
	['loadout drops', 'high-value weapon drops'],
	['loadout drop', 'high-value weapon drops'],
	['Operators', 'PMCs'],
	['operators', 'PMCs'],
	['UAV', 'extract timer'],
	['pubgImages', 'tarkovImages'],
	["from './pubg'", "from './tarkov'"],
	["from '../data/pubg'", "from '../data/tarkov'"],
	["from '../../data/pubg'", "from '../../data/tarkov'"],
	['fetch-pubg-images', 'fetch-tarkov-images'],
	['pubg-hack-overlays', 'tarkov-hack-overlays'],
	['trucos-pubg', 'trucos-tarkov'],
	['triche-pubg', 'triche-tarkov'],
	['cheats-pubg', 'cheats-tarkov'],
	['trucchi-pubg', 'trucchi-tarkov'],
	['cheaty-pubg', 'cheaty-tarkov'],
	['chity-pubg', 'chity-tarkov'],
	['chitov-pubg', 'chitov-tarkov'],
	['chitiv-pubg', 'chitiv-tarkov'],
	['cheatow-pubg', 'cheatow-tarkov'],
	['hile-pubg', 'hile-tarkov'],
	['pubg-hile', 'tarkov-hile'],
	['pubg-esp-chity', 'tarkov-esp-chity'],
	['pubg-aimbot-chity', 'tarkov-aimbot-chity'],
	['unentdeckte-pubg-cheats', 'unentdeckte-tarkov-cheats'],
	['cheats-pubg-indetectaveis', 'cheats-tarkov-indetectaveis'],
	['trucchi-pubg-indetectabili', 'trucchi-tarkov-indetectabili'],
	['niewykrywalne-cheats-pubg', 'niewykrywalne-cheats-tarkov'],
	['nedecektiruemye-chity-pubg', 'nedecektiruemye-chity-tarkov'],
	['tespit-edilemeyen-pubg-hileleri', 'tespit-edilemeyen-tarkov-hileleri'],
	['nedecektovani-chity-pubg', 'nedecektovani-chity-tarkov'],
	['cheats-pubg-nedetectabile', 'cheats-tarkov-nedetectabile'],
	['basta-pubg-cheats', 'basta-tarkov-cheats'],
	['pubg-cheats-funktionen', 'tarkov-cheats-funktionen'],
	['pubg-cheats-functies', 'tarkov-cheats-functies'],
	['caracteristicas-trucos-pubg', 'caracteristicas-trucos-tarkov'],
	['fonctionnalites-triche-pubg', 'fonctionnalites-triche-tarkov'],
	['recursos-cheats-pubg', 'recursos-cheats-tarkov'],
	['call-of-duty-pubg', 'escape-from-tarkov'],
	['Buy PUBG Hacks', 'Buy Tarkov Cheats'],
	['PUBG', 'Tarkov'],
	['pubg', 'tarkov'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-pubg.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renamePUBGTs() {
	const from = path.join(ROOT, 'src', 'data', 'pubg.ts');
	const to = path.join(ROOT, 'src', 'data', 'tarkov.ts');
	try {
		await rename(from, to);
		console.log('Renamed pubg.ts → tarkov.ts');
	} catch (e) {
		console.warn(`pubg.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-pubg-images.mjs', 'fetch-tarkov-images.mjs'],
		['pubg-hack-overlays.mjs', 'tarkov-hack-overlays.mjs'],
		['fix-pubg-copy.mjs', 'fix-tarkov-copy.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'tarkov-aimbot': 'tarkov-aimbot',
		'tarkov-esp': 'tarkov-esp',
		'tarkov-wallhack': 'wallhack',
		'tarkov-radar-hack': 'radar',
		'reliable-tarkov-cheats': 'reliable',
		'tarkov-cheats-2026': 'cheats-2026',
		'battleye-bypass': 'battleye',
		'tarkov-cheats': 'hacks',
		'tarkov-cheat-download': 'cheat-download',
		'tarkov-mod-menu': 'mod-menu',
		'tarkov-soft-aim': 'soft-aim',
		'best-tarkov-cheats': 'best-cheats',
		'tarkov-aimbot-hack': 'aimbot-hack',
		'tarkov-esp-hack': 'esp-hack',
		'tarkov-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('pubg')) continue;
		const newName = file.replace(/pubg/g, 'tarkov').replace(/tarkov-hacks-logo/g, 'tarkov-cheats-logo');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting PUBG Hacks → Tarkov Cheats (tarkovcheats.org)...\n');
	await renamePageDirs();
	await renamePUBGTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: fix brand.ts identity, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
