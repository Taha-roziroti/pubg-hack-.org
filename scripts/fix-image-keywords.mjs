#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const SIMPLE =
	"images: { hero: 'PUBG hacks', espWallhack: 'PUBG hacks wallhack', aimbotCombat: 'PUBG hacks aimbot', squadFight: 'PUBG hacks', playerEsp: 'PUBG hacks esp', headerArt: 'PUBG hacks aimbot', hacksPackage: 'PUBG hacks radar', matchFight: 'PUBG hacks aimbot', battleRoyale: 'PUBG hacks', matchMap: 'PUBG hacks esp' }";

const re =
	/images: \{ hero: '[^']+', espWallhack: '[^']+', aimbotCombat: '[^']+', squadFight: '[^']+', playerEsp: '[^']+', headerArt: '[^']+', hacksPackage: '[^']+', matchFight: '[^']+', battleRoyale: '[^']+', matchMap: '[^']+' \}/g;

for (const f of ['scripts/i18n-data/ui-strings-part1.mjs', 'scripts/i18n-data/ui-strings-part2.mjs']) {
	const c = readFileSync(f, 'utf8');
	const n = c.replace(re, SIMPLE);
	writeFileSync(f, n);
	console.log(f, (c.match(re) || []).length, 'image blocks simplified');
}

const altMap = [
	["imageAlt: 'PUBG ESP player tags hack'", "imageAlt: 'PUBG hacks esp'"],
	["imageAlt: 'PUBG ESP radar hack'", "imageAlt: 'PUBG hacks radar'"],
	["imageAlt: 'PUBG Aimbot sniper kill'", "imageAlt: 'PUBG hacks aimbot'"],
	["imageAlt: 'PUBG Aimbot skeleton targeting'", "imageAlt: 'PUBG hacks aimbot'"],
	["imageAlt: 'PUBG hacks ADS combat'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks setup PC activation'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks updates BattlEye maintenance'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks FAQ ESP aimbot'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks support license help'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'Reliable PUBG hacks ESP wallhack'", "imageAlt: 'reliable PUBG hacks'"],
	["imageAlt: 'thefinals wallhack skeleton ESP'", "imageAlt: 'PUBG hacks wallhack'"],
	["imageAlt: 'BattlEye maintenance rust ESP aimbot'", "imageAlt: 'PUBG hacks eac'"],
	["imageAlt: 'PUBG hacks 2026 ESP aimbot'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks combat aimbot'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hack download ESP aimbot'", "imageAlt: 'PUBG hacks download'"],
	["imageAlt: 'PUBG mod menu ESP aimbot'", "imageAlt: 'PUBG hacks mod menu'"],
	["imageAlt: 'PUBG soft aim aimbot settings'", "imageAlt: 'PUBG hacks soft aim'"],
	["imageAlt: 'Best PUBG hacks 2026 ESP'", "imageAlt: 'best PUBG hacks'"],
	["imageAlt: 'PUBG Aimbot hack combat'", "imageAlt: 'PUBG hacks aimbot'"],
	["imageAlt: 'PUBG ESP hack wallhack'", "imageAlt: 'PUBG hacks esp'"],
	["imageAlt: 'PUBG unlock all items ESP aimbot guide'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks privacy policy'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks refund policy'", "imageAlt: 'PUBG hacks'"],
	["imageAlt: 'PUBG hacks terms of use'", "imageAlt: 'PUBG hacks'"],
];

let pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
for (const [from, to] of altMap) pages = pages.split(from).join(to);
writeFileSync('scripts/i18n-data/pages-en.mjs', pages);
console.log('pages-en imageAlts simplified');

// productPage() imageAlt template in pages-i18n
let i18n = readFileSync('scripts/i18n-data/pages-i18n.mjs', 'utf8');
i18n = i18n
	.split("imageAlt: `PUBG ${meta.altKeyword}`")
	.join("imageAlt: 'PUBG hacks'")
	.split("galleryTitle: `PUBG Hack ${topicName}`")
	.join("galleryTitle: 'PUBG hacks'")
	.split("imageAlt: `PUBG hacks ${kind} policy`")
	.join("imageAlt: 'PUBG hacks'")
	.split("galleryTitle: `PUBG Hack ${kind} resources`")
	.join("galleryTitle: 'PUBG hacks'");
writeFileSync('scripts/i18n-data/pages-i18n.mjs', i18n);
console.log('pages-i18n image alts simplified');
