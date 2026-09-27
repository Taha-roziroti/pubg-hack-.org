#!/usr/bin/env node
/** Headless test: verify key components exist for all locales using correct localized paths. */
import { LOCALES } from './i18n-data/constants.mjs';

// Dynamic import of routing - use built dist preview
const BASE = process.env.BASE_URL || 'http://localhost:4321';

// Localized path slugs from routing.ts (pageId -> locale -> slug segment)
const SLUGS = {
	features: { en: 'features', es: 'funciones', fr: 'fonctions', de: 'features', pt: 'recursos', it: 'funzioni', nl: 'functies', pl: 'funkcje', ru: 'funkcii', tr: 'ozellikler', ar: 'pubg-cheats-features', ja: 'pubg-cheats-features', ko: 'pubg-cheats-features', zh: 'pubg-cheats-features', hi: 'pubg-cheats-features', id: 'pubg-cheats-features', th: 'pubg-cheats-features', vi: 'pubg-cheats-features', uk: 'funktsiyi', cs: 'funkce', ro: 'functii', sv: 'funktioner' },
	pricing: { en: 'pricing', es: 'precios', fr: 'tarifs', de: 'preise', pt: 'precos', it: 'prezzi', nl: 'prijzen', pl: 'cennik', ru: 'tseny', tr: 'fiyatlar', ar: 'pubg-cheats-pricing', ja: 'pubg-cheats-pricing', ko: 'pubg-cheats-pricing', zh: 'pubg-cheats-pricing', hi: 'pubg-cheats-pricing', id: 'pubg-cheats-pricing', th: 'pubg-cheats-pricing', vi: 'pubg-cheats-pricing', uk: 'tsiny', cs: 'ceny', ro: 'preturi', sv: 'priser' },
	faq: { en: 'faq', es: 'faq', fr: 'faq', de: 'faq', pt: 'faq', it: 'faq', nl: 'faq', pl: 'faq', ru: 'faq', tr: 'sss', ar: 'faq', ja: 'faq', ko: 'faq', zh: 'faq', hi: 'faq', id: 'faq', th: 'faq', vi: 'faq', uk: 'faq', cs: 'faq', ro: 'faq', sv: 'faq' },
	hacks: { en: 'pubg-cheats', es: 'hacks-trucos-pubg', fr: 'hacks-triche-pubg', de: 'pubg-cheats', pt: 'cheats-pubg', it: 'hacks-trucchi-pubg', nl: 'pubg-cheats', pl: 'hacks-cheatow-pubg', ru: 'pubg-cheats', tr: 'pubg-hile-hacks', ar: 'pubg-cheats', ja: 'pubg-cheats', ko: 'pubg-cheats', zh: 'pubg-cheats', hi: 'pubg-cheats', id: 'pubg-cheats', th: 'pubg-cheats', vi: 'pubg-cheats', uk: 'pubg-cheats', cs: 'pubg-cheats', ro: 'cheats-pubg', sv: 'pubg-cheats' },
};

function pagePath(locale, pageId) {
	const slug = SLUGS[pageId]?.[locale] ?? pageId;
	if (locale === 'en') return `/${slug}/`;
	return `/${locale}/${slug}/`;
}

async function fetchHtml(path) {
	const url = `${BASE}${path}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} → ${res.status}`);
	return res.text();
}

let failed = 0;

for (const locale of LOCALES) {
	// Home
	try {
		const homePath = locale === 'en' ? '/' : `/${locale}/`;
		const html = await fetchHtml(homePath);
		const sections = (html.match(/class="card-panel/g) || []).length;
		if (sections < 1) { console.error(`FAIL ${homePath}: few sections`); failed++; }
		if (!html.includes('price-card') && !html.includes('price-grid')) { console.error(`FAIL ${homePath}: no pricing`); failed++; }
	} catch (e) { console.error(`FAIL ${locale} home: ${e.message}`); failed++; }

	for (const pageId of ['features', 'pricing', 'faq', 'hacks']) {
		const path = pagePath(locale, pageId);
		try {
			const html = await fetchHtml(path);
			const sections = (html.match(/class="card-panel/g) || []).length;
			const enSections = pageId === 'features' ? 5 : pageId === 'hacks' ? 5 : pageId === 'pricing' ? 3 : pageId === 'faq' ? 3 : 2;
			if (sections < enSections) {
				console.error(`FAIL ${path}: ${sections} sections (expected >=${enSections})`);
				failed++;
			}
			if (pageId === 'pricing' && !html.includes('price-card')) {
				console.error(`FAIL ${path}: missing price-card`);
				failed++;
			}
			if (pageId === 'faq' && !html.includes('faq-index')) {
				console.error(`FAIL ${path}: missing faq-index`);
				failed++;
			}
		} catch (e) {
			console.error(`FAIL ${path}: ${e.message}`);
			failed++;
		}
	}
}

if (failed) {
	console.error(`\n${failed} test(s) failed`);
	process.exit(1);
}
console.log(`\nAll ${LOCALES.length} locales passed section/component checks on ${BASE}`);
