#!/usr/bin/env node
/**
 * One-time migration: Fortnite Cheats → PUBG Hacks.
 * Run from project root: node scripts/adapt-pubg.mjs
 */
import { readFile, writeFile, readdir, rm, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['fortnite-aimbot', 'pubg-aimbot'],
	['fortnite-esp', 'pubg-esp'],
	['fortnite-wallhack', 'pubg-wallhack'],
	['fortnite-radar-hack', 'pubg-radar-hack'],
	['reliable-fortnite-cheats', 'reliable-pubg-cheats'],
	['fortnite-cheats-2026', 'pubg-cheats-2026'],
	['eac-bypass-fortnite', 'vac-bypass'],
	['fortnite-hacks', 'pubg-hacks'],
	['fortnite-cheat-download', 'pubg-cheat-download'],
	['fortnite-mod-menu', 'pubg-mod-menu'],
	['fortnite-soft-aim', 'pubg-soft-aim'],
	['best-fortnite-cheats', 'best-pubg-cheats'],
	['fortnite-aimbot-hack', 'pubg-aimbot-hack'],
	['fortnite-esp-hack', 'pubg-esp-hack'],
	['fortnite-unlock-all', 'pubg-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['fortnitehack.net', 'pubgscheats.net'],
	['fortnitecheats.xyz', 'pubgscheats.xyz'],
	['fortnitecheats.net', 'pubgscheats.net'],
	['fortnitecheats.com', 'pubgscheats.com'],
	['support@fortnitehack.net', 'support@pubgscheats.net'],
	['/products/fortnite', '/products/pubg'],
	['fortnite-esp-wallhack', 'pubg-esp-wallhack'],
	['fortnite-esp-hack', 'pubg-esp-hack'],
	['fortnite-aimbot-hack', 'pubg-aimbot-hack'],
	['reliable-fortnite-cheats', 'reliable-pubg-cheats'],
	['fortnite-cheats-2026', 'pubg-cheats-2026'],
	['fortnite-radar-hack', 'pubg-radar-hack'],
	['fortnite-wallhack', 'pubg-wallhack'],
	['eac-bypass-fortnite', 'vac-bypass'],
	['fortnite-cheat-download', 'pubg-cheat-download'],
	['fortnite-mod-menu', 'pubg-mod-menu'],
	['fortnite-soft-aim', 'pubg-soft-aim'],
	['best-fortnite-cheats', 'best-pubg-cheats'],
	['fortnite-unlock-all', 'pubg-unlock-all'],
	['fortnite-hacks', 'pubg-hacks'],
	['fortnite-aimbot', 'pubg-aimbot'],
	['fortnite-esp', 'pubg-esp'],
	["'eac-bypass'", "'vac'"],
	['| eac-bypass', '| vac'],
	['fortnite-cheats', 'call-of-duty-pubg-cheats'],
	['call-of-duty-pubg-cheats-buyers-guide', 'call-of-duty-pubg-cheats-buyers-guide'],
	['Fortnite Hacks', 'PUBG Hacks'],
	['Fortnite Cheats', 'PUBG Hack'],
	['Fortnite cheats', 'PUBG hacks'],
	['Fortnite cheat', 'PUBG hack'],
	['FortniteCheatsSite', 'PUBGCheatsSite'],
	['Fortnite Intel', 'PUBG Intel'],
	['Easy Anti-Cheat (EAC)', 'BattlEye anti-cheat'],
	['Easy Anti-Cheat', 'BattlEye anti-cheat'],
	['EAC maintenance', 'BattlEye maintenance'],
	['EAC bypass', 'BattlEye maintenance'],
	['EAC Bypass', 'BattlEye Maintenance'],
	['EAC patches', 'BattlEye patches'],
	['EAC patch', 'BattlEye patch'],
	['EAC updates', 'BattlEye updates'],
	['EAC update', 'BattlEye update'],
	['after EAC', 'after BattlEye'],
	['fortnite hacks', 'PUBG hacks'],
	['fortnite cheats', 'PUBG hacks'],
	['survival island, Zero Build, and official servers', 'the map, Urzikstan, and Rebirth Island'],
	['survival island, Zero Build and official servers', 'the map, Urzikstan and Rebirth Island'],
	['survival island, Zero Build et lobbies compétitifs', 'the map, Urzikstan et Rebirth Island'],
	['survival island, Zero Build e lobbies competitivi', 'the map, Urzikstan e Rebirth Island'],
	['survival island, Zero Build und Competitive-Lobbys', 'the map, Urzikstan und Rebirth Island'],
	['reboot van rotations', 'gulag fights'],
	['reboot van fight', 'gulag fight'],
	['respawn rounds', 'gulag rounds'],
	['reboot van', 'gulag'],
	['Zero Build and survival', 'Resurgence and survival'],
	['BR and Zero Build', 'BR and Resurgence'],
	['BR & Zero Build', 'BR & Resurgence'],
	['Zero Build', 'Resurgence'],
	['weapon drops chests', 'fresh weapon drops'],
	['weapon drops chest', 'loadout drop'],
	['survival island', 'the map'],
	['survival-island', 'al-mazrah'],
	['supply drop', 'UAV'],
	['species', 'species'],
	['operators', 'operators'],
	['fortniteImages', 'pubgImages'],
	["from './fortnite'", "from './pubg'"],
	["from '../data/fortnite'", "from '../data/pubg'"],
	['fortnitecheats', 'pubgscheats'],
	['project-name=fortnitecheats', 'project-name=pubgscheats'],
	['name = "fortnitecheats"', 'name = "pubgscheats"'],
	['https://fortnitehack.net', 'https://pubgscheats.net'],
	['trucos-fortnite', 'trucos-pubg'],
	['triche-fortnite', 'triche-pubg'],
	['cheats-fortnite', 'cheats-pubg'],
	['trucchi-fortnite', 'trucchi-pubg'],
	['cheaty-fortnite', 'cheaty-pubg'],
	['chity-fortnite', 'chity-pubg'],
	['chitov-fortnite', 'chitov-pubg'],
	['chitiv-fortnite', 'chitiv-pubg'],
	['cheatow-fortnite', 'cheatow-pubg'],
	['hile-fortnite', 'hile-pubg'],
	['fortnite-hile', 'pubg-hile'],
	['fortnite-esp-chity', 'pubg-esp-chity'],
	['fortnite-aimbot-chity', 'pubg-aimbot-chity'],
	['unentdeckte-fortnite-cheats', 'unentdeckte-pubg-cheats'],
	['cheats-fortnite-indetectaveis', 'cheats-pubg-indetectaveis'],
	['trucchi-fortnite-indetectabili', 'trucchi-pubg-indetectabili'],
	['niewykrywalne-cheats-fortnite', 'niewykrywalne-cheats-pubg'],
	['nedecektiruemye-chity-fortnite', 'nedecektiruemye-chity-pubg'],
	['tespit-edilemeyen-fortnite-hileleri', 'tespit-edilemeyen-pubg-hileleri'],
	['nedecektovani-chity-fortnite', 'nedecektovani-chity-pubg'],
	['cheats-fortnite-nedetectabile', 'cheats-pubg-nedetectabile'],
	['basta-fortnite-cheats', 'basta-pubg-cheats'],
	['fortnite-cheats-funktionen', 'pubg-cheats-funktionen'],
	['fortnite-cheats-functies', 'pubg-cheats-functies'],
	['caracteristicas-trucos-fortnite', 'caracteristicas-trucos-pubg'],
	['fonctionnalites-triche-fortnite', 'fonctionnalites-triche-pubg'],
	['recursos-cheats-fortnite', 'recursos-cheats-pubg'],
	['funzioni-trucchi-fortnite', 'funzioni-trucchi-fortnite'],
	['PUBG', 'PUBG'],
	['PUBG PUBG', 'PUBG PUBG'],
	['Fortnite', 'PUBG'],
	['fortnite', 'pubg'],
	['eac-bypass', 'vac-bypass'],
	['eac', 'vac'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);

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
		if (file.endsWith('adapt-pubg.mjs') || file.endsWith('adapt-fortnite.mjs')) continue;
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

async function renameFortniteTs() {
	const from = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	const to = path.join(ROOT, 'src', 'data', 'pubg.ts');
	try {
		await rename(from, to);
		console.log('Renamed fortnite.ts → pubg.ts');
	} catch (e) {
		console.warn(`fortnite.ts rename: ${e.message}`);
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'pubg-aimbot': 'pubg-aimbot',
		'pubg-esp': 'pubg-esp',
		'pubg-wallhack': 'wallhack',
		'pubg-radar-hack': 'radar',
		'reliable-pubg-cheats': 'reliable',
		'pubg-cheats-2026': 'cheats-2026',
		'vac-bypass': 'vac',
		'pubg-hacks': 'hacks',
		'pubg-cheat-download': 'cheat-download',
		'pubg-mod-menu': 'mod-menu',
		'pubg-soft-aim': 'soft-aim',
		'best-pubg-cheats': 'best-cheats',
		'pubg-aimbot-hack': 'aimbot-hack',
		'pubg-esp-hack': 'esp-hack',
		'pubg-unlock-all': 'unlock-all',
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
		if (file.includes('fortnite') || file.includes('call-of-duty-pubg')) {
			const newName = file
				.replace(/fortnite-cheats/g, 'call-of-duty-pubg-cheats')
				.replace(/fortnite-/g, 'pubg-')
				.replace(/fortnite/g, 'call-of-duty-pubg');
			if (newName !== file) {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Fortnite Cheats → PUBG Hacks...\n');
	await renamePageDirs();
	await renameFortniteTs();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next steps:');
	console.log('  node scripts/generate-i18n-content.mjs');
	console.log('  node scripts/generate-blog-posts.mjs');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
