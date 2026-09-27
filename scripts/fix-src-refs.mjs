#!/usr/bin/env node
/** Final pass: fix remaining PUBG references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['pubgImages', 'pubgImages'],
	["from '../data/pubg'", "from '../data/pubg'"],
	["from './pubg'", "from './pubg'"],
	['/reliable-pubg-cheats/', '/reliable-pubg-cheats/'],
	['/pubg-wallhack/', '/pubg-wallhack/'],
	['/pubg-radar-hack/', '/pubg-radar-hack/'],
	['/vac-bypass/', '/vac-bypass/'],
	['/pubg-cheats-2026/', '/pubg-cheats-2026/'],
	['/pubg-aimbot/', '/pubg-aimbot/'],
	['/pubg-esp/', '/pubg-esp/'],
	['/pubg-cheats/', '/pubg-esp/'],
	['PUBG Hack', 'PUBG Hack'],
	['PUBG hacks', 'PUBG hacks'],
	['thefinals wallhack', 'PUBG wallhack'],
	['pubg radar', 'PUBG radar'],
	['PUBG Aimbot', 'PUBG Aimbot'],
	['PUBG ESP', 'PUBG ESP'],
	['PUBG's, 'PUBG's],
	['VAC', 'VAC'],
	['vac', 'vac'],
	['pubg-hack.org', 'pubg-hack.org'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'raidFight'],
	['alMazrah', 'raidMap'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
