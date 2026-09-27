#!/usr/bin/env node
/**
 * Migrate URL slugs from pubg-cheats → pubg-cheats (paths + sitemaps).
 * Generates 301 redirects in functions/path-redirects.json from old routing slugs.
 * Run: node scripts/migrate-cheats-urls-to-hacks.mjs
 */
import { readFile, writeFile, readdir, rename, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROUTING = path.join(ROOT, 'src/data/i18n/routing.ts');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

const SKIP_DIRS = new Set([
	'node_modules',
	'dist',
	'.git',
	'tmp',
	'.astro',
	'the-finals-cheats-org',
	'pubg-cheats-org-audit',
]);
const SKIP_FILES = new Set(['package-lock.json', 'migrate-cheats-urls-to-hacks.mjs']);

/** Ordered — longest / most specific first. Image asset names are excluded via guard. */
const SLUG_REPLACEMENTS = [
	['reliable-pubg-cheats-eac', 'reliable-pubg-cheats-eac'],
	['reliable-pubg-cheats', 'reliable-pubg-cheats'],
	['unentdeckte-pubg-cheats', 'unentdeckte-pubg-cheats'],
	['buy-reliable-pubg-cheats-windows-pc', 'buy-reliable-pubg-cheats-windows-pc'],
	['vac-anti-cheat-and-pubg-cheats', 'vac-anti-cheat-and-pubg-cheats'],
	['are-pubg-cheats-reliable-in-2026', 'are-pubg-cheats-reliable-in-2026'],
	['what-are-pubg-cheats', 'what-are-pubg-cheats'],
	['does-pubg-cheats-include-radar-hack', 'does-pubg-cheats-include-radar-hack'],
	['pubg-cheats-vs-ghostware-features-pricing', 'pubg-cheats-vs-ghostware-features-pricing'],
	['pubg-cheats-vs-cheatspike-comparison', 'pubg-cheats-vs-cheatspike-comparison'],
	['elitefn-vs-pubg-cheats-two-week-test', 'elitefn-vs-pubg-cheats-two-week-test'],
	['pubg-cheats-complete-guide-2026', 'pubg-cheats-complete-guide-2026'],
	['pubg-cheats-2026-whats-new', 'pubg-cheats-2026-whats-new'],
	['pubg-cheats-buyers-guide', 'pubg-cheats-buyers-guide'],
	['best-pubg-cheats', 'best-pubg-cheats'],
	['beste-pubg-cheats', 'beste-pubg-cheats'],
	['basta-pubg-cheats', 'basta-pubg-cheats'],
	['nejlepsi-pubg-cheats', 'nejlepsi-pubg-cheats'],
	['pubg-cheats-2026', 'pubg-cheats-2026'],
	['pubg-cheats-funktionen', 'pubg-cheats-funktionen'],
	['pubg-cheats-functies', 'pubg-cheats-functies'],
	['pubg-cheats-funkce', 'pubg-cheats-funkce'],
	['pubg-cheats-funktioner', 'pubg-cheats-funktioner'],
	['pubg-cheats-features', 'pubg-cheats-features'],
	['pubg-cheats-preise', 'pubg-cheats-preise'],
	['pubg-cheats-prijzen', 'pubg-cheats-prijzen'],
	['pubg-cheats-priser', 'pubg-cheats-priser'],
	['pubg-cheats-pricing', 'pubg-cheats-pricing'],
	['pubg-cheats-ceny', 'pubg-cheats-ceny'],
	['pubg-cheats-installation', 'pubg-cheats-installation'],
	['pubg-cheats-installatie', 'pubg-cheats-installatie'],
	['pubg-cheats-instalace', 'pubg-cheats-instalace'],
	['pubg-cheats-setup', 'pubg-cheats-setup'],
	['pubg-cheats-updates', 'pubg-cheats-updates'],
	['pubg-cheats-uppdateringar', 'pubg-cheats-uppdateringar'],
	['pubg-cheats-aktualizace', 'pubg-cheats-aktualizace'],
	['pubg-cheats-faq', 'pubg-cheats-faq'],
	['pubg-cheats-support', 'pubg-cheats-support'],
	['pubg-cheats-podpora', 'pubg-cheats-podpora'],
	['niewykrywalne-cheats-pubg', 'niewykrywalne-cheats-pubg'],
	['najlepsze-cheats-pubg', 'najlepsze-hacks-pubg'],
	['melhores-cheats-pubg', 'melhores-hacks-pubg'],
	['cele-mai-bune-cheats-pubg', 'cele-mai-bune-hacks-pubg'],
	['cheats-pubg-indetectaveis', 'cheats-pubg-indetectaveis'],
	['cheats-pubg-nedetectabile', 'cheats-pubg-nedetectabile'],
	['cheats-pubg-2026', 'hacks-pubg-2026'],
	['hacks-cheats-pubg', 'hacks-pubg'],
	['faq-cheats-pubg', 'faq-hacks-pubg'],
	['functii-cheats-pubg', 'functii-hacks-pubg'],
	['preturi-cheats-pubg', 'preturi-hacks-pubg'],
	['actualizari-cheats-pubg', 'actualizari-hacks-pubg'],
	['instalare-cheats-pubg', 'instalare-hacks-pubg'],
	['suport-cheats-pubg', 'suport-hacks-pubg'],
	['recursos-cheats-pubg', 'recursos-cheats-pubg'],
	['precos-cheats-pubg', 'precos-hacks-pubg'],
	['atualizacoes-cheats-pubg', 'atualizacoes-hacks-pubg'],
	['instalacao-cheats-pubg', 'instalacao-hacks-pubg'],
	['suporte-cheats-pubg', 'suporte-hacks-pubg'],
	['download-cheats-pubg', 'download-hacks-pubg'],
	['menu-mod-cheats-pubg', 'menu-mod-hacks-pubg'],
	['meniu-mod-cheats-pubg', 'meniu-mod-hacks-pubg'],
	['soft-aim-cheats-pubg', 'soft-aim-hacks-pubg'],
	['aimbot-hack-cheats-pubg', 'aimbot-hack-hacks-pubg'],
	['esp-hack-cheats-pubg', 'esp-hack-hacks-pubg'],
	['unlock-all-cheats-pubg', 'unlock-all-hacks-pubg'],
	['wallhack-cheats-pubg', 'wallhack-hacks-pubg'],
	['radar-hack-cheats-pubg', 'radar-hack-hacks-pubg'],
	['descarcare-cheats-pubg', 'descarcare-hacks-pubg'],
	['cheats-pubg-esp', 'hacks-pubg-esp'],
	['cheats-pubg-aimbot', 'hacks-pubg-aimbot'],
	['vac-bypass-cheats', 'vac-bypass-hacks'],
	['/pubg-cheats/', '/pubg-cheats/'],
	['/pubg-cheats', '/pubg-cheats'],
	["'pubg-cheats'", "'pubg-cheats'"],
	['"pubg-cheats"', '"pubg-cheats"'],
];

const IMAGE_ASSET_PREFIX = '/images/pubg-cheats';

function applySlugReplacements(text) {
	let out = text;
	for (const [from, to] of SLUG_REPLACEMENTS) {
		if (!out.includes(from)) continue;
		out = out
			.split('\n')
			.map((line) => {
				// Never rewrite static image asset filenames.
				if (line.includes('/images/pubg-cheats')) {
					return line;
				}
				return line.split(from).join(to);
			})
			.join('\n');
	}
	return out;
}

function parseEnglishPaths(src) {
	const block = src.match(/export const englishPaths[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
	if (!block) throw new Error('englishPaths block not found');
	/** @type {Record<string, string>} */
	const paths = {};
	for (const row of block[1].matchAll(/\t(?:'([^']+)'|(\w+)):\s*'([^']*)',/g)) {
		paths[row[1] ?? row[2]] = row[3];
	}
	return paths;
}

function parseLocalizedSlugs(src) {
	const localized = src.slice(src.indexOf('export const localizedSlugs'));
	/** @type {Record<string, Record<string, string>>} */
	const slugs = {};
	for (const block of localized.matchAll(/\t(?:'([^']+)'|(\w+)):\s*\{([\s\S]*?)\n\t\},/g)) {
		const pageId = block[1] ?? block[2];
		slugs[pageId] = {};
		for (const row of block[3].matchAll(/\t(\w+):\s*'([^']*)',/g)) {
			slugs[pageId][row[1]] = row[2];
		}
	}
	return slugs;
}

function localePath(locale, slug) {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

function addRedirectPair(map, fromPath, toPath) {
	if (!fromPath || !toPath || fromPath === toPath) return;
	map[fromPath] = toPath;
	const noSlash = fromPath.replace(/\/$/, '');
	if (noSlash !== fromPath && noSlash !== toPath) map[noSlash] = toPath;
}

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
	if (rel.startsWith('public/images/')) return false;
	if (/\.(png|jpg|jpeg|webp|gif|ico|woff2?|mp4)$/i.test(file)) return false;
	return true;
}

const DIR_RENAMES = [
	['src/pages/pubg-cheats', 'src/pages/pubg-cheats'],
	['src/pages/best-pubg-cheats', 'src/pages/best-pubg-cheats'],
	['src/pages/reliable-pubg-cheats', 'src/pages/reliable-pubg-cheats'],
	['src/pages/pubg-cheats-2026', 'src/pages/pubg-cheats-2026'],
];

// --- Parse routing before migration ---
const routingBefore = await readFile(ROUTING, 'utf8');
const englishBefore = parseEnglishPaths(routingBefore);
const slugsBefore = parseLocalizedSlugs(routingBefore);

// --- Apply text replacements across repo ---
let changed = 0;
const files = await walk(ROOT);
for (const file of files) {
	if (!shouldProcess(file)) continue;
	const original = await readFile(file, 'utf8');
	const updated = applySlugReplacements(original);
	if (updated !== original) {
		await writeFile(file, updated, 'utf8');
		changed++;
	}
}

// Fix duplicate check in routing.ts
let routing = await readFile(ROUTING, 'utf8');
routing = routing.replace(
	"if (withSlash === '/pubg-cheats/' || withSlash === '/pubg-cheats/')",
	"if (withSlash === '/pubg-cheats/' || withSlash === '/pubg-cheats/')",
);
await writeFile(ROUTING, routing, 'utf8');

// --- Rename page directories ---
for (const [fromRel, toRel] of DIR_RENAMES) {
	const from = path.join(ROOT, fromRel);
	const to = path.join(ROOT, toRel);
	try {
		await access(from);
		await rename(from, to);
		console.log(`renamed ${fromRel} → ${toRel}`);
	} catch {
		// already migrated
	}
}

// --- Build redirects from slug diff ---
const routingAfter = await readFile(ROUTING, 'utf8');
const englishAfter = parseEnglishPaths(routingAfter);
const slugsAfter = parseLocalizedSlugs(routingAfter);

const existingRedirects = JSON.parse(await readFile(PATH_REDIRECTS, 'utf8'));
const newRedirects = { ...existingRedirects };

for (const [pageId, oldPath] of Object.entries(englishBefore)) {
	const newPath = englishAfter[pageId];
	if (oldPath && newPath && oldPath !== newPath) {
		addRedirectPair(newRedirects, oldPath.replace(/\/$/, ''), newPath);
		addRedirectPair(newRedirects, oldPath, newPath);
	}
}

for (const [pageId, localeMap] of Object.entries(slugsBefore)) {
	const afterMap = slugsAfter[pageId] ?? {};
	for (const [locale, oldSlug] of Object.entries(localeMap)) {
		const newSlug = afterMap[locale];
		if (oldSlug === newSlug) continue;
		const from = localePath(locale, oldSlug);
		const to = localePath(locale, newSlug);
		addRedirectPair(newRedirects, from, to);
	}
}

await writeFile(PATH_REDIRECTS, `${JSON.stringify(newRedirects, null, 2)}\n`);

console.log(`\nmigrate-cheats-urls-to-hacks: ${changed} file(s) updated`);
console.log(
	`Added/updated ${Object.keys(newRedirects).length - Object.keys(existingRedirects).length} redirect entries in path-redirects.json`,
);
