#!/usr/bin/env node
/**
 * Bulk SEO + identity cleanup for i18n source files.
 * Run before `npm run generate:i18n`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATH_REPLACEMENTS = [
	['/forums/premium-pubg-cheats-VAC/', '/forums/reliable-pubg-cheats-eac/'],
	['/pubg-cheats-2026/', '/2026/'],
	['/vac-bypass/', '/vac/'],
	['/premium-pubg-cheats/', '/pubg-cheats/'],
	['/reliable-pubg-cheats/', '/updates/'],
	// Prefer keyword canonical URLs (see .cursor/rules/seo-locked.mdc)
	['/cheats/', '/pubg-cheats/'],
	['/esp/', '/pubg-esp/'],
	['/aimbot/', '/pubg-aimbot/'],
	['/pricing/', '/pubg-cheat-price/'],
	['/reviews/', '/pubg-cheat-reviews/'],
];

const TERM_REPLACEMENTS = [
	[/Skillshot assist assist/gi, 'Skillshot assist'],
	[/battle royale matches matches/gi, 'battle royale matches'],
	[/battle royale matches rounds/gi, 'battle royale matches'],
	[/operator abilitys/gi, 'player abilities'],
	[/operator ability markers/gi, 'player ability markers'],
	[/operator ability/gi, 'player ability'],
	[/operator markers/gi, 'player markers'],
	[/operator ESP/gi, 'player ESP'],
	[/operator main/gi, 'carry main'],
	[/operator fights/gi, 'team fights'],
	[/operator holds/gi, 'lane holds'],
	[/enemy operators/gi, 'enemy players'],
	[/operator item builds/gi, 'player item builds'],
	[/loadout drops/gi, 'item drops'],
	[/loadout and streak/gi, 'item and ultimate'],
	[/buy stations/gi, 'shops'],
	[/buy station/gi, 'shop'],
	[/weapon drops/gi, 'wards and runes'],
	[/enemy squads/gi, 'enemy teams'],
	[/hot zones/gi, 'objectives'],
	[/helicopter drop/gi, 'extraction zone fight'],
	[/tactical operator/gi, 'PUBG hero'],
	[/heli markers/gi, 'extraction zone markers'],
	[/Gadget ESP/gi, 'Utility ESP'],
	[/Agents, Spike, Health, Rank/gi, 'Heroes, wards, health, rank'],
	[/assault rifle\/SMG/gi, 'ranged vs melee players'],
	[/ARs, SMGs/gi, 'carries and supports'],
	[/AR \/ SMG/gi, 'carry / support'],
	[/long-range rifles/gi, 'ranged players'],
	[/Kastov vs SMG/gi, 'ranged vs melee'],
	[/Rebirth Island/gi, 'the map'],
	[/Rebirth/gi, 'ranked'],
	[/Main Street/gi, 'mid lane'],
	[/Train Wreck/gi, 'team fights'],
	[/SBMM/gi, 'high rank'],
	[/soft aim/gi, 'skillshot assist'],
	[/Soft aim/gi, 'Skillshot assist'],
	[/Soft Aim/gi, 'Skillshot assist'],
	[/checkout checkout/gi, 'checkout'],
	[/\bVAC\b/g, 'BattlEye'],
	[/permanent reliable/gi, 'permanent patch status'],
	// Do not globally replace EAC→VAC — it corrupts forum slugs like reliable-pubg-cheats-eac.
	[/indetectable/gi, ''],
	[/undetected/gi, ''],
	[/Reliable /g, 'Patch status '],
	[/reliable /g, 'patch status '],
	[/PUBG Esp/g, 'PUBG ESP'],
	[/player ESP, loot tags/gi, 'player ESP, ward vision'],
	[/loot and loadouts/gi, 'wards and item builds'],
	[/third-party/gi, 'gank'],
	[/third party/gi, 'gank'],
	[/TTK windows/gi, 'fight windows'],
	[/zone pushes/gi, 'lane pushes'],
	[/vertical loadout drop routes/gi, 'jungle ward routes'],
	[/high-traffic POIs/gi, 'key map objectives'],
	[/souljade contests/gi, 'extraction zone contests'],
	[/Spectre fights/gi, 'carry fights'],
	[/killcam/gi, 'replay'],
	[/weapon balance/gi, 'player balance'],
	[/official servers/gi, 'battle royale matchmaking'],
	[/ranked and casual matches sessions/gi, 'ranked and casual matches'],
	[/ranked and casual matches lobbies/gi, 'ranked and casual matches'],
	[/battle royale matches and ranked/gi, 'ranked and casual matches'],
	[/ranked and ranked/gi, 'ranked and casual matches'],
	[/PUBG hacks" and "PUBG hacks"/gi, 'PUBG hacks'],
	[/PUBG hacks 2026" criteria/gi, '2026 buyer guide'],
];

function cleanText(text) {
	let out = text;
	for (const [from, to] of PATH_REPLACEMENTS) {
		out = out.split(from).join(to);
	}
	for (const [re, rep] of TERM_REPLACEMENTS) {
		out = out.replace(re, rep);
	}
	return out.replace(/\s{2,}/g, ' ').replace(/ ,/g, ',').trim();
}

function processFile(relPath) {
	const abs = path.join(ROOT, relPath);
	let content = readFileSync(abs, 'utf8');
	const next = cleanText(content);
	if (next !== content) {
		writeFileSync(abs, next);
		console.log('✓', relPath);
	}
}

const targets = [
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/simple-pages-en.mjs',
	'scripts/i18n-data/simple-page-content.mjs',
	'scripts/i18n-data/simple-page-content-translations-rest.mjs',
	'scripts/i18n-data/pages-i18n.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'scripts/i18n-data/link-labels.mjs',
	'scripts/generate-locale-translations.mjs',
];

for (const f of targets) processFile(f);

// Sync link-labels to canonical short paths for EN
const linkLabelsPath = path.join(ROOT, 'scripts/i18n-data/link-labels.mjs');
let linkLabels = readFileSync(linkLabelsPath, 'utf8');
const canonicalEn = {
	"'/'": "'Full product'",
	"'/pubg-esp/'": "'ESP & wallhack guide'",
	"'/pubg-aimbot/'": "'Aimbot & skillshot assist'",
	"'/radar/'": "'2D radar overlay'",
	"'/pubg-cheats/'": "'PUBG hacks guide'",
	"'/features/'": "'All features'",
	"'/pubg-cheat-price/'": "'Store'",
	"'/setup/'": "'Setup guide'",
	"'/updates/'": "'Live status'",
	"'/faq/'": "'FAQ'",
	"'/support/'": "'Support'",
	"'/refund-policy/'": "'Refund policy'",
	"'/vac/'": "'BattlEye maintenance'",
	"'/forums/'": "'PUBG hacks forums'",
	"'/2026/'": "'PUBG hacks 2026'",
	"'/compare/'": "'Compare'",
	"'/pubg-cheat-reviews/'": "'Buyer reviews'",
	"'/best-pubg-cheats/'": "'Best PUBG cheats'",
};
for (const [href, label] of Object.entries(canonicalEn)) {
	const re = new RegExp(`${href.replace(/\//g, '\\/')}: '[^']*'`, 'g');
	linkLabels = linkLabels.replace(re, `${href}: ${label}`);
}
writeFileSync(linkLabelsPath, linkLabels);
console.log('✓ link-labels canonical paths');
