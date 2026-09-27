#!/usr/bin/env node
/** Merge SEO pillar redirects into functions/path-redirects.json */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PATH_REDIRECTS = path.join(ROOT, 'functions/path-redirects.json');

/** Direct EN cannibal → pillar (skip intermediate stub pages). */
const EN_PILLAR_REDIRECTS = {
	'/wallhack/': '/esp/',
	'/wallhack': '/esp/',
	'/mod/': '/',
	'/mod': '/',
	'/soft-aim/': '/aimbot/',
	'/soft-aim': '/aimbot/',
	'/download/': '/setup/',
	'/download': '/setup/',
	'/reliable/': '/updates/',
	'/reliable': '/updates/',
	'/esp-hack/': '/esp/',
	'/esp-hack': '/esp/',
	'/aimbot-hack/': '/aimbot/',
	'/aimbot-hack': '/aimbot/',
	'/unlock/': '/',
	'/unlock': '/',
	'/premium-pubg-cheats/': '/cheats/',
	'/premium-pubg-cheats': '/cheats/',
	'/pubg-mod-menu/': '/',
	'/pubg-mod-menu': '/',
	'/pubg-soft-aim/': '/aimbot/',
	'/pubg-soft-aim': '/aimbot/',
	'/pubg-wallhack/': '/esp/',
	'/pubg-wallhack': '/esp/',
	'/pubg-cheat-download/': '/setup/',
	'/pubg-cheat-download': '/setup/',
	'/pubg-esp-hack/': '/esp/',
	'/pubg-esp-hack': '/esp/',
	'/pubg-aimbot-hack/': '/aimbot/',
	'/pubg-aimbot-hack': '/aimbot/',
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
