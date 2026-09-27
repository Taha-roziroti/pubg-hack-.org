#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "Activision'"],
	['Activision\u2019', "Activision'"],
	['Activision services', 'Activision services'],
	['Activision service', 'Activision service'],
	['Activision platform', 'Activision platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'Activision bans'],
	['Activision security', 'BattlEye security'],
	['Activision Status', 'PUBG on PC'],
	['Activision PUBG's, 'PUBG's],
	['Activision Support', 'PUBG on PC'],
	['Activision', 'Activision'],
	['EAC guide', 'BattlEye guide'],
	['reliable EAC notes', 'reliable BattlEye notes'],
	['status.epicgames.com', 'store.steampowered.com/app/376210/The_Isle'],
	['www.epicgames.com/rust', 'store.steampowered.com/app/376210/The_Isle'],
	['www.rust.com/official server', 'store.steampowered.com/app/376210/The_Isle'],
	['https://www.rust.com/', 'https://www.callofduty.com/pubg'],
	['PUBG.com', 'PUBG's],
	['PUBG Competitive', 'PUBG's],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
