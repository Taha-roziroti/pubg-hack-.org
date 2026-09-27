#!/usr/bin/env node
/**
 * One-time migration: The Final Cheats → PUBG Hacks (pubghacks.org).
 * Run from project root: node scripts/adapt-pubg.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['finals-aimbot', 'pubg-aimbot'],
	['finals-esp', 'pubg-esp'],
	['finals-wallhack', 'pubg-wallhack'],
	['finals-radar-hack', 'pubg-radar-hack'],
	['reliable-finals-cheats', 'reliable-pubg-hacks'],
	['finals-cheats-2026', 'pubg-hacks-2026'],
	['eac-bypass', 'vac-bypass'],
	['finals-cheats', 'pubg-hacks'],
	['finals-cheat-download', 'pubg-cheat-download'],
	['finals-mod-menu', 'pubg-mod-menu'],
	['finals-soft-aim', 'pubg-soft-aim'],
	['best-finals-cheats', 'best-pubg-hacks'],
	['finals-aimbot-hack', 'pubg-aimbot-hack'],
	['finals-esp-hack', 'pubg-esp-hack'],
	['finals-unlock-all', 'pubg-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://www.thefinalscheats.org', 'https://www.pubghacks.org'],
	['https://thefinalscheats.org', 'https://pubghacks.org'],
	['www.thefinalscheats.org', 'www.pubghacks.org'],
	['thefinalscheats.org', 'pubghacks.org'],
	['support@thefinalscheats.org', 'support@pubghacks.org'],
	['project-name=thefinalscheats', 'project-name=pubghacks'],
	['name = "thefinalscheats"', 'name = "pubghacks"'],
	['"name": "the-finals-cheats"', '"name": "pubg-hacks"'],
	['https://store.steampowered.com/app/2073850/THE_FINALS/', 'https://www.callofduty.com/pubg'],
	['https://store.steampowered.com/app/2073850/news/', 'https://www.callofduty.com/pubg/news'],
	['https://store.steampowered.com/app/2073850', 'https://www.callofduty.com/pubg'],
	['https://steamcommunity.com/app/2073850', 'https://www.callofduty.com/pubg'],
	['https://www.reachthefinals.com/', 'https://www.callofduty.com/pubg'],
	['https://thefinals.fandom.com/wiki/The_Finals', 'https://pubg.fandom.com/wiki/Call_of_Duty:_PUBG'],
	['https://thefinals.fandom.com', 'https://pubg.fandom.com'],
	['reachthefinals.com', 'playpubg.com'],
	['thefinals.fandom.com', 'pubg.fandom.com'],
	['/products/the-finals', '/products/pubg'],
	['reliable-finals-cheats', 'reliable-pubg-hacks'],
	['best-finals-cheats', 'best-pubg-hacks'],
	['finals-cheat-download', 'pubg-cheat-download'],
	['finals-cheats-2026', 'pubg-hacks-2026'],
	['finals-radar-hack', 'pubg-radar-hack'],
	['finals-aimbot-hack', 'pubg-aimbot-hack'],
	['finals-esp-hack', 'pubg-esp-hack'],
	['finals-unlock-all', 'pubg-unlock-all'],
	['finals-soft-aim', 'pubg-soft-aim'],
	['finals-mod-menu', 'pubg-mod-menu'],
	['finals-wallhack', 'pubg-wallhack'],
	['finals-aimbot', 'pubg-aimbot'],
	['finals-esp', 'pubg-esp'],
	["'finals-esp'", "'pubg-esp'"],
	['"finals-esp"', '"pubg-esp"'],
	["'finals-aimbot'", "'pubg-aimbot'"],
	['"finals-aimbot"', '"pubg-aimbot"'],
	['finals-cheats', 'pubg-hacks'],
	['finals-cheat', 'pubg-cheat'],
	['finalsImages', 'pubgImages'],
	["from './finals'", "from './pubg'"],
	["from '../data/finals'", "from '../data/pubg'"],
	["from '../../data/finals'", "from '../../data/pubg'"],
	['fetch-finals-images', 'fetch-pubg-images'],
	['fetch-finals-hero', 'fetch-pubg-hero'],
	['import-finals-screenshots', 'import-pubg-screenshots'],
	['finals-hack-overlays', 'pubg-hack-overlays'],
	['fix-finals-copy', 'fix-pubg-copy'],
	['fix-finals-content', 'fix-pubg-content'],
	['adapt-finals', 'adapt-pubg'],
	['trucos-finals', 'trucos-pubg'],
	['triche-finals', 'triche-pubg'],
	['cheats-finals', 'cheats-pubg'],
	['trucchi-finals', 'trucchi-pubg'],
	['cheaty-finals', 'cheaty-pubg'],
	['chity-finals', 'chity-pubg'],
	['chitov-finals', 'chitov-pubg'],
	['chitiv-finals', 'chitiv-pubg'],
	['cheatow-finals', 'cheatow-pubg'],
	['hile-finals', 'hile-pubg'],
	['finals-hile', 'pubg-hile'],
	['finals-esp-chity', 'pubg-esp-chity'],
	['finals-aimbot-chity', 'pubg-aimbot-chity'],
	['unentdeckte-finals-cheats', 'unentdeckte-pubg-hacks'],
	['cheats-finals-indetectaveis', 'hacks-pubg-indetectaveis'],
	['trucchi-finals-indetectabili', 'trucchi-pubg-indetectabili'],
	['niewykrywalne-cheats-finals', 'niewykrywalne-hacks-pubg'],
	['nedecektiruemye-chity-finals', 'nedecektiruemye-chity-pubg'],
	['tespit-edilemeyen-finals-hileleri', 'tespit-edilemeyen-pubg-hileleri'],
	['nedecektovani-chity-finals', 'nedecektovani-chity-pubg'],
	['cheats-finals-nedetectabile', 'hacks-pubg-nedetectabile'],
	['basta-finals-cheats', 'basta-pubg-hacks'],
	['finals-cheats-funktionen', 'pubg-hacks-funktionen'],
	['finals-cheats-functies', 'pubg-hacks-functies'],
	['caracteristicas-trucos-finals', 'caracteristicas-trucos-pubg'],
	['fonctionnalites-triche-finals', 'fonctionnalites-triche-pubg'],
	['recursos-cheats-finals', 'recursos-hacks-pubg'],
	['arenas, stadiums, and cashout zones', 'maps, sites, and buy stations'],
	['arenas, stadiums and cashout zones', 'maps, sites and buy stations'],
	['cashout rounds and arena PvP sessions', 'battle royale matches rounds and battle royale matches matches'],
	['cashout rounds and arena PvP fights', 'battle royale matches rounds and battle royale matches matches'],
	['contestants & cashout teams', 'agents & ranked teams'],
	['spike markers', 'operator markers'],
	['cashout zones', 'buy stations'],
	['arenas and cashout spikes', 'maps and bomb sites'],
	['near arenas and cashout spikes', 'near bomb sites and choke points'],
	['cashout routes', 'loadout drop routes'],
	['Spike and cashout ESP', 'Agent and ability ESP'],
	['spike ESP', 'operator ESP'],
	['cashout worth the detour', 'round win worth the push'],
	['arena tools', 'tactical tools'],
	['Embark Studios', 'Riot Games'],
	['arena fight', 'competitive fight'],
	['arena fights', 'competitive fights'],
	['arena tips', 'competitive tips'],
	['arena map', 'map callouts'],
	['in stadiums', 'on maps'],
	['in cashout zones', 'on bomb sites'],
	['Arena', 'Map'],
	['FinalsCheatsSite', 'PUBGCheatsSite'],
	['Finals Intel', 'PUBG Intel'],
	['The Final Cheats', 'PUBG Hacks'],
	['the finals cheats', 'PUBG hacks'],
	['the finals cheat', 'PUBG hack'],
	['thefinals cheats', 'PUBG hacks'],
	['thefinals cheat', 'PUBG hack'],
	['thefinals hacks', 'PUBG hacks'],
	['thefinals hack', 'PUBG hack'],
	['The Finals ESP', 'PUBG ESP'],
	['The Finals Aimbot', 'PUBG Aimbot'],
	['the finals esp', 'PUBG esp'],
	['the finals aimbot', 'PUBG aimbot'],
	['the finals wallhack', 'PUBG wallhack'],
	['the finals radar', 'pubg radar'],
	['Buy The Finals Cheats', 'Buy PUBG Hacks'],
	['what-are-finals-cheats', 'what-are-pubg-hacks'],
	['are-finals-cheats-reliable-in-2026', 'are-pubg-hacks-reliable-in-2026'],
	['cashout-rounds-and-arena-sessions', 'competitive-rounds-and-ranked-sessions'],
	['what-is-a-finals-wallhack', 'what-is-a-pubg-wallhack'],
	['does-finals-cheats-include-radar-hack', 'does-pubg-hacks-include-radar-hack'],
	['eac-anti-cheat-and-finals-cheats', 'vac-anti-cheat-and-pubg-hacks'],
	['buy-reliable-finals-cheats-windows-pc', 'buy-reliable-pubg-hacks-windows-pc'],
	['finals-soft-aim-review', 'pubg-soft-aim-review'],
	['finals-esp-cashout-review', 'pubg-esp-ranked-review'],
	['finals-cloud-dma-review', 'pubg-cloud-dma-review'],
	['finals-cheat-setup-review', 'pubg-cheat-setup-review'],
	['finals-spike-esp-review', 'pubg-agent-esp-review'],
	['finals-soft-aim-match-review', 'pubg-soft-aim-ranked-review'],
	['finals-radar-hack-review', 'pubg-radar-hack-review'],
	['finals-eac-update-review', 'pubg-vac-update-review'],
	['finals-sniper-soft-aim-review', 'pubg-operator-soft-aim-review'],
	['xKrypt0_Finals', 'xKrypt0_PUBG'],
	['vanLifeFinals', 'vanLifePUBG'],
	['finals-screenshot', 'pubg-screenshot'],
	['finals-cheats-logo', 'pubg-hacks-logo'],
	['finals-cheats-hero', 'pubg-hacks-hero'],
	['finals-hero-banner', 'pubg-hero-banner'],
	['finals-hero-ghost', 'pubg-hero-ghost'],
	['finals-hero-source', 'pubg-hero-source'],
	['finals-esp-player-tags', 'pubg-esp-player-tags'],
	['finals-wallhack-skeleton', 'pubg-wallhack-skeleton'],
	['finals-aimbot-skeleton', 'pubg-aimbot-skeleton'],
	['finals-aimbot-sniper', 'pubg-aimbot-operator'],
	['finals-esp-radar', 'pubg-esp-radar'],
	['finals-cheats-combat', 'pubg-hacks-combat'],
	['finals-cheats-wallhack', 'pubg-hacks-wallhack'],
	['finals-cheats-aimbot-view', 'pubg-hacks-aimbot-view'],
	['finals-cheats-aimbot', 'pubg-hacks-aimbot'],
	['finals-cheats-radar', 'pubg-hacks-radar'],
	['finals-cheats-session', 'pubg-hacks-session'],
	['finals-cheats-esp', 'pubg-hacks-esp'],
	['The Finals Hacks', 'PUBG Hacks'],
	['The Finals Features', 'PUBG Features'],
	['The Finals Status', 'PUBG Status'],
	['The Finals patches', 'PUBG patches'],
	['The Finals updates', 'PUBG updates'],
	['The Finals setup', 'PUBG setup'],
	['The Finals license', 'PUBG license'],
	['The Finals licenses', 'PUBG licenses'],
	['The Finals on Steam', 'PUBG on PC'],
	['eac-bypass', 'vac-bypass'],
	['EAC bypass', 'BattlEye maintenance'],
	['EAC Bypass', 'BattlEye Maintenance'],
	['EAC maintenance', 'BattlEye maintenance'],
	['EAC rebuilds', 'Vanguard rebuilds'],
	['EAC update', 'BattlEye update'],
	['EAC updates', 'BattlEye updates'],
	['EAC patch', 'BattlEye patch'],
	['EAC patches', 'BattlEye patches'],
	['Easy Anti-Cheat (EAC)', 'Vanguard'],
	['Easy Anti-Cheat', 'Vanguard'],
	["'eac'", "'vac'"],
	['| eac', '| vac'],
	['eac-anti-cheat', 'vac-anti-cheat'],
	['fc_locale', 'vc_locale'],
	['in The Finals', 'in PUBG'],
	['for The Finals', 'for PUBG'],
	['The Finals on', 'PUBG on'],
	['The Finals or', 'PUBG or'],
	["The Finals'", "PUBG's"],
	['The Finals ', 'PUBG '],
	['The Finals,', 'PUBG,'],
	['The Finals.', 'PUBG.'],
	['The Finals', 'PUBG'],
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

async function renameFinalsTs() {
	const from = path.join(ROOT, 'src', 'data', 'finals.ts');
	const to = path.join(ROOT, 'src', 'data', 'pubg.ts');
	try {
		await rename(from, to);
		console.log('Renamed finals.ts → pubg.ts');
	} catch (e) {
		console.warn(`finals.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-finals-images.mjs', 'fetch-pubg-images.mjs'],
		['fetch-finals-hero.mjs', 'fetch-pubg-hero.mjs'],
		['import-finals-screenshots.mjs', 'import-pubg-screenshots.mjs'],
		['finals-hack-overlays.mjs', 'pubg-hack-overlays.mjs'],
		['fix-finals-copy.mjs', 'fix-pubg-copy.mjs'],
		['fix-finals-content.mjs', 'fix-pubg-content.mjs'],
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
		'reliable-pubg-hacks': 'reliable',
		'pubg-hacks-2026': 'cheats-2026',
		'vac-bypass': 'vac',
		'pubg-hacks': 'hacks',
		'pubg-cheat-download': 'cheat-download',
		'pubg-mod-menu': 'mod-menu',
		'pubg-soft-aim': 'soft-aim',
		'best-pubg-hacks': 'best-cheats',
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
		if (!file.includes('finals')) continue;
		const newName = file
			.replace(/finals-cheats/g, 'pubg-hacks')
			.replace(/finals/g, 'pubg');
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
	console.log('Adapting The Final Cheats → PUBG Hacks (pubghacks.org)...\n');
	await renamePageDirs();
	await renameFinalsTs();
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
