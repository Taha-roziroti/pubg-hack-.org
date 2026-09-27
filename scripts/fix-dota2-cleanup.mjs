#!/usr/bin/env node
import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', '.git', 'dist', '.astro']);

const REPLACEMENTS = [
	['an reliable', 'a'],
	['Reliable reliable', 'Reliable'],
	['reliable reliable', 'reliable'],
	['Reliable PUBG hacks', 'PUBG hacks'],
	['reliable PUBG hacks', 'PUBG hacks'],
	['reliable PUBG hacks', 'PUBG hacks'],
	['Reliable ESP', 'ESP'],
	['reliable ESP', 'ESP'],
	['Reliable {antiCheat}', '{antiCheat}'],
	['reliable {antiCheat}', '{antiCheat}'],
	['Reliable Status', 'Patch Status'],
	['reliable status', 'patch status'],
	['0% detection', 'patch-ready builds'],
	['Hacks and cheats available — patch-ready builds.', 'ESP, aimbot, and maphack for battle royale matches on Windows PC.'],
	['https://www.callofduty.com/pubg', 'https://www.pubg.com/'],
	['callofduty.com/pubg', 'pubg.com'],
	['Activision', 'KRAFTON'],
	['Bladepoint', 'PUBG'],
	['Resurgence', 'ranked'],
	['pubg-hack.org/blog', 'pubg-hack.org/forums'],
	['Compare plans and guides at pubg-hack.org', 'Compare plans at pubg-hack.org'],
	['indetectables', ''],
	['indétectables', ''],
	['unentdeckte', ''],
	['/guides/', '/forums/'],
	['Guides hub', 'Forums'],
	['guides hub', 'forums'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const targets = await walk(path.join(ROOT, 'src'));
	targets.push(...(await walk(path.join(ROOT, 'public/locales'))));
	let n = 0;
	for (const file of targets) {
		if (!/\.(ts|tsx|astro|json|mjs|js|css)$/.test(file)) continue;
		let c = await readFile(file, 'utf8');
		const o = c;
		for (const [a, b] of REPLACEMENTS) c = c.split(a).join(b);
		if (c !== o) {
			await writeFile(file, c);
			n++;
		}
	}
	await rm(path.join(ROOT, 'src/data/guides/guides.generated.ts'), { force: true });
	await rm(path.join(ROOT, 'src/data/guides/native-guides.ts'), { force: true });
	console.log(`Cleanup touched ${n} files`);
}

main();
