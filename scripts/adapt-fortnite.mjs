#!/usr/bin/env node
/**
 * One-time migration: PUBG Hack template → Fortnite Cheats.
 * Run from project root: node scripts/adapt-fortnite.mjs
 */
import { readFile, writeFile, readdir, rm, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REMOVE_PAGE_DIRS = [
	'pubg-hacks',
	'pubg-cheat-download',
	'pubg-mod-menu',
	'pubg-soft-aim',
	'best-pubg-cheats',
	'pubg-aimbot-hack',
	'pubg-esp-hack',
	'pubg-unlock-all',
];

const RENAME_PAGE_DIRS = [
	['pubg-aimbot', 'fortnite-aimbot'],
	['pubg-esp', 'fortnite-esp'],
	['pubg-wallhack', 'fortnite-wallhack'],
	['pubg-radar-hack', 'fortnite-radar-hack'],
	['reliable-pubg-cheats', 'reliable-fortnite-cheats'],
	['pubg-cheats-2026', 'fortnite-cheats-2026'],
	['vac-bypass', 'eac-bypass-fortnite'],
];

const REMOVE_PAGE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['pubgscheats.net', 'fortnitehack.net'],
	['pubgcheats.net', 'fortnitehack.net'],
	['pubgcheats.com', 'fortnitehack.net'],
	['pubgscheats.com', 'fortnitehack.net'],
	['support@pubgscheats.net', 'support@fortnitehack.net'],
	['/products/pubg', '/products/fortnite'],
	['pubg-esp-wallhack', 'fortnite-esp-wallhack'],
	['pubg-esp-hack', 'fortnite-esp'],
	['pubg-aimbot-hack', 'fortnite-aimbot'],
	['reliable-pubg-cheats', 'reliable-fortnite-cheats'],
	['pubg-cheats-2026', 'fortnite-cheats-2026'],
	['pubg-radar-hack', 'fortnite-radar-hack'],
	['pubg-wallhack', 'fortnite-wallhack'],
	['vac-bypass', 'eac-bypass-fortnite'],
	['pubg-aimbot', 'fortnite-aimbot'],
	['pubg-esp', 'fortnite-esp'],
	["'vac'", "'eac-bypass'"],
	['| vac', '| eac-bypass'],
	['pubg-aimbot', 'fortnite-aimbot'],
	['pubg-esp', 'fortnite-esp'],
	['call-of-duty-pubg-cheats', 'fortnite-cheats'],
	['call-of-duty-pubg', 'fortnite'],
	['PUBG', 'Fortnite'],
	['PUBG PUBG', 'Fortnite'],
	['PUBG Hack', 'Fortnite Cheats'],
	['PUBG hacks', 'Fortnite cheats'],
	['PUBG hack', 'Fortnite cheat'],
	['PUBG HackSite', 'FortniteCheatsSite'],
	['PUBG HackSite', 'FortniteCheatsSite'],
	['BattlEye anti-cheat', 'Easy Anti-Cheat (EAC)'],
	['BattlEye maintenance', 'EAC maintenance'],
	['BattlEye maintenance', 'EAC bypass'],
	['BattlEye Maintenance', 'EAC Bypass'],
	['VAC', 'Easy Anti-Cheat (EAC)'],
	['vac', 'eac'],
	['the map, Urzikstan, and Rebirth Island', 'survival island, Zero Build, and official servers'],
	['the map, Urzikstan and Rebirth Island', 'survival island, Zero Build and official servers'],
	['the map, Urzikstan, et Rebirth Island', 'survival island, Zero Build et lobbies compétitifs'],
	['the map, Urzikstan e Rebirth Island', 'survival island, Zero Build e lobbies competitivi'],
	['the map, Urzikstan und Rebirth Island', 'survival island, Zero Build und Competitive-Lobbys'],
	['gulag fights', 'reboot van rotations'],
	['gulag fight', 'reboot van fight'],
	['gulag rounds', 'respawn rounds'],
	['gulag', 'reboot van'],
	['operators', 'players'],
	['operator', 'player'],
	['species', 'Players'],
	['Operator', 'Player'],
	['UAV', 'supply drop'],
	['Resurgence and survival', 'Zero Build and survival'],
	['BR and Resurgence', 'BR and Zero Build'],
	['BR & Resurgence', 'BR & Zero Build'],
	['fresh weapon drops', 'weapon drops chests'],
	['loadout drop', 'weapon drops chest'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Al Mazrah', 'survival island'],
	['al-mazrah', 'survival-island'],
	['pubgImages', 'fortniteImages'],
	["from './pubg'", "from './fortnite'"],
	["from '../data/pubg'", "from '../data/fortnite'"],
	['pubgscheats', 'fortnitecheats'],
	['project-name=pubgscheats', 'project-name=fortnitecheats'],
	['name = "pubgscheats"', 'name = "fortnitecheats"'],
	['https://pubgscheats.net', 'https://fortnitehack.net'],
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
		result = result.split(from).join(to);
	}
	return result;
}

function stripRemovedPageIds(content) {
	let result = content;
	for (const id of REMOVE_PAGE_IDS) {
		// Remove from union types and arrays
		result = result.replace(new RegExp(`\\s*\\|\\s*'${id}'`, 'g'), '');
		result = result.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
		result = result.replace(new RegExp(`,\\s*'${id}'`, 'g'), '');
		// Remove object keys in routing/localizedSlugs
		result = result.replace(new RegExp(`\\t${id.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t'${id.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t${id.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
		result = result.replace(new RegExp(`\\t'${id.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.endsWith('adapt-fortnite.mjs')) continue;
		const original = await readFile(file, 'utf8');
		let updated = applyReplacements(original);
		if (file.includes('routing.ts') || file.includes('constants.mjs') || file.includes('generate-i18n')) {
			updated = stripRemovedPageIds(updated);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function removeExtraPages() {
	for (const dir of REMOVE_PAGE_DIRS) {
		const full = path.join(ROOT, 'src', 'pages', dir);
		await rm(full, { recursive: true, force: true });
		console.log(`Removed page: ${dir}`);
	}
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
	const to = path.join(ROOT, 'src', 'data', 'fortnite.ts');
	try {
		await rename(from, to);
		console.log('Renamed pubg.ts → fortnite.ts');
	} catch (e) {
		console.warn(`pubg.ts rename: ${e.message}`);
	}
}

async function updatePageAstroFiles() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const pageId = to.replace('reliable-fortnite-cheats', 'reliable')
			.replace('fortnite-cheats-2026', 'cheats-2026')
			.replace('eac-bypass-fortnite', 'eac-bypass')
			.replace('fortnite-', 'fortnite-');
		const file = path.join(ROOT, 'src', 'pages', to, 'index.astro');
		try {
			const idMap = {
				'fortnite-aimbot': 'fortnite-aimbot',
				'fortnite-esp': 'fortnite-esp',
				'fortnite-wallhack': 'wallhack',
				'fortnite-radar-hack': 'radar',
				'reliable-fortnite-cheats': 'reliable',
				'fortnite-cheats-2026': 'cheats-2026',
				'eac-bypass-fortnite': 'eac-bypass',
			};
			const pageIdVal = idMap[to] || to;
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageIdVal}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore
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
		if (file.includes('call-of-duty-pubg') || file.includes('pubg-')) {
			const newName = file
				.replace(/call-of-duty-pubg-cheats/g, 'fortnite-cheats')
				.replace(/call-of-duty-pubg/g, 'fortnite')
				.replace(/pubg-/g, 'fortnite-');
			if (newName !== file) {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting PUBG template → Fortnite Cheats...\n');
	await removeExtraPages();
	await renamePageDirs();
	await renamePUBGTs();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: node scripts/generate-i18n-content.mjs');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
