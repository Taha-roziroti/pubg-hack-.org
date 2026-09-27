#!/usr/bin/env node
/**
 * One-time migration: Valorant Cheats template → PUBG PUBG (pubg-hack.org).
 * Run from project root: node scripts/adapt-valorant-to-pubg.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['valorant-aimbot', 'pubg-aimbot'],
	['valorant-esp', 'pubg-esp'],
	['valorant-wallhack', 'pubg-wallhack'],
	['valorant-radar-hack', 'pubg-radar-hack'],
	['reliable-valorant-cheats', 'reliable-pubg-cheats'],
	['valorant-cheats-2026', 'pubg-cheats-2026'],
	['vanguard-bypass', 'vac-bypass'],
	['valorant-cheats', 'pubg-cheats'],
	['valorant-cheat-download', 'pubg-cheat-download'],
	['valorant-mod-menu', 'pubg-mod-menu'],
	['valorant-soft-aim', 'pubg-soft-aim'],
	['best-valorant-cheats', 'best-pubg-cheats'],
	['valorant-aimbot-hack', 'pubg-aimbot-hack'],
	['valorant-esp-hack', 'pubg-esp-hack'],
	['valorant-unlock-all', 'pubg-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://cheatsforvalorant.net', 'https://pubg-hack.org'],
	['cheatsforvalorant.net', 'pubg-hack.org'],
	['support@cheatsforvalorant.net', 'support@pubg-hack.org'],
	['project-name=cheatsforvalorant', 'project-name=pubg-hack'],
	['name = "cheats-for-valorant"', 'name = "pubg-hack"'],
	['"name": "cheats-for-valorant"', '"name": "pubg-hack"'],
	['https://playvalorant.com/en-us/news/', 'https://www.callofduty.com/pubg/news'],
	['https://playvalorant.com/', 'https://www.callofduty.com/pubg'],
	['https://playvalorant.com', 'https://www.callofduty.com/pubg'],
	['https://valorant.fandom.com/wiki/VALORANT', 'https://pubg.fandom.com/wiki/Call_of_Duty:_PUBG'],
	['https://valorant.fandom.com', 'https://pubg.fandom.com'],
	['https://www.reddit.com/r/VALORANT/', 'https://www.reddit.com/r/PUBG/'],
	['https://x.com/PlayVALORANT', 'https://x.com/PUBG'],
	['@PlayVALORANT', '@PUBG'],
	['/products/valorant', '/products/pubg'],
	['reliable-valorant-cheats', 'reliable-pubg-cheats'],
	['best-valorant-cheats', 'best-pubg-cheats'],
	['valorant-cheat-download', 'pubg-cheat-download'],
	['valorant-cheats-2026', 'pubg-cheats-2026'],
	['valorant-radar-hack', 'pubg-radar-hack'],
	['valorant-aimbot-hack', 'pubg-aimbot-hack'],
	['valorant-esp-hack', 'pubg-esp-hack'],
	['valorant-unlock-all', 'pubg-unlock-all'],
	['valorant-soft-aim', 'pubg-soft-aim'],
	['valorant-mod-menu', 'pubg-mod-menu'],
	['valorant-wallhack', 'pubg-wallhack'],
	['valorant-aimbot', 'pubg-aimbot'],
	['valorant-esp', 'pubg-esp'],
	["'valorant-esp'", "'pubg-esp'"],
	['"valorant-esp"', '"pubg-esp"'],
	["'valorant-aimbot'", "'pubg-aimbot'"],
	['"valorant-aimbot"', '"pubg-aimbot"'],
	['valorant-cheats', 'pubg-cheats'],
	['valorant-cheat', 'pubg-cheat'],
	['valorantImages', 'pubgImages'],
	["from './valorant'", "from './pubg'"],
	["from '../data/valorant'", "from '../data/pubg'"],
	["from '../../data/valorant'", "from '../../data/pubg'"],
	['fetch-valorant-images', 'fetch-pubg-images'],
	['fetch-valorant-hero', 'fetch-pubg-hero'],
	['import-valorant-screenshots', 'import-pubg-screenshots'],
	['valorant-hack-overlays', 'pubg-hack-overlays'],
	['fix-valorant-copy', 'fix-pubg-copy'],
	['fix-valorant-content', 'fix-pubg-content'],
	['fix-valorant-lexicon', 'fix-pubg-lexicon'],
	['adapt-valorant-site', 'adapt-pubg-site'],
	['rebrand-valorant-cheats', 'rebrand-pubg-cheats'],
	['trucos-valorant', 'trucos-pubg'],
	['triche-valorant', 'triche-pubg'],
	['cheats-valorant', 'cheats-pubg'],
	['trucchi-valorant', 'trucchi-pubg'],
	['cheaty-valorant', 'cheaty-pubg'],
	['chity-valorant', 'chity-pubg'],
	['chitov-valorant', 'chitov-pubg'],
	['chitiv-valorant', 'chitiv-pubg'],
	['cheatow-valorant', 'cheatow-pubg'],
	['hile-valorant', 'hile-pubg'],
	['valorant-hile', 'pubg-hile'],
	['valorant-esp-chity', 'pubg-esp-chity'],
	['valorant-aimbot-chity', 'pubg-aimbot-chity'],
	['unentdeckte-valorant-cheats', 'unentdeckte-pubg-cheats'],
	['cheats-valorant-indetectaveis', 'cheats-pubg-indetectaveis'],
	['trucchi-valorant-indetectabili', 'trucchi-pubg-indetectabili'],
	['niewykrywalne-cheats-valorant', 'niewykrywalne-cheats-pubg'],
	['nedecektiruemye-chity-valorant', 'nedecektiruemye-chity-pubg'],
	['tespit-edilemeyen-valorant-hileleri', 'tespit-edilemeyen-pubg-hileleri'],
	['nedecektovani-chity-valorant', 'nedecektovani-chity-pubg'],
	['cheats-valorant-nedetectabile', 'cheats-pubg-nedetectabile'],
	['basta-valorant-cheats', 'basta-pubg-cheats'],
	['valorant-cheats-funktionen', 'pubg-cheats-funktionen'],
	['valorant-cheats-functies', 'pubg-cheats-functies'],
	['caracteristicas-trucos-valorant', 'caracteristicas-trucos-pubg'],
	['fonctionnalites-triche-valorant', 'fonctionnalites-triche-pubg'],
	['recursos-cheats-valorant', 'recursos-cheats-pubg'],
	['funzioni-trucchi-valorant', 'funzioni-trucchi-pubg'],
	["'vanguard'", "'vac'"],
	['| vanguard', '| vac'],
	['vanguard-bypass', 'vac-bypass'],
	['Valorant Hacks', 'PUBG Hacks'],
	['Valorant Cheats', 'PUBG Hack'],
	['Valorant cheats', 'PUBG hacks'],
	['Valorant cheat', 'PUBG hack'],
	['Valorant Intel', 'PUBG Intel'],
	['Vanguard anti-cheat', 'BattlEye anti-cheat'],
	['Vanguard maintenance', 'BattlEye maintenance'],
	['Vanguard bypass', 'BattlEye maintenance'],
	['Vanguard Bypass', 'BattlEye Maintenance'],
	['Vanguard patches', 'BattlEye patches'],
	['Vanguard patch', 'BattlEye patch'],
	['Vanguard updates', 'BattlEye updates'],
	['Vanguard update', 'BattlEye update'],
	['after Vanguard', 'after BattlEye'],
	['valorant hacks', 'PUBG hacks'],
	['valorant cheats', 'PUBG hacks'],
	['Quick Match and Ranked', 'battle royale matches and Resurgence'],
	['Quick Match', 'Resurgence'],
	['battle royale matches', 'battle royale matches matches'],
	['competitive rounds', 'battle royale matches rounds'],
	['agent markers', 'operator markers'],
	['agent ESP', 'operator ESP'],
	['enemy agents', 'enemy operators'],
	['spike zones', 'buy stations'],
	['spike plant', 'loadout drop'],
	['valorant-screenshot', 'pubg-screenshot'],
	['valorant-cheats-logo', 'pubg-cheats-logo'],
	['valorant-site-icon', 'pubg-site-icon'],
	['valorant-hero-poster', 'pubg-hero-poster'],
	['valorant-cheats-hero', 'pubg-cheats-hero'],
	['valorant-cheats-esp', 'pubg-cheats-esp'],
	['valorant-cheats-aimbot', 'pubg-cheats-aimbot'],
	['valorant-cheats-wallhack', 'pubg-cheats-wallhack'],
	['valorant-cheats-radar', 'pubg-cheats-radar'],
	['valorant-cheats-combat', 'pubg-cheats-combat'],
	['valorant-cheats-session', 'pubg-cheats-session'],
	['valorant-esp-player-tags', 'pubg-esp-player-tags'],
	['valorant-esp-radar', 'pubg-esp-radar'],
	['valorant-aimbot-skeleton', 'pubg-aimbot-skeleton'],
	['valorant-aimbot-sniper', 'pubg-aimbot-sniper'],
	['valorant-wallhack-skeleton', 'pubg-wallhack-skeleton'],
	['--font-valorant', '--font-pubg'],
	['font-valorant', 'font-pubg'],
	['VALORANT', 'WARZONE'],
	['Valorant', 'PUBG'],
	['valorant', 'pubg'],
	['vanguard', 'vac'],
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
	let out = content;
	for (const [from, to] of REPLACEMENTS) {
		out = out.replaceAll(from, to);
	}
	return out;
}

async function renamePageDirs() {
	const pagesDir = path.join(ROOT, 'src', 'pages');
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const fromPath = path.join(pagesDir, from);
		const toPath = path.join(pagesDir, to);
		try {
			await rename(fromPath, toPath);
			console.log(`Renamed pages/${from} → pages/${to}`);
		} catch {
			// may not exist
		}
	}
}

async function renameDataFile() {
	const from = path.join(ROOT, 'src', 'data', 'valorant.ts');
	const to = path.join(ROOT, 'src', 'data', 'pubg.ts');
	try {
		await rename(from, to);
		console.log('Renamed src/data/valorant.ts → pubg.ts');
	} catch {
		// already renamed
	}
}

async function processFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (file.includes('adapt-valorant-to-pubg.mjs')) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated);
			changed += 1;
		}
	}
	console.log(`Updated ${changed} files`);
}

async function main() {
	await renamePageDirs();
	await renameDataFile();
	await processFiles();
	console.log('PUBG migration complete.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
