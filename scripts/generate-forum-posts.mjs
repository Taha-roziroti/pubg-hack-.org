#!/usr/bin/env node
/**
 * Generate PUBG forum threads with human-style comments for posts.generated.ts
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALES, localizeForumPost } from './i18n-data/forum-i18n.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src/data/blog/posts.generated.ts');

const posts = [
	{
		id: 'install-guide',
		imageKey: 'hacksPackage',
		published: '2026-08-12',
		updated: '2026-09-10',
		category: 'Setup',
		featured: true,
		slug: 'how-to-install-pubg-hacks-windows',
		title: 'How to Install PUBG Hack on Windows PC',
		metaDescription:
			'Step-by-step PUBG hacks install for Windows 10 and 11. Download, license key, ESP overlay, and first launch checklist before ranked.',
		h1: 'How to Install PUBG Hack on Windows PC',
		intro:
			'First time setting up a PUBG hack package? This walkthrough covers download, license activation, overlay launch, and the three settings I always change before queuing.',
		keywords: ['PUBG hacks install', 'PUBG hack setup', 'PUBG esp setup'],
		imageAlt: 'PUBG hacks installer screen on Windows PC',
		sections: [
			{
				h2: 'Before you download anything',
				paragraphs: [
					'Close Steam completely, disable any leftover overlay apps, and run the installer as admin. Windows Defender will flag most cheat loaders — add the install folder to exclusions before you extract files.',
					'Grab your license from the email receipt. Keys are single-seat; do not share them in Discord DMs asking for "help."',
				],
			},
			{
				h2: 'Launch order that actually works',
				paragraphs: [
					'Open the loader first, paste the key, wait for the green status light, then start PUBG. Inject after the main menu loads — not during the KRAFTON splash.',
					'Toggle ESP on low opacity for the first match. Cranking every slider day one is how people clip themselves on stream by accident.',
				],
			},
		],
		comments: [
			{ author: 'stack_player', date: '2026-08-14', body: 'took me two tries bc i launched PUBG before the loader. this order fixed it' },
			{ author: 'hotdrop_or_die', date: '2026-08-14', body: 'works on win11 23h2 for me. defender exclusion is mandatory tho' },
			{ author: 'drop_king_5', date: '2026-08-15', body: 'my key said already used, support swapped it in like 20 min. annoying but they fixed it' },
			{ author: 'loot_runner', date: '2026-08-16', body: 'solid guide. wish the loader had a verify button before inject' },
		],
	},
	{
		id: 'esp-settings-ranked',
		imageKey: 'playerEsp',
		published: '2026-08-18',
		updated: '2026-09-12',
		category: 'ESP',
		featured: true,
		slug: 'pubg-esp-settings-ranked-matches',
		title: 'PUBG ESP Settings: What Works Best in Ranked?',
		metaDescription:
			'PUBG ESP settings for ranked — player boxes, loot ESP, vehicle markers, and opacity levels that stay readable without cluttering your screen.',
		h1: 'PUBG ESP Settings: What Works Best in Ranked?',
		intro:
			'Ranked ESP is not about seeing everything — it is about seeing the right things at the right time. Here is how I run player ESP, loot filters, and vehicle markers without turning the screen into a Christmas tree.',
		keywords: ['PUBG esp settings', 'PUBG esp ranked', 'PUBG wallhack settings'],
		imageAlt: 'PUBG ESP settings panel with player overlay toggles',
		sections: [
			{
				h2: 'Player ESP vs screen clutter',
				paragraphs: [
					'Keep enemy player boxes at 70% opacity and hide teammate clutter in squads. Distance tags past 400m are noise in late game.',
					'Loot ESP and vehicle markers saved more wins than raw aim assist. Pulse vehicle icons only inside 150m.',
				],
			},
			{
				h2: 'Profiles per weapon',
				paragraphs: [
					'DMR profile: skillshot assist low, ESP high, minimap radar medium. SMG rush: loot ESP max, player ESP medium, vehicle tag on.',
					'Save weapon profiles per gun. Copying an AR config on a DMR feels awful.',
				],
			},
		],
		comments: [
			{ author: 'squad_lead', date: '2026-08-19', body: 'loot ESP alone worth the sub. finally looting spots i never checked' },
			{ author: 'toxic_archon', date: '2026-08-20', body: 'too much opacity and teammates asked if my monitor was broken lol' },
			{ author: 'smurf_again', date: '2026-08-21', body: 'ranked feels smoother at 60% box opacity. trust' },
		],
	},
	{
		id: 'aimbot-settings-ban',
		imageKey: 'aimbotCombat',
		published: '2026-08-22',
		updated: '2026-09-14',
		category: 'Aimbot',
		featured: true,
		slug: 'skillshot-assist-settings-level-why-wont-i-get-banned',
		title: 'Skillshot Assist Settings: What Level & Why Won\'t I Get Banned?',
		metaDescription:
			'PUBG skillshot assist settings explained — smoothing, FOV, and humanizer sliders. What levels look natural and how BattlEye flags obvious automation.',
		h1: 'Skillshot Assist Settings: What Level & Why Won\'t I Get Banned?',
		intro:
			'Everyone asks the same question in every cheat Discord: "what slider gets me banned?" Short answer: max everything and clip it on TikTok. Long answer: here is what I run on DMRs, ARs, and SMGs without looking like a bot.',
		keywords: ['PUBG aimbot settings', 'PUBG skillshot assist', 'PUBG hack ban'],
		imageAlt: 'PUBG skillshot assist FOV and smoothing sliders',
		sections: [
			{
				h2: 'Smoothing beats raw snap',
				paragraphs: [
					'Humanizer at 65–75% with FOV under 12 degrees looks like a good player on a lucky day. Instant snap hooks across the map are how you get reported nine times in one game.',
					'BattlEye does not read your chat. It reads patterns. Randomize reaction delay between 80–140 ms on skillshot assist.',
				],
			},
			{
				h2: 'Weapon-specific caps',
				paragraphs: [
					'DMR: low assist with manual finish on long shots. SMG: short FOV bursts only — no full lock in ranked.',
					'If you climb two ranks in a week, tone it down. Players notice before KRAFTON does.',
				],
			},
		],
		comments: [
			{ author: 'hook_sniper', date: '2026-08-23', body: 'dropped fov to 10 and reports stopped. still hitting hooks just not circus ones' },
			{ author: 'vac_wave_survivor', date: '2026-08-24', body: 'got hit on a different provider last year. this build survived march patch for me' },
			{ author: 'legit_dealer', date: '2026-08-25', body: 'humanizer at 50 feels sluggish. 70 is the sweet spot for me' },
			{ author: 'mad_support', date: '2026-08-26', body: 'stop using max assist on max FOV snaps. you are not fooling anyone' },
			{ author: 'chart_watcher', date: '2026-08-27', body: 'good thread. saved my smurf from looking like a script kiddie' },
		],
	},
	{
		id: 'features-breakdown',
		imageKey: 'espWallhack',
		published: '2026-08-25',
		updated: '2026-09-08',
		category: 'Features',
		featured: false,
		slug: 'pubg-hacks-features-full-breakdown',
		title: 'PUBG Hack Features — Full Breakdown',
		metaDescription:
			'Every PUBG hacks feature explained — ESP, maphack, skillshot assist, loot filter, camera hack, radar, and combo scripts. What each toggle does in match.',
		h1: 'PUBG Hack Features — Full Breakdown',
		intro:
			'Marketing pages list features in bullet points. This thread explains what each toggle actually does in a real ranked game, and which ones I leave off.',
		keywords: ['PUBG hacks features', 'PUBG hack features', 'PUBG esp aimbot'],
		imageAlt: 'PUBG hacks feature list with ESP and maphack toggles',
		sections: [
			{
				h2: 'Vision tools',
				paragraphs: [
					'Player ESP, loot filters, vehicle markers, and airdrop cues fall under vision. Maphack highlights compound layouts and last-known enemy positions through terrain.',
					'Radar overlay mirrors minimap threats with audio pings — optional but strong for solo players.',
				],
			},
			{
				h2: 'Mechanical assists',
				paragraphs: [
					'Skillshot assist, recoil control, trigger assist, and lean peek helpers helpers are mechanical. Higher risk, higher reward.',
					'Camera distance hack is subtle if you stay within 10% of default. Stretch to moon view and everyone knows.',
				],
			},
		],
		comments: [
			{ author: 'feature_guy', date: '2026-08-26', body: 'combo script for recoil script is heavy but drains fps on older laptops' },
			{ author: 'carry_only', date: '2026-08-27', body: 'loot filter at 85% feels legit. 100% looks robotic in replays' },
			{ author: 'salty_legend', date: '2026-08-28', body: 'half these toggles are gimmicks. esp + wards is 90% of value' },
		],
	},
	{
		id: 'maphack-vs-wards',
		imageKey: 'raidMapMap',
		published: '2026-08-28',
		updated: '2026-09-11',
		category: 'Maphack',
		featured: false,
		slug: 'maphack-vs-loot-esp-difference',
		title: 'Maphack vs Loot ESP — What\'s the Difference?',
		metaDescription:
			'PUBG maphack vs loot ESP explained. Fog removal, player positions, and which setting gives better info for looting and ganks.',
		h1: 'Maphack vs Loot ESP — What\'s the Difference?',
		intro:
			'New buyers toggle both and wonder why the screen looks wrong. Maphack and loot ESP solve different problems — here is when to use each.',
		keywords: ['PUBG maphack', 'PUBG loot esp', 'PUBG wallhack'],
		imageAlt: 'PUBG maphack fog removal compared to loot ESP dots',
		sections: [
			{
				h2: 'Maphack draws geometry',
				paragraphs: [
					'Maphack draws player trails and compound outlines on the minimap overlay and shows enemy players last seen on map. It does not replace true vision — you still cannot see prone players without line-of-sight.',
					'Best for rotations and smoke breaks. Terrible if you stare at map instead of the firefight in front of you.',
				],
			},
			{
				h2: 'Loot ESP is precision',
				paragraphs: [
					'Loot ESP highlights weapons, meds, and attachments through walls. Pair with filter presets for hot-drop looting.',
					'I run loot ESP always, maphack only on supports and initiators.',
				],
			},
		],
		comments: [
			{ author: 'solo queue_king', date: '2026-08-29', body: 'loot ESP > maphack for climbing. learned that the hard way' },
			{ author: 'map_stare', date: '2026-08-30', body: 'maphack got me killed more bc i stopped watching lane. user error tbh' },
		],
	},
	{
		id: 'auto-last-hit',
		imageKey: 'aimbotSkeleton',
		published: '2026-09-01',
		updated: '2026-09-13',
		category: 'Scripts',
		featured: false,
		slug: 'loot-filter-script-natural-settings',
		title: 'Loot Filter Script: Settings That Actually Feel Natural',
		metaDescription:
			'PUBG loot filter script settings for lane — miss rate, attack move delay, and attachment priority. Stay believable while securing CS.',
		h1: 'Loot Filter Script: Settings That Actually Feel Natural',
		intro:
			'Perfect last hit scripts exist. Perfect last hit scripts also get you reported by your own team. Here is how I miss a creep on purpose sometimes.',
		keywords: ['PUBG loot filter', 'PUBG scripts', 'PUBG hack lane'],
		imageAlt: 'PUBG loot filter script timing settings',
		sections: [
			{
				h2: 'Miss rate matters',
				paragraphs: [
					'Set intentional miss rate to 8–12% on ranged carries. Melee can run tighter because attack anims hide timing.',
					'Deny assist should be lower priority than last hits — obvious deny scripts are meme clips.',
				],
			},
		],
		comments: [
			{ author: 'cs_student', date: '2026-09-02', body: '12% miss still averages better than my hands at 3am' },
			{ author: 'recoil_gap', date: '2026-09-03', body: 'attachment priority too obvious in replays. turned off' },
			{ author: 'compound_rush', date: '2026-09-04', body: 'works on win10. broke once after sept patch, update fixed next day' },
			{ author: 'free_cookies', date: '2026-09-05', body: 'not worth on DMR. just practice' },
		],
	},
	{
		id: 'camera-hack',
		imageKey: 'headerArt',
		published: '2026-09-03',
		updated: '2026-09-14',
		category: 'Camera',
		featured: false,
		slug: 'camera-hack-distance-how-far-is-too-far',
		title: 'Camera Hack Distance: How Far Is Too Far?',
		metaDescription:
			'PUBG camera hack distance settings — zoom limits, default comparison, and what enemies notice in ranked replays.',
		h1: 'Camera Hack Distance: How Far Is Too Far?',
		intro:
			'Camera distance is the most subtle cheat until it is not. This thread covers safe zoom ranges and why your solo queue feels different at +15%.',
		keywords: ['PUBG camera hack', 'PUBG zoom hack', 'PUBG hacks camera'],
		imageAlt: 'PUBG camera distance hack slider comparison',
		sections: [
			{
				h2: 'Safe zoom bands',
				paragraphs: [
					'Stay within 5–10% above default for ranked. Tournament players use high camera too — abuse that cover story.',
					'Beyond 15% you see rune spawns early and off-screen ganks. Teammates with replays will clock it.',
				],
			},
		],
		comments: [
			{ author: 'zoomer', date: '2026-09-04', body: '8% is my cap. anything more feels like playing a different game' },
			{ author: 'replay_hunter', date: '2026-09-05', body: 'saw a guy on 20% in legend. whole team flamed him in all chat' },
		],
	},
	{
		id: 'patch-fix',
		imageKey: 'squadFight',
		published: '2026-09-05',
		updated: '2026-09-15',
		category: 'Troubleshooting',
		featured: false,
		slug: 'cheat-stopped-working-after-patch-fix',
		title: 'Why My Cheat Stopped Working (And How I Fixed It)',
		metaDescription:
			'PUBG hack not working after patch — loader errors, BattlEye update, overlay crash fixes. Checklist before opening a support ticket.',
		h1: 'Why My Cheat Stopped Working (And How I Fixed It)',
		intro:
			'Patch day panic thread. If ESP vanished mid-session, work through this list before blaming the license.',
		keywords: ['PUBG hack not working', 'PUBG hack patch', 'PUBG BattlEye update'],
		imageAlt: 'PUBG hack loader error after game patch',
		sections: [
			{
				h2: 'Patch day checklist',
				paragraphs: [
					'Check the status page first. If build is red, wait — injecting into outdated client is how you force a restart loop.',
					'Delete old config JSON after major patches. Sliders from last meta sometimes crash overlay init.',
				],
			},
		],
		comments: [
			{ author: 'panic_queue', date: '2026-09-06', body: 'status page said wait 4 hrs. worked after rebuild. patience' },
			{ author: 'old_config', date: '2026-09-07', body: 'deleting config fixed crash on launch. should be in pin' },
			{ author: 'refund_threat', date: '2026-09-08', body: 'took 6 hours last patch. annoying but came back' },
			{ author: 'linux_guy', date: '2026-09-09', body: 'doesnt work on linux. vm only. wish i knew earlier' },
			{ author: 'fixed_it', date: '2026-09-10', body: 'reinstall loader only, not whole game. saved time' },
		],
	},
	{
		id: 'monthly-vs-lifetime',
		imageKey: 'hacksPackage',
		published: '2026-09-07',
		updated: '2026-09-12',
		category: 'Pricing',
		featured: false,
		slug: 'monthly-vs-lifetime-license-worth-it',
		title: 'Monthly vs Lifetime License — Worth It?',
		metaDescription:
			'PUBG hacks monthly vs lifetime license comparison. Break-even math, patch support, and which plan fits casual vs daily ranked grinders.',
		h1: 'Monthly vs Lifetime License — Worth It?',
		intro:
			'Lifetime looks expensive until you do the math. Monthly looks cheap until you forget to cancel for eight months.',
		keywords: ['PUBG hacks price', 'PUBG hack monthly', 'PUBG hacks lifetime'],
		imageAlt: 'PUBG hacks monthly and lifetime pricing comparison',
		sections: [
			{
				h2: 'Break-even at month five',
				paragraphs: [
					'$35 monthly vs $150 lifetime — lifetime wins if you play two seasons. Casual weekend warriors should stay monthly.',
					'Both tiers get same features. Lifetime is not a separate build.',
				],
			},
		],
		comments: [
			{ author: 'budget_mike', date: '2026-09-08', body: 'monthly for me. play 2 weekends a month' },
			{ author: 'daily_grind', date: '2026-09-09', body: 'lifetime paid off in 4 months. no brainer if you queue daily' },
			{ author: 'skeptic_sam', date: '2026-09-10', body: 'worried provider dies before lifetime pays off. monthly feels safer' },
		],
	},
	{
		id: 'radar-hack',
		imageKey: 'raidCombat',
		published: '2026-09-09',
		updated: '2026-09-14',
		category: 'Radar',
		featured: false,
		slug: 'radar-hack-missing-enemies-minimap',
		title: 'Radar Hack for Missing Enemies on Map',
		metaDescription:
			'PUBG radar hack setup — minimap pings, missing player alerts, and audio cues when enemies leave lane. Config for supports and mids.',
		h1: 'Radar Hack for Missing Enemies on Map',
		intro:
			'Maphack shows fog. Radar tells you someone left lane three seconds ago. Different tools — here is my radar config.',
		keywords: ['PUBG radar hack', 'PUBG esp minimap', 'PUBG hacks radar'],
		imageAlt: 'PUBG radar hack minimap enemy ping overlay',
		sections: [
			{
				h2: 'Audio vs visual pings',
				paragraphs: [
					'Visual-only radar is easy to miss in team fights. I run soft audio ping on flank audio when a squad crosses your sector.',
					'Disable ally false positives — decoy smokes and vehicle noise spam the log otherwise.',
				],
			},
		],
		comments: [
			{ author: 'support_main', date: '2026-09-10', body: 'audio ping saved so many ganks. underrated feature' },
			{ author: 'turned_off', date: '2026-09-11', body: 'too noisy with smoke pops. needs filter' },
			{ author: 'mid_life', date: '2026-09-12', body: 'pair with loot ESP. radar alone not enough high rank' },
		],
	},
	{
		id: 'recoil-profiles',
		imageKey: 'raidFight',
		published: '2026-09-11',
		updated: '2026-09-15',
		category: 'Combo Scripts',
		featured: false,
		slug: 'recoil-control-profiles-setup-guide',
		title: 'Recoil Control Profiles — Setup Guide',
		metaDescription:
			'PUBG recoil control profile setup — recoil pulls, tab cycle, and fail-safes. Settings that work in ranked without locking your screen.',
		h1: 'Recoil Control Profiles — Setup Guide',
		intro:
			'Recoil scripts are easy to over-tune. This is how I bound tap-fire and pull-down chains without locking onto every shot.',
		keywords: ['PUBG recoil profile', 'PUBG recoil script', 'PUBG hacks recoil'],
		imageAlt: 'PUBG recoil control profile keybind configuration',
		sections: [
			{
				h2: 'Keybind layout',
				paragraphs: [
					'One key for tap-fire pull-down, separate key for crouch peek reset. Never bind full spray lock to spacebar — you will panic press it in the lobby.',
					'Human delay between recoil steps at 40–60 ms looks cleaner on replay than instant frame-perfect control.',
				],
			},
		],
		comments: [
			{ author: 'tap_fire_99', date: '2026-09-12', body: 'finally hit Diamond after tuning setup. still over-pull on Beryl sometimes lol' },
			{ author: 'anti_script', date: '2026-09-13', body: 'scripts ruin muscle memory. learn recoil' },
			{ author: 'lag_spike', date: '2026-09-14', body: 'script desynced on 120 ping. fine on 30' },
		],
	},
	{
		id: 'battleye-maintenance',
		imageKey: 'hero',
		published: '2026-09-13',
		updated: '2026-09-16',
		category: 'BattlEye',
		featured: false,
		slug: 'battleye-update-what-to-do-before-ranked',
		title: 'BattlEye update: What to Do Before Queuing Ranked',
		metaDescription:
			'PUBG BattlEye update checklist for cheat users — when to wait, how to verify build status, and safe relaunch steps after KRAFTON patches.',
		h1: 'BattlEye update: What to Do Before Queuing Ranked',
		intro:
			'KRAFTON pushed a client update at 2am and half the forum is in meltdown. Read this before you inject and blame the loader.',
		keywords: ['PUBG BattlEye update', 'PUBG hack BattlEye', 'PUBG hack ban risk'],
		imageAlt: 'PUBG BattlEye update status check before launching cheats',
		sections: [
			{
				h2: 'Wait for green status',
				paragraphs: [
					'Status page green means tested against current client. Yellow means use at own risk. Red means close the loader and touch grass.',
					'Do not run old loader versions "because it worked yesterday." That is how accounts get flagged.',
				],
			},
		],
		comments: [
			{ author: 'patient_zero', date: '2026-09-14', body: 'waited 3 hrs after BattlEye notes. no issues since' },
			{ author: 'impatient', date: '2026-09-15', body: 'injected on yellow. worked but wont risk again' },
			{ author: 'banned_2024', date: '2026-09-15', body: 'learned this after a 6 month ban on another tool. not worth rushing' },
			{ author: 'status_watcher', date: '2026-09-16', body: 'discord ping when green would be nice. had to refresh page all day' },
		],
	},
];

function esc(s) {
	return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function genLocaleBlock(locale, p, enBlock) {
	if (locale === 'en') return enBlock;
	const loc = localizeForumPost(
		{
			slug: p.slug,
			title: p.title,
			metaDescription: p.metaDescription,
			h1: p.h1,
			intro: p.intro,
			keywords: p.keywords,
			imageAlt: p.imageAlt,
			sections: p.sections,
			comments: p.comments,
		},
		locale,
		p.id,
	);
	const sections = loc.sections
		.map(
			(s) => `			{
				h2: "${esc(s.h2)}",
				paragraphs: [
${s.paragraphs.map((para) => `					"${esc(para)}",`).join('\n')}
				],
			}`,
		)
		.join(',\n');
	const comments = (loc.comments ?? [])
		.map((c) => `			{ author: "${esc(c.author)}", date: "${c.date}", body: "${esc(c.body)}" }`)
		.join(',\n');
	return `		${locale}: {
		slug: "${loc.slug}",
		title: "${esc(loc.title)}",
		metaDescription: "${esc(loc.metaDescription)}",
		h1: "${esc(loc.h1)}",
		intro: "${esc(loc.intro)}",
		keywords: [${loc.keywords.map((k) => `"${esc(k)}"`).join(',')}],
		imageAlt: "${esc(loc.imageAlt)}",
		sections: [
${sections}
		],
		comments: [
${comments}
		],
		},`;
}

function genPost(p) {
	const sections = p.sections
		.map(
			(s) => `			{
				h2: "${esc(s.h2)}",
				paragraphs: [
${s.paragraphs.map((para) => `					"${esc(para)}",`).join('\n')}
				],
			}`,
		)
		.join(',\n');

	const comments = p.comments
		.map(
			(c) => `			{ author: "${esc(c.author)}", date: "${c.date}", body: "${esc(c.body)}" }`,
		)
		.join(',\n');

	const enBlock = `		en: {
		slug: "${p.slug}",
		title: "${esc(p.title)}",
		metaDescription: "${esc(p.metaDescription)}",
		h1: "${esc(p.h1)}",
		intro: "${esc(p.intro)}",
		keywords: [${p.keywords.map((k) => `"${esc(k)}"`).join(',')}],
		imageAlt: "${esc(p.imageAlt)}",
		sections: [
${sections}
		],
		comments: [
${comments}
		],
		},`;

	const otherLocales = LOCALES.filter((l) => l !== 'en').map((l) => genLocaleBlock(l, p, enBlock)).join('\n');

	return `	{
		id: "${p.id}",
		imageKey: "${p.imageKey}",
		published: "${p.published}",
		updated: "${p.updated}",
		category: "${esc(p.category)}",
		featured: ${p.featured},
		translations: {
${enBlock}
${otherLocales}
		},
	}`;
}

const output = `/* Auto-generated by scripts/generate-forum-posts.mjs — do not edit by hand. */
import type { BlogPostDefinition } from './types';

export const blogPosts: BlogPostDefinition[] = [
${posts.map(genPost).join(',\n')}
];
`;

await writeFile(OUT, output, 'utf8');
console.log(`Wrote ${posts.length} forum posts to ${OUT}`);
