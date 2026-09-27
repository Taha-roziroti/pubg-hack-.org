#!/usr/bin/env node
/**
 * One-time migration: PUBG Hacks → Naraka Cheats (narakacheats.org).
 * Run from project root: node scripts/adapt-naraka.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['pubg-aimbot', 'naraka-aimbot'],
	['pubg-esp', 'naraka-esp'],
	['pubg-wallhack', 'naraka-wallhack'],
	['pubg-radar-hack', 'naraka-radar-hack'],
	['reliable-pubg-hacks', 'reliable-naraka-cheats'],
	['pubg-hacks-2026', 'naraka-cheats-2026'],
	['vac-bypass', 'neac-bypass'],
	['pubg-hacks', 'naraka-cheats'],
	['pubg-cheat-download', 'naraka-cheat-download'],
	['pubg-mod-menu', 'naraka-mod-menu'],
	['pubg-soft-aim', 'naraka-soft-aim'],
	['best-pubg-hacks', 'best-naraka-cheats'],
	['pubg-aimbot-hack', 'naraka-aimbot-hack'],
	['pubg-esp-hack', 'naraka-esp-hack'],
	['pubg-unlock-all', 'naraka-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.pubghacks.org', 'https://www.narakacheats.org'],
	['https://pubghacks.org', 'https://narakacheats.org'],
	['https://www.pubgcheats.org', 'https://www.narakacheats.org'],
	['https://pubgcheats.org', 'https://narakacheats.org'],
	['www.pubghacks.org', 'www.narakacheats.org'],
	['www.pubgcheats.org', 'www.narakacheats.org'],
	['pubghacks.org', 'narakacheats.org'],
	['pubgcheats.org', 'narakacheats.org'],
	['support@pubghacks.org', 'support@narakacheats.org'],
	['support@pubgcheats.org', 'support@narakacheats.org'],
	['project-name=pubghacks', 'project-name=narakacheats'],
	['name = "pubg-hacks-org"', 'name = "naraka-cheats-org"'],
	['name = "pubghacks"', 'name = "naraka-cheats-org"'],
	['"name": "pubg-hacks"', '"name": "naraka-cheats"'],
	['https://www.callofduty.com/pubg/news', 'https://store.steampowered.com/app/1203220/news/'],
	['https://www.callofduty.com/pubg', 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/'],
	['https://www.callofduty.com/pubg', 'https://store.steampowered.com/app/1203220'],
	['https://pubg.fandom.com/wiki/Call_of_Duty:_PUBG', 'https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT'],
	['https://pubg.fandom.com', 'https://naraka.fandom.com'],
	['playpubg.com', 'store.steampowered.com/app/1203220'],
	['pubg.fandom.com', 'naraka.fandom.com'],
	['https://www.reddit.com/r/PUBG/', 'https://www.reddit.com/r/NARAKA/'],
	['https://x.com/pubghacks', 'https://x.com/narakacheats'],
	['@pubghacks', '@narakacheats'],
	['/products/pubg', '/products/naraka'],
	['reliable-pubg-hacks', 'reliable-naraka-cheats'],
	['best-pubg-hacks', 'best-naraka-cheats'],
	['pubg-cheat-download', 'naraka-cheat-download'],
	['pubg-hacks-2026', 'naraka-cheats-2026'],
	['pubg-radar-hack', 'naraka-radar-hack'],
	['pubg-aimbot-hack', 'naraka-aimbot-hack'],
	['pubg-esp-hack', 'naraka-esp-hack'],
	['pubg-unlock-all', 'naraka-unlock-all'],
	['pubg-soft-aim', 'naraka-soft-aim'],
	['pubg-mod-menu', 'naraka-mod-menu'],
	['pubg-wallhack', 'naraka-wallhack'],
	['pubg-aimbot', 'naraka-aimbot'],
	['pubg-esp', 'naraka-esp'],
	["'pubg-esp'", "'naraka-esp'"],
	['"pubg-esp"', '"naraka-esp"'],
	["'pubg-aimbot'", "'naraka-aimbot'"],
	['"pubg-aimbot"', '"naraka-aimbot"'],
	['pubg-hacks', 'naraka-cheats'],
	['pubg-cheat', 'naraka-cheat'],
	['pubgImages', 'narakaImages'],
	["from './pubg'", "from './naraka'"],
	["from '../data/pubg'", "from '../data/naraka'"],
	["from '../../data/pubg'", "from '../../data/naraka'"],
	['fetch-pubg-images', 'fetch-naraka-images'],
	['fetch-pubg-hero', 'fetch-naraka-hero'],
	['import-pubg-screenshots', 'import-naraka-screenshots'],
	['pubg-hack-overlays', 'naraka-hack-overlays'],
	['fix-pubg-copy', 'fix-naraka-copy'],
	['fix-pubg-content', 'fix-naraka-content'],
	['fix-pubg-lexicon', 'fix-naraka-lexicon'],
	['adapt-pubg', 'adapt-naraka'],
	['rebrand-pubg-hacks', 'rebrand-naraka-cheats'],
	['trucos-pubg', 'trucos-naraka'],
	['triche-pubg', 'triche-naraka'],
	['cheats-pubg', 'cheats-naraka'],
	['trucchi-pubg', 'trucchi-naraka'],
	['cheaty-pubg', 'cheaty-naraka'],
	['chity-pubg', 'chity-naraka'],
	['chitov-pubg', 'chitov-naraka'],
	['chitiv-pubg', 'chitiv-naraka'],
	['cheatow-pubg', 'cheatow-naraka'],
	['hile-pubg', 'hile-naraka'],
	['pubg-hile', 'naraka-hile'],
	['pubg-esp-chity', 'naraka-esp-chity'],
	['pubg-aimbot-chity', 'naraka-aimbot-chity'],
	['unentdeckte-pubg-hacks', 'unentdeckte-naraka-cheats'],
	['hacks-pubg-indetectaveis', 'cheats-naraka-indetectaveis'],
	['trucchi-pubg-indetectabili', 'trucchi-naraka-indetectabili'],
	['niewykrywalne-hacks-pubg', 'niewykrywalne-cheats-naraka'],
	['nedecektiruemye-chity-pubg', 'nedecektiruemye-chity-naraka'],
	['tespit-edilemeyen-pubg-hileleri', 'tespit-edilemeyen-naraka-hileleri'],
	['nedecektovani-chity-pubg', 'nedecektovani-chity-naraka'],
	['hacks-pubg-nedetectabile', 'cheats-naraka-nedetectabile'],
	['basta-pubg-hacks', 'basta-naraka-cheats'],
	['pubg-hacks-funktionen', 'naraka-cheats-funktionen'],
	['pubg-hacks-functies', 'naraka-cheats-functies'],
	['caracteristicas-trucos-pubg', 'caracteristicas-trucos-naraka'],
	['fonctionnalites-triche-pubg', 'fonctionnalites-triche-naraka'],
	['recursos-hacks-pubg', 'recursos-cheats-naraka'],
	['maps, sites, and buy stations', 'maps, zones, and combat points'],
	['maps, sites and buy stations', 'maps, zones and combat points'],
	['battle royale matches rounds and battle royale matches matches', 'battle royale rounds and battle royale matches matches'],
	['agents & ranked teams', 'players & ranked teams'],
	['operator markers', 'player markers'],
	['buy stations', 'combat zones'],
	['maps and bomb sites', 'maps and combat zones'],
	['near bomb sites and choke points', 'near combat zones and choke points'],
	['loadout drop routes', 'grapple routes'],
	['Agent and ability ESP', 'Hero and weapon ESP'],
	['operator ESP', 'player ESP'],
	['round win worth the push', 'elimination worth the push'],
	['tactical tools', 'melee combat tools'],
	['Riot Games', '24 Entertainment'],
	['competitive fight', 'melee combat'],
	['competitive fights', 'melee combat sessions'],
	['competitive tips', 'battle royale tips'],
	['map callouts', 'map zones'],
	['on bomb sites', 'in combat zones'],
	['PUBGCheatsSite', 'NarakaCheatsSite'],
	['PUBG Intel', 'Naraka Intel'],
	['PUBG Hacks', 'Naraka Cheats'],
	['PUBG hacks', 'naraka cheats'],
	['PUBG hack', 'naraka cheat'],
	['PUBG hacks', 'naraka cheats'],
	['PUBG hack', 'naraka cheat'],
	['PUBG ESP', 'Naraka ESP'],
	['PUBG Aimbot', 'Naraka Aimbot'],
	['PUBG esp', 'naraka esp'],
	['PUBG aimbot', 'naraka aimbot'],
	['PUBG wallhack', 'naraka wallhack'],
	['pubg radar', 'naraka radar'],
	['Buy PUBG Hacks', 'Buy Naraka Cheats'],
	['what-are-pubg-hacks', 'what-are-naraka-cheats'],
	['are-pubg-hacks-reliable-in-2026', 'are-naraka-cheats-reliable-in-2026'],
	['competitive-rounds-and-ranked-sessions', 'battle-royale-rounds-and-ranked-sessions'],
	['what-is-a-pubg-wallhack', 'what-is-a-naraka-wallhack'],
	['does-pubg-hacks-include-radar-hack', 'does-naraka-cheats-include-radar-hack'],
	['vac-anti-cheat-and-pubg-hacks', 'neac-anti-cheat-and-naraka-cheats'],
	['buy-reliable-pubg-hacks-windows-pc', 'buy-reliable-naraka-cheats-windows-pc'],
	['pubg-soft-aim-review', 'naraka-soft-aim-review'],
	['pubg-esp-ranked-review', 'naraka-esp-ranked-review'],
	['pubg-cloud-dma-review', 'naraka-cloud-dma-review'],
	['pubg-cheat-setup-review', 'naraka-cheat-setup-review'],
	['pubg-agent-esp-review', 'naraka-hero-esp-review'],
	['pubg-soft-aim-ranked-review', 'naraka-soft-aim-ranked-review'],
	['pubg-radar-hack-review', 'naraka-radar-hack-review'],
	['pubg-vac-update-review', 'naraka-neac-update-review'],
	['pubg-operator-soft-aim-review', 'naraka-melee-soft-aim-review'],
	['xKrypt0_PUBG', 'xKrypt0_Naraka'],
	['vanLifePUBG', 'vanLifeNaraka'],
	['pubg-screenshot', 'naraka-screenshot'],
	['pubg-hacks-logo', 'naraka-cheats-logo'],
	['pubg-hacks-hero', 'naraka-cheats-hero'],
	['pubg-hero-banner', 'naraka-hero-banner'],
	['pubg-hero-ghost', 'naraka-hero-ghost'],
	['pubg-hero-source', 'naraka-hero-source'],
	['pubg-esp-player-tags', 'naraka-esp-player-tags'],
	['pubg-wallhack-skeleton', 'naraka-wallhack-skeleton'],
	['pubg-aimbot-skeleton', 'naraka-aimbot-skeleton'],
	['pubg-aimbot-operator', 'naraka-aimbot-melee'],
	['pubg-esp-radar', 'naraka-esp-radar'],
	['pubg-hacks-combat', 'naraka-cheats-combat'],
	['pubg-hacks-wallhack', 'naraka-cheats-wallhack'],
	['pubg-hacks-aimbot-view', 'naraka-cheats-aimbot-view'],
	['pubg-hacks-aimbot', 'naraka-cheats-aimbot'],
	['pubg-hacks-radar', 'naraka-cheats-radar'],
	['pubg-hacks-session', 'naraka-cheats-session'],
	['pubg-hacks-esp', 'naraka-cheats-esp'],
	['PUBG Features', 'Naraka Features'],
	['PUBG Status', 'Naraka Status'],
	['PUBG patches', 'Naraka patches'],
	['PUBG updates', 'Naraka updates'],
	['PUBG setup', 'Naraka setup'],
	['PUBG license', 'Naraka license'],
	['PUBG licenses', 'Naraka licenses'],
	['PUBG on PC', 'Naraka on PC'],
	['PUBG on Steam', 'Naraka on Steam'],
	['vac-bypass', 'neac-bypass'],
	['BattlEye maintenance', 'NEAC bypass'],
	['BattlEye Maintenance', 'NEAC Bypass'],
	['BattlEye maintenance', 'NEAC maintenance'],
	['Vanguard rebuilds', 'NEAC rebuilds'],
	['BattlEye update', 'NEAC update'],
	['BattlEye updates', 'NEAC updates'],
	['BattlEye patch', 'NEAC patch'],
	['BattlEye patches', 'NEAC patches'],
	["'vac'", "'neac'"],
	['| vac', '| neac'],
	['vac-anti-cheat', 'neac-anti-cheat'],
	['vc_locale', 'nc_locale'],
	['in PUBG', 'in Naraka'],
	['for PUBG', 'for Naraka'],
	['PUBG on', 'Naraka on'],
	['PUBG or', 'Naraka or'],
	["PUBG's", "Naraka's"],
	['PUBG ', 'Naraka '],
	['PUBG,', 'Naraka,'],
	['PUBG.', 'Naraka.'],
	['PUBG', 'Naraka'],
	['valo hacks', 'naraka cheats'],
	['valo cheats', 'naraka cheats'],
	['valo/valo cheats', 'naraka/naraka cheats'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp', 'pubg-hacks-org']);
const SKIP_FILES = new Set([
	'adapt-pubg.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-pubg.mjs',
	'adapt-naraka.mjs',
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
	const to = path.join(ROOT, 'src', 'data', 'naraka.ts');
	try {
		await rename(from, to);
		console.log('Renamed pubg.ts → naraka.ts');
	} catch (e) {
		console.warn(`pubg.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-pubg-images.mjs', 'fetch-naraka-images.mjs'],
		['fetch-pubg-hero.mjs', 'fetch-naraka-hero.mjs'],
		['import-pubg-screenshots.mjs', 'import-naraka-screenshots.mjs'],
		['pubg-hack-overlays.mjs', 'naraka-hack-overlays.mjs'],
		['fix-pubg-copy.mjs', 'fix-naraka-copy.mjs'],
		['fix-pubg-content.mjs', 'fix-naraka-content.mjs'],
		['fix-pubg-lexicon.mjs', 'fix-naraka-lexicon.mjs'],
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
		'naraka-aimbot': 'naraka-aimbot',
		'naraka-esp': 'naraka-esp',
		'naraka-wallhack': 'wallhack',
		'naraka-radar-hack': 'radar',
		'reliable-naraka-cheats': 'reliable',
		'naraka-cheats-2026': 'cheats-2026',
		'neac-bypass': 'neac',
		'naraka-cheats': 'hacks',
		'naraka-cheat-download': 'cheat-download',
		'naraka-mod-menu': 'mod-menu',
		'naraka-soft-aim': 'soft-aim',
		'best-naraka-cheats': 'best-cheats',
		'naraka-aimbot-hack': 'aimbot-hack',
		'naraka-esp-hack': 'esp-hack',
		'naraka-unlock-all': 'unlock-all',
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
		const newName = file
			.replace(/pubg-hacks/g, 'naraka-cheats')
			.replace(/pubg/g, 'naraka');
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
	console.log('Adapting PUBG Hacks → Naraka Cheats (narakacheats.org)...\n');
	await renamePageDirs();
	await renamePUBGTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: update brand.ts, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
