#!/usr/bin/env node
/** Merge SEO pillar redirects into functions/path-redirects.json */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

/** Direct EN cannibal → pillar (skip intermediate stub pages). */
const EN_PILLAR_REDIRECTS = {
	'/wallhack/': '/pubg-esp/',
	'/wallhack': '/pubg-esp/',
	'/mod/': '/',
	'/mod': '/',
	'/soft-aim/': '/pubg-aimbot/',
	'/soft-aim': '/pubg-aimbot/',
	'/download/': '/setup/',
	'/download': '/setup/',
	'/reliable/': '/updates/',
	'/reliable': '/updates/',
	'/esp-hack/': '/pubg-esp/',
	'/esp-hack': '/pubg-esp/',
	'/aimbot-hack/': '/pubg-aimbot/',
	'/aimbot-hack': '/pubg-aimbot/',
	'/unlock/': '/',
	'/unlock': '/',
	'/premium-pubg-cheats/': '/pubg-cheats/',
	'/premium-pubg-cheats': '/pubg-cheats/',
	'/pubg-mod-menu/': '/',
	'/pubg-mod-menu': '/',
	'/pubg-soft-aim/': '/pubg-aimbot/',
	'/pubg-soft-aim': '/pubg-aimbot/',
	'/pubg-wallhack/': '/pubg-esp/',
	'/pubg-wallhack': '/pubg-esp/',
	'/pubg-cheat-download/': '/setup/',
	'/pubg-cheat-download': '/setup/',
	'/pubg-esp-hack/': '/pubg-esp/',
	'/pubg-esp-hack': '/pubg-esp/',
	'/pubg-aimbot-hack/': '/pubg-aimbot/',
	'/pubg-aimbot-hack': '/pubg-aimbot/',
	'/pubg-unlock-all/': '/',
	'/pubg-unlock-all': '/',
};

const map = JSON.parse(readFileSync(PATH_REDIRECTS, 'utf8'));
let added = 0;
for (const [from, to] of Object.entries(EN_PILLAR_REDIRECTS)) {
	if (map[from] !== to) {
		map[from] = to;
		added++;
	}
}
writeFileSync(PATH_REDIRECTS, `${JSON.stringify(map, null, 2)}\n`);
console.log(`Updated ${added} SEO pillar redirects in path-redirects.json`);
