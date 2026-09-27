#!/usr/bin/env node
/**
 * One-time migration: Naraka Cheats → PUBG Hack (pubg-hack.org).
 * Run from project root: node scripts/adapt-pubg-site.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['naraka-aimbot', 'pubg-aimbot'],
	['naraka-esp', 'pubg-esp'],
	['naraka-wallhack', 'pubg-wallhack'],
	['naraka-radar-hack', 'pubg-radar-hack'],
	['reliable-naraka-cheats', 'reliable-pubg-cheats'],
	['naraka-cheats-2026', 'pubg-cheats-2026'],
	['neac-bypass', 'vac-bypass'],
	['naraka-cheats', 'pubg-cheats'],
	['naraka-cheat-download', 'pubg-cheat-download'],
	['naraka-mod-menu', 'pubg-mod-menu'],
	['naraka-soft-aim', 'pubg-soft-aim'],
	['best-naraka-cheats', 'best-pubg-cheats'],
	['naraka-aimbot-hack', 'pubg-aimbot-hack'],
	['naraka-esp-hack', 'pubg-esp-hack'],
	['naraka-unlock-all', 'pubg-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.narakacheats.org', 'https://pubg-hack.org'],
	['https://narakacheats.org', 'https://pubg-hack.org'],
	['https://www.pubghacks.org', 'https://pubg-hack.org'],
	['https://pubghacks.org', 'https://pubg-hack.org'],
	['www.narakacheats.org', 'pubg-hack.org'],
	['narakacheats.org', 'pubg-hack.org'],
	['support@narakacheats.org', 'support@pubg-hack.org'],
	['project-name=narakacheats', 'project-name=pubg-hack'],
	['name = "naraka-cheats-org"', 'name = "pubg-hack"'],
	['"name": "naraka-cheats"', '"name": "pubg-hack"'],
	['https://store.steampowered.com/app/1203220/news/', 'https://www.callofduty.com/pubg/news'],
	['https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/', 'https://www.callofduty.com/pubg'],
	['https://store.steampowered.com/app/1203220', 'https://www.callofduty.com/pubg'],
	['https://naraka.fandom.com/wiki/NARAKA:_BLADEPOINT', 'https://pubg.fandom.com/wiki/Call_of_Duty:_PUBG'],
	['https://naraka.fandom.com', 'https://pubg.fandom.com'],
	['store.steampowered.com/app/1203220', 'playpubg.com'],
	['naraka.fandom.com', 'pubg.fandom.com'],
	['https://www.reddit.com/r/NARAKA/', 'https://www.reddit.com/r/PUBG/'],
	['https://x.com/narakacheats', 'https://x.com/PUBG'],
	['@narakacheats', '@PUBG'],
	['https://pubg-hack.org/go/QRH?to=%2Fproducts%2Fnaraka-bladepoint-novaxware', 'https://pubg-hack.org/store'],
	['/products/naraka-bladepoint-novaxware', '/products/pubg'],
	['/products/naraka', '/products/pubg'],
	['reliable-naraka-cheats', 'reliable-pubg-cheats'],
	['best-naraka-cheats', 'best-pubg-cheats'],
	['naraka-cheat-download', 'pubg-cheat-download'],
	['naraka-cheats-2026', 'pubg-cheats-2026'],
	['naraka-radar-hack', 'pubg-radar-hack'],
	['naraka-aimbot-hack', 'pubg-aimbot-hack'],
	['naraka-esp-hack', 'pubg-esp-hack'],
	['naraka-unlock-all', 'pubg-unlock-all'],
	['naraka-soft-aim', 'pubg-soft-aim'],
	['naraka-mod-menu', 'pubg-mod-menu'],
	['naraka-wallhack', 'pubg-wallhack'],
	['naraka-aimbot', 'pubg-aimbot'],
	['naraka-esp', 'pubg-esp'],
	["'naraka-esp'", "'pubg-esp'"],
	['"naraka-esp"', '"pubg-esp"'],
	["'naraka-aimbot'", "'pubg-aimbot'"],
	['"naraka-aimbot"', '"pubg-aimbot"'],
	['naraka-cheats', 'pubg-cheats'],
	['naraka-cheat', 'pubg-cheat'],
	['narakaImages', 'pubgImages'],
	["from './naraka'", "from './pubg'"],
	["from '../data/naraka'", "from '../data/pubg'"],
	["from '../../data/naraka'", "from '../../data/pubg'"],
	['fetch-naraka-images', 'fetch-pubg-images'],
	['fetch-naraka-hero', 'fetch-pubg-hero'],
	['import-naraka-screenshots', 'import-pubg-screenshots'],
	['naraka-hack-overlays', 'pubg-hack-overlays'],
	['fix-naraka-copy', 'fix-pubg-copy'],
	['fix-naraka-content', 'fix-pubg-content'],
	['fix-naraka-lexicon', 'fix-pubg-lexicon'],
	['adapt-naraka', 'adapt-pubg-site'],
	['rebrand-naraka-cheats', 'rebrand-pubg-cheats'],
	['trucos-naraka', 'trucos-pubg'],
	['triche-naraka', 'triche-pubg'],
	['cheats-naraka', 'cheats-pubg'],
	['trucchi-naraka', 'trucchi-pubg'],
	['cheaty-naraka', 'cheaty-pubg'],
	['chity-naraka', 'chity-pubg'],
	['chitov-naraka', 'chitov-pubg'],
	['chitiv-naraka', 'chitiv-pubg'],
	['cheatow-naraka', 'cheatow-pubg'],
	['hile-naraka', 'hile-pubg'],
	['naraka-hile', 'pubg-hile'],
	['naraka-esp-chity', 'pubg-esp-chity'],
	['naraka-aimbot-chity', 'pubg-aimbot-chity'],
	['unentdeckte-naraka-cheats', 'unentdeckte-pubg-cheats'],
	['cheats-naraka-indetectaveis', 'cheats-pubg-indetectaveis'],
	['trucchi-naraka-indetectabili', 'trucchi-pubg-indetectabili'],
	['niewykrywalne-cheats-naraka', 'niewykrywalne-cheats-pubg'],
	['nedecektiruemye-chity-naraka', 'nedecektiruemye-chity-pubg'],
	['tespit-edilemeyen-naraka-hileleri', 'tespit-edilemeyen-pubg-hileleri'],
	['nedecektovani-chity-naraka', 'nedecektovani-chity-pubg'],
	['cheats-naraka-nedetectabile', 'cheats-pubg-nedetectabile'],
	['basta-naraka-cheats', 'basta-pubg-cheats'],
	['naraka-cheats-funktionen', 'pubg-cheats-funktionen'],
	['naraka-cheats-functies', 'pubg-cheats-functies'],
	['caracteristicas-trucos-naraka', 'caracteristicas-trucos-pubg'],
	['fonctionnalites-triche-naraka', 'fonctionnalites-triche-pubg'],
	['recursos-cheats-naraka', 'recursos-cheats-pubg'],
	['maps, zones, and combat points', 'maps, sites, and buy stations'],
	['maps, zones and combat points', 'maps, sites and buy stations'],
	['battle royale rounds and battle royale matches matches', 'battle royale matches rounds and battle royale matches matches'],
	['players & ranked teams', 'agents & ranked teams'],
	['player markers', 'operator markers'],
	['combat zones', 'buy stations'],
	['maps and combat zones', 'maps and bomb sites'],
	['near combat zones and choke points', 'near bomb sites and choke points'],
	['grapple routes', 'loadout drop routes'],
	['Hero and weapon ESP', 'Agent and ability ESP'],
	['player ESP', 'operator ESP'],
	['elimination worth the push', 'round win worth the push'],
	['melee combat tools', 'tactical tools'],
	['24 Entertainment', 'Riot Games'],
	['melee combat', 'competitive fight'],
	['melee combat sessions', 'competitive fights'],
	['battle royale tips', 'competitive tips'],
	['map zones', 'map callouts'],
	['in combat zones', 'on bomb sites'],
	['NarakaCheatsSite', 'PUBGCheatsSite'],
	['Naraka Intel', 'PUBG Intel'],
	['Naraka Cheats', 'PUBG Hack'],
	['naraka cheats', 'PUBG hacks'],
	['naraka cheat', 'PUBG hack'],
	['Naraka ESP', 'PUBG ESP'],
	['Naraka Aimbot', 'PUBG Aimbot'],
	['naraka esp', 'PUBG esp'],
	['naraka aimbot', 'PUBG aimbot'],
	['naraka wallhack', 'PUBG wallhack'],
	['naraka radar', 'pubg radar'],
	['Buy Naraka Cheats', 'Buy PUBG Hack'],
	['what-are-naraka-cheats', 'what-are-pubg-cheats'],
	['are-naraka-cheats-reliable-in-2026', 'are-pubg-cheats-reliable-in-2026'],
	['battle-royale-rounds-and-ranked-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-naraka-wallhack', 'what-is-a-pubg-wallhack'],
	['does-naraka-cheats-include-radar-hack', 'does-pubg-cheats-include-radar-hack'],
	['neac-anti-cheat-and-naraka-cheats', 'vac-anti-cheat-and-pubg-cheats'],
	['buy-reliable-naraka-cheats-windows-pc', 'buy-reliable-pubg-cheats-windows-pc'],
	['naraka-soft-aim-review', 'pubg-soft-aim-review'],
	['naraka-esp-ranked-review', 'pubg-esp-ranked-review'],
	['naraka-cloud-dma-review', 'pubg-cloud-dma-review'],
	['naraka-cheat-setup-review', 'pubg-cheat-setup-review'],
	['naraka-hero-esp-review', 'pubg-agent-esp-review'],
	['naraka-soft-aim-ranked-review', 'pubg-soft-aim-ranked-review'],
	['naraka-radar-hack-review', 'pubg-radar-hack-review'],
	['naraka-neac-update-review', 'pubg-vac-update-review'],
	['naraka-melee-soft-aim-review', 'pubg-operator-soft-aim-review'],
	['xKrypt0_Naraka', 'xKrypt0_PUBG'],
	['vanLifeNaraka', 'vanLifePUBG'],
	['naraka-screenshot', 'pubg-screenshot'],
	['naraka-cheats-logo', 'pubg-cheats-logo'],
	['naraka-cheats-hero', 'pubg-cheats-hero'],
	['naraka-hero-banner', 'pubg-hero-banner'],
	['naraka-hero-ghost', 'pubg-hero-ghost'],
	['naraka-hero-source', 'pubg-hero-source'],
	['naraka-esp-player-tags', 'pubg-esp-player-tags'],
	['naraka-wallhack-skeleton', 'pubg-wallhack-skeleton'],
	['naraka-aimbot-skeleton', 'pubg-aimbot-skeleton'],
	['naraka-aimbot-melee', 'pubg-aimbot-operator'],
	['naraka-esp-radar', 'pubg-esp-radar'],
	['naraka-cheats-combat', 'pubg-cheats-combat'],
	['naraka-cheats-wallhack', 'pubg-cheats-wallhack'],
	['naraka-cheats-aimbot-view', 'pubg-cheats-aimbot-view'],
	['naraka-cheats-aimbot', 'pubg-cheats-aimbot'],
	['naraka-cheats-radar', 'pubg-cheats-radar'],
	['naraka-cheats-session', 'pubg-cheats-session'],
	['naraka-cheats-esp', 'pubg-cheats-esp'],
	['Naraka Features', 'PUBG Features'],
	['Naraka Status', 'PUBG Status'],
	['Naraka patches', 'PUBG patches'],
	['Naraka updates', 'PUBG updates'],
	['Naraka setup', 'PUBG setup'],
	['Naraka license', 'PUBG license'],
	['Naraka licenses', 'PUBG licenses'],
	['Naraka on PC', 'PUBG on PC'],
	['Naraka on Steam', 'PUBG on PC'],
	['neac-bypass', 'vac-bypass'],
	['NEAC bypass', 'BattlEye maintenance'],
	['NEAC Bypass', 'BattlEye Maintenance'],
	['NEAC maintenance', 'BattlEye maintenance'],
	['NEAC rebuilds', 'Vanguard rebuilds'],
	['NEAC update', 'BattlEye update'],
	['NEAC updates', 'BattlEye updates'],
	['NEAC patch', 'BattlEye patch'],
	['NEAC patches', 'BattlEye patches'],
	["'neac'", "'vac'"],
	['| neac', '| vac'],
	['neac-anti-cheat', 'vac-anti-cheat'],
	['nc_locale', 'vc_locale'],
	['in Naraka', 'in PUBG'],
	['for Naraka', 'for PUBG'],
	['Naraka on', 'PUBG on'],
	['Naraka or', 'PUBG or'],
	["Naraka's", "PUBG's"],
	['Naraka ', 'PUBG '],
	['Naraka,', 'PUBG,'],
	['Naraka.', 'PUBG.'],
	['Naraka', 'PUBG'],
	['naraka hacks', 'PUBG hacks'],
	['naraka hack', 'PUBG hack'],
	['naraka/naraka cheats', 'pubg/PUBG hacks'],
	// Remove brand references from visible copy (keep checkout URLs intact)
	['Zadeyo checkout', 'secure checkout'],
	[' checkout', 'secure checkout'],
	['Zadeyo', 'checkout'],
	['narakacheats.net', 'pubg-hack.org'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'tmp']);
const SKIP_FILES = new Set([
	'adapt-pubg.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-rust.mjs',
	'adapt-finals.mjs',
	'adapt-pubg.mjs',
	'adapt-naraka.mjs',
	'adapt-pubg-site.mjs',
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

async function renameNarakaTs() {
	const from = path.join(ROOT, 'src', 'data', 'naraka.ts');
	const to = path.join(ROOT, 'src', 'data', 'pubg.ts');
	try {
		await rename(from, to);
		console.log('Renamed naraka.ts → pubg.ts');
	} catch (e) {
		console.warn(`naraka.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-naraka-images.mjs', 'fetch-pubg-images.mjs'],
		['fetch-naraka-hero.mjs', 'fetch-pubg-hero.mjs'],
		['import-naraka-screenshots.mjs', 'import-pubg-screenshots.mjs'],
		['naraka-hack-overlays.mjs', 'pubg-hack-overlays.mjs'],
		['fix-naraka-copy.mjs', 'fix-pubg-copy.mjs'],
		['fix-naraka-content.mjs', 'fix-pubg-content.mjs'],
		['fix-naraka-lexicon.mjs', 'fix-pubg-lexicon.mjs'],
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
		'pubg-aimbot': 'pubg-aimbot',
		'pubg-esp': 'pubg-esp',
		'pubg-wallhack': 'wallhack',
		'pubg-radar-hack': 'radar',
		'reliable-pubg-cheats': 'reliable',
		'pubg-cheats-2026': 'cheats-2026',
		'vac-bypass': 'vac',
		'pubg-cheats': 'hacks',
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
		if (!file.includes('naraka')) continue;
		const newName = file
			.replace(/naraka-cheats/g, 'pubg-cheats')
			.replace(/naraka/g, 'pubg');
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
	console.log('Adapting Naraka Cheats → PUBG Hack (pubg-hack.org)...\n');
	await renamePageDirs();
	await renameNarakaTs();
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
