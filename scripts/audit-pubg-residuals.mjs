#!/usr/bin/env node
/**
 * Fail build if obvious non-PUBG template strings leak into shipped src/public.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SCAN_DIRS = [
	path.join(ROOT, 'src'),
	path.join(ROOT, 'public/locales'),
	path.join(ROOT, 'public', 'pubg-cheats-logo-nav.svg'),
	path.join(ROOT, 'public', 'images', 'pubg-cheats-logo-nav.svg'),
];

const SKIP_PATH_PARTS = [
	'/node_modules/',
	'/dist/',
	'guide-urls.raw.txt',
	'audit-pubg-residuals.mjs',
];

const FORBIDDEN = [
	/\bDOTA\s*2\b/i,
	/\bDota-2\b/i,
	/\bdota-2-/i,
	/\bRubick\b/i,
	/\bMeepo\b/i,
	/\bInvoker\b/i,
	/\bofflane\b/i,
	/\bfog of war\b/i,
	/\bward vision\b/i,
	/\blane creep/i,
];

function walk(dir, files = []) {
	if (!statSync(dir).isDirectory()) return [dir];
	for (const name of readdirSync(dir)) {
		const abs = path.join(dir, name);
		if (SKIP_PATH_PARTS.some((p) => abs.includes(p))) continue;
		const st = statSync(abs);
		if (st.isDirectory()) walk(abs, files);
		else if (/\.(ts|tsx|astro|json|svg|md|mdc)$/i.test(name)) files.push(abs);
	}
	return files;
}

const hits = [];
for (const entry of SCAN_DIRS) {
	for (const file of walk(entry)) {
		const text = readFileSync(file, 'utf8');
		for (const re of FORBIDDEN) {
			if (re.test(text)) {
				hits.push({ file: path.relative(ROOT, file), pattern: re.toString() });
				break;
			}
		}
	}
}

if (hits.length) {
	console.error('PUBG residual audit failed:');
	for (const h of hits.slice(0, 30)) console.error(`  ${h.file} (${h.pattern})`);
	if (hits.length > 30) console.error(`  …and ${hits.length - 30} more`);
	process.exit(1);
}

console.log('✓ PUBG residual audit passed');
