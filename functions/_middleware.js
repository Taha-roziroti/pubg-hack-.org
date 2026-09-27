import CANNIBAL_REDIRECTS from './cannibal-redirects.json';

const CANONICAL_ORIGIN = 'https://pubg-hack.org';
const CANONICAL_HOST = 'pubg-hack.org';
const WWW_HOST = 'www.pubg-hack.org';

/** Legacy domains → canonical apex (301). Must NOT include CANONICAL_HOST. */
const LEGACY_HOSTS = new Set([
	'pubgcheat.com',
	'www.pubgcheat.com',
	'pubghacks.org',
	'www.pubghacks.org',
	'pubgcheats.org',
	'www.pubgcheats.org',
	'rustcheats.co',
	'www.rustcheats.co',
	'bestrustcheats.com',
	'www.bestrustcheats.com',
	'rustcheat.co',
	'www.rustcheat.co',
	'theislehacks.org',
	'www.theislehacks.org',
	'bestislecheats.com',
	'www.bestislecheats.com',
	'theislehack.org',
	'www.theislehack.org',
	'thefinalscheats.org',
	'www.thefinalscheats.org',
	'fortnitehack.net',
	'www.fortnitehack.net',
	'fortnitecheats.xyz',
	'www.fortnitecheats.xyz',
	'fortnitecheats.net',
	'www.fortnitecheats.net',
	'fortnitecheats.com',
	'www.fortnitecheats.com',
	'pubghacks.net',
	'www.pubghacks.net',
	'pubgscheats.net',
	'www.pubgscheats.net',
	'pubgscheats.com',
	'www.pubgscheats.com',
	'pubgscheats.xyz',
	'www.pubgscheats.xyz',
]);

// Keep in sync with public/_redirects (which preserves query strings by default, as we do below).
const PATH_REDIRECTS = {
	'/sitemap-0.xml': '/sitemap.xml',
	'/sitemap-index.xml': '/sitemap.xml',
	'/sitemap.xml/': '/sitemap.xml',
	'/sitemap-en.xml/': '/sitemap-en.xml',
	'/sitemap-i18n.xml/': '/sitemap-i18n.xml',
	'/sitemap-images.xml/': '/sitemap-images.xml',
	// Exact-match keyword → homepage (primary money URL) — do NOT redirect live pillar pages
	// (/pubg-cheats/, /best-pubg-cheats/, etc. are indexed in sitemaps).
	// Cannibalization → stronger pillars
	'/mod': '/',
	'/': '/',
	'/unlock': '/',
	'/': '/',
	'/soft-aim': '/aimbot/',
	'/aimbot/': '/pubg-aimbot/',
	'/wallhack': '/esp/',
	'/esp/': '/pubg-esp/',
	'/download': '/setup/',
	'/setup/': '/setup/',
	// Legacy pubg-cheats slugs → trailing slash (keep in sync with path-redirects.json)
	'/cheats': '/cheats/',
	'/reliable': '/reliable/',
	'/2026': '/2026/',
	'/best': '/best/',
	'/esp-hack': '/pubg-esp/',
	'/esp/': '/pubg-esp/',
	'/aimbot-hack': '/pubg-aimbot/',
	'/aimbot/': '/pubg-aimbot/',
	'/cheats': '/pubg-cheats/',
	'/cheats/': '/pubg-cheats/',
	'/esp': '/pubg-esp/',
	'/pubg-esp/': '/pubg-esp/',
	'/aimbot': '/pubg-aimbot/',
	'/pubg-aimbot/': '/pubg-aimbot/',
	'/vac': '/vac/',
	'/vac-bypass/': '/vac-bypass/',
	'/fortnite-aimbot': '/pubg-aimbot/',
	'/fortnite-aimbot/': '/pubg-aimbot/',
	'/fortnite-esp': '/pubg-esp/',
	'/fortnite-esp/': '/pubg-esp/',
	'/fortnite-hacks': '/',
	'/fortnite-hacks/': '/',
	'/vac-bypass-fortnite': '/updates/',
	'/vac-bypass-fortnite/': '/updates/',
	'/forums/patch-notes-buffs-nerfs-spikes': '/forums/rust-patch-notes-guide/',
	'/forums/patch-notes-buffs-nerfs-spikes/': '/forums/rust-patch-notes-guide/',
	'/forums/chapter-7-season-3-skin-leaks-vbucks': '/forums/rust-skin-leaks-guide/',
	'/forums/chapter-7-season-3-skin-leaks-vbucks/': '/forums/rust-skin-leaks-guide/',
	'/forums/hammer-ar-s-tier-data-analysis': '/forums/rust-player-tier-list/',
	'/forums/hammer-ar-s-tier-data-analysis/': '/forums/rust-player-tier-list/',
	'/forums/zero-build-meta-broken-aggressive-strategies': '/forums/rust-farming-run-aggressive-strategies/',
	'/forums/zero-build-meta-broken-aggressive-strategies/': '/forums/rust-farming-run-aggressive-strategies/',
	'/forums/fncs-meta-watch-community-event-drops': '/forums/rust-competitive-meta-guide/',
	'/forums/fncs-meta-watch-community-event-drops/': '/forums/rust-competitive-meta-guide/',
	'/forums/secret-weapon drops-routes-full-gold': '/forums/rust-weapon drops-routes-guide/',
	'/forums/secret-weapon drops-routes-full-gold/': '/forums/rust-weapon drops-routes-guide/',
	'/forums/bugha-settings-pro-setup': '/forums/rust-pro-settings-guide/',
	'/forums/bugha-settings-pro-setup/': '/forums/rust-pro-settings-guide/',
	'/forums/creative-warmup-maps-pros-use': '/forums/rust-warmup-maps-ranked/',
	'/forums/creative-warmup-maps-pros-use/': '/forums/rust-warmup-maps-ranked/',
	'/reviews/pubg-esp-zero-build-review-buildsr4k': '/reviews/pubg-esp-growth-run-review-buildsr4k/',
	'/reviews/pubg-esp-zero-build-review-buildsr4k/': '/reviews/pubg-esp-growth-run-review-buildsr4k/',
	'/reviews/pubg-radar-hack-review-vanlifefn': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/pubg-radar-hack-review-vanlifefn/': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/pubg-radar-hack-review-vanlifewz': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/pubg-radar-hack-review-vanlifewz/': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/pubg-radar-hack-review-vanliferust': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/pubg-radar-hack-review-vanliferust/': '/reviews/pubg-radar-hack-review-vanlifenaraka/',
	'/reviews/rust-controller-soft-aim-review-ctrl-player99': '/reviews/pubg-soft-aim-review-ctrl-player99/',
	'/reviews/rust-controller-soft-aim-review-ctrl-player99/': '/reviews/pubg-soft-aim-review-ctrl-player99/',
};

const SECURITY_HEADERS = {
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Frame-Options': 'DENY',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Resource-Policy': 'same-origin',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Origin-Agent-Cluster': '?1',
	'Permissions-Policy':
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
	'Content-Security-Policy': [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self' https://checkout",
		"img-src 'self' data: blob: https:",
		"media-src 'self' blob: https:",
		"font-src 'self' data:",
		"style-src 'self' 'unsafe-inline'",
		// Astro island bootstrap injects inline scripts — required for React hydration.
		"script-src 'self' 'unsafe-inline'",
		"connect-src 'self'",
		"upgrade-insecure-requests",
		"trusted-types default",
		"require-trusted-types-for 'script'",
	].join('; '),
};

function getClientProtocol(request) {
	const visitor = request.headers.get('cf-visitor');
	if (visitor) {
		try {
			const scheme = JSON.parse(visitor).scheme;
			if (scheme) return String(scheme).toLowerCase();
		} catch {
			// ignore malformed cf-visitor
		}
	}

	const forwarded = request.headers.get('x-forwarded-proto');
	if (forwarded) {
		return forwarded.split(',')[0].trim().toLowerCase();
	}

	return new URL(request.url).protocol.replace(':', '').toLowerCase();
}

function applySecurityHeaders(headers, { html = false } = {}) {
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(key, value);
	}

	if (html) {
		const contentType = headers.get('Content-Type') || '';
		if (!/charset=/i.test(contentType)) {
			headers.set('Content-Type', 'text/html; charset=utf-8');
		}
		// Browser always revalidates; Cloudflare edge caches briefly for TTFB.
		headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		headers.set('CDN-Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
		headers.set('Cloudflare-CDN-Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
	}
}

/** /sitemap.xml and /sitemap-*.xml */
const SITEMAP_PATH = /^\/sitemap(?:-[a-z0-9-]+)?\.xml$/;

/** Legacy origins rewritten in sitemap XML (GSC "URL not allowed" when stale dist uses old apex). */
const LEGACY_ORIGIN_REPLACEMENTS = [
	['https://pubgcheat.com', CANONICAL_ORIGIN],
	['http://pubgcheat.com', CANONICAL_ORIGIN],
	['https://www.pubgcheat.com', CANONICAL_ORIGIN],
	['http://www.pubgcheat.com', CANONICAL_ORIGIN],
	['https://www.thefinalscheats.org', CANONICAL_ORIGIN],
	['http://www.thefinalscheats.org', CANONICAL_ORIGIN],
	['https://thefinalscheats.org', CANONICAL_ORIGIN],
	['http://thefinalscheats.org', CANONICAL_ORIGIN],
];

function rewriteLegacyOriginsInSitemapXml(xml) {
	let result = xml;
	for (const [from, to] of LEGACY_ORIGIN_REPLACEMENTS) {
		result = result.split(from).join(to);
	}
	return result;
}

/** Flat .xml sitemaps — redirect any other *.xml/ trailing-slash URL (locale sitemaps). */
function xmlTrailingSlashRedirect(pathname) {
	if (!pathname.endsWith('.xml/')) return null;
	return pathname.slice(0, -1);
}

/** Add trailing slash for directory-style paths (matches Astro trailingSlash: 'always'). */
function trailingSlashRedirect(pathname) {
	if (!pathname || pathname === '/' || pathname.includes('.') || pathname.endsWith('/')) {
		return null;
	}
	return `${pathname}/`;
}

export async function onRequest(context) {
	const url = new URL(context.request.url);
	const host = url.hostname.toLowerCase();
	const proto = getClientProtocol(context.request);

	const isLegacyHost = LEGACY_HOSTS.has(host);
	const needsHostRedirect = host === WWW_HOST || isLegacyHost;
	// Apex TLS is handled at Cloudflare edge — only force https for www/legacy hosts.
	const needsHttpsRedirect = needsHostRedirect && proto === 'http';

	if (needsHostRedirect || needsHttpsRedirect) {
		const mappedPath = PATH_REDIRECTS[url.pathname] ?? url.pathname;
		const target = new URL(mappedPath + url.search, CANONICAL_ORIGIN);
		const headers = new Headers({
			Location: target.toString(),
			'Cache-Control': 'no-store',
			'CDN-Cache-Control': 'no-store',
			'Cloudflare-CDN-Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 301, headers });
	}

	const pathRedirect =
		PATH_REDIRECTS[url.pathname] ??
		CANNIBAL_REDIRECTS[url.pathname] ??
		xmlTrailingSlashRedirect(url.pathname) ??
		trailingSlashRedirect(url.pathname);
	if (pathRedirect && pathRedirect !== url.pathname) {
		const headers = new Headers({
			Location: new URL(pathRedirect + url.search, CANONICAL_ORIGIN).toString(),
			'Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 301, headers });
	}

	const response = await context.next();
	const headers = new Headers(response.headers);
	const contentType = headers.get('Content-Type') || '';
	const isHtml = contentType.includes('text/html');
	const isSitemap =
		SITEMAP_PATH.test(url.pathname) &&
		response.ok &&
		(contentType.includes('xml') || url.pathname.endsWith('.xml'));
	const isImmutableAsset = /\.(?:webp|png|jpe?g|gif|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname);

	if (isImmutableAsset) {
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
		headers.set('CDN-Cache-Control', 'public, s-maxage=31536000, immutable');
		headers.set('Cloudflare-CDN-Cache-Control', 'public, s-maxage=31536000, immutable');
	}

	if (isSitemap) {
		headers.set('Content-Type', 'application/xml; charset=utf-8');
		headers.set('Cache-Control', 'public, max-age=3600');
		applySecurityHeaders(headers, { html: false });
		const xml = rewriteLegacyOriginsInSitemapXml(await response.text());
		return new Response(xml, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	}

	applySecurityHeaders(headers, { html: isHtml });

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
