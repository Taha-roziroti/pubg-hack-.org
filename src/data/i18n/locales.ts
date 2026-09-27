export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** 22 locales for global PUBG Hack blog SEO coverage. */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Worldwide' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Worldwide' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Worldwide' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Worldwide' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Worldwide' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Worldwide' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Worldwide' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Worldwide' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Worldwide' },
];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
		commentsTitle: string;
	}
> = {
	en: {
		blogTitle: 'PUBG Hack Forums | Setup Tips & Feature Talk',
		blogDescription:
			'PUBG hacks forums with setup walkthroughs, ESP settings, skillshot assist sliders, and BattlEye patch notes for PC at pubg-hack.org/forums/.',
		blogH1: 'Community Forums',
		blogIntro:
			'Setup guides, feature breakdowns, and patch-day threads from players running PUBG hacks on PC. Read before you buy — then compare ESP, maphack, and skillshot assist on our product pages.',
		readMore: 'Read thread',
		published: 'Posted',
		updated: 'Updated',
		relatedPosts: 'Related threads',
		allPosts: 'All forum threads',
		home: 'PUBG Hack home',
		language: 'Language',
		commentsTitle: 'Replies',
	},
	es: {
		blogTitle: 'Foros PUBG Hack | Configuración y funciones',
		blogDescription:
			'Blog de PUBG Hack con guías de trucos , ESP wallhack, radar y Aimbot para PUBG en PC Windows.',
		blogH1: 'Foros de la comunidad',
		blogIntro:
			'Guías SEO de trucos PUBG , ESP wallhack, radar hack, Aimbot y mantenimiento VAC en 22 idiomas.',
		readMore: 'Leer hilo',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Hilos relacionados',
		allPosts: 'Todos los hilos',
		home: 'Inicio PUBG Hack',
		language: 'Idioma',
		commentsTitle: 'Respuestas',
	},
	fr: {
		blogTitle: 'Forums PUBG Hack | Configuration et fonctions',
		blogDescription:
			'Foros PUBG Hack : triches , ESP wallhack, radar et Aimbot pour PUBG sur PC Windows.',
		blogH1: 'Forums communautaires',
		blogIntro:
			'Guides SEO triches PUBG , ESP wallhack, radar hack, Aimbot et VAC en 22 langues.',
		readMore: 'Lire le fil',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Fils associés',
		allPosts: 'Tous les fils',
		home: 'Accueil PUBG Hack',
		language: 'Langue',
		commentsTitle: 'Réponses',
	},
	de: {
		blogTitle: 'PUBG Hack Foren | Setup & Funktionen',
		blogDescription:
			'PUBG Hack Forums mit ESP, Wallhack, Radar und Aimbot Guides für PUBG auf Windows PC.',
		blogH1: 'Community-Foren',
		blogIntro:
			'SEO-Guides für PUBG hacks, ESP Wallhack, Radar Hack, Aimbot und VAC in 22 Sprachen.',
		readMore: 'Thread lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Ähnliche Threads',
		allPosts: 'Alle Forum-Threads',
		home: 'PUBG Hack Start',
		language: 'Sprache',
		commentsTitle: 'Antworten',
	},
	pt: {
		blogTitle: 'Fóruns PUBG Hack | Configuração e recursos',
		blogDescription:
			'Foros PUBG Hack com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para PUBG no PC.',
		blogH1: 'Fóruns da comunidade',
		blogIntro:
			'Guias SEO de cheats PUBG indetectáveis, ESP wallhack, radar hack, Aimbot e VAC em 22 idiomas.',
		readMore: 'Ler tópico',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Tópicos relacionados',
		allPosts: 'Todos os tópicos',
		home: 'Início PUBG Hack',
		language: 'Idioma',
		commentsTitle: 'Respostas',
	},
	it: {
		blogTitle: 'Forum PUBG Hack | Setup e funzioni',
		blogDescription:
			'Foros PUBG Hack con guide cheat , ESP wallhack, radar e Aimbot per PUBG su PC Windows.',
		blogH1: 'Forum della community',
		blogIntro:
			'Guide SEO cheat PUBG , ESP wallhack, radar hack, Aimbot e VAC in 22 lingue.',
		readMore: 'Leggi discussione',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Discussioni correlate',
		allPosts: 'Tutte le discussioni',
		home: 'Home PUBG Hack',
		language: 'Lingua',
		commentsTitle: 'Risposte',
	},
	nl: {
		blogTitle: 'PUBG Hack Forums | Setup & functies',
		blogDescription:
			'PUBG Hack blog met ESP, wallhack, radar en Aimbot gidsen voor PUBG op Windows PC.',
		blogH1: 'Communityforums',
		blogIntro:
			'SEO-gidsen voor PUBG hacks, ESP wallhack, radar hack, Aimbot en VAC in 22 talen.',
		readMore: 'Lees thread',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde threads',
		allPosts: 'Alle forumthreads',
		home: 'PUBG Hack home',
		language: 'Taal',
		commentsTitle: 'Reacties',
	},
	pl: {
		blogTitle: 'Fora PUBG Hack | Konfiguracja i funkcje',
		blogDescription:
			'Foros PUBG Hack z poradnikami ESP, wallhack, radar i Aimbot dla PUBG na PC.',
		blogH1: 'Fora społeczności',
		blogIntro:
			'Poradniki SEO reliable cheatów PUBG, ESP wallhack, radar hack, Aimbot i VAC w 22 językach.',
		readMore: 'Czytaj wątek',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane wątki',
		allPosts: 'Wszystkie wątki',
		home: 'Strona główna PUBG Hack',
		language: 'Język',
		commentsTitle: 'Odpowiedzi',
	},
	ru: {
		blogTitle: 'Форумы PUBG Hack | Настройка и функции',
		blogDescription:
			'Блог PUBG Hack: ESP, wallhack, radar и Aimbot для PUBG на Windows PC.',
		blogH1: 'Форумы сообщества',
		blogIntro:
			'SEO-гайды по reliable читам PUBG, ESP wallhack, radar hack, Aimbot и VAC на 22 языках.',
		readMore: 'Читать тему',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие темы',
		allPosts: 'Все темы',
		home: 'Главная PUBG Hack',
		language: 'Язык',
		commentsTitle: 'Ответы',
	},
	tr: {
		blogTitle: 'PUBG Hack Forumları | Kurulum ve özellikler',
		blogDescription:
			'PUBG Hack blog: ESP, wallhack, radar ve Aimbot rehberleri PUBG Windows PC.',
		blogH1: 'Topluluk forumları',
		blogIntro:
			'Reliable PUBG hileleri, ESP wallhack, radar hack, Aimbot ve VAC SEO rehberleri 22 dilde.',
		readMore: 'Konuyu oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili konular',
		allPosts: 'Tüm konular',
		home: 'PUBG Hack ana sayfa',
		language: 'Dil',
		commentsTitle: 'Yanıtlar',
	},
	ar: {
		blogTitle: 'منتديات PUBG Hack',
		blogDescription:
			'مدونة PUBG Hack: غش reliable وESP wallhack ورadar وAimbot لـ PUBG على Windows PC.',
		blogH1: 'منتديات المجتمع',
		blogIntro:
			'أدلة SEO لغش PUBG reliable وESP wallhack ورadar hack وAimbot وVAC بـ 22 لغة.',
		readMore: 'اقرأ الموضوع',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'مواضيع ذات صلة',
		allPosts: 'كل المواضيع',
		home: 'الرئيسية PUBG Hack',
		language: 'اللغة',
		commentsTitle: 'الردود',
	},
	ja: {
		blogTitle: 'PUBG Hack フォーラム',
		blogDescription:
			'PUBG Hackブログ：ESP、wallhack、radar、Aimbotガイド。PUBG Windows PC向け。',
		blogH1: 'コミュニティフォーラム',
		blogIntro:
			'reliable PUBGチート、ESP wallhack、radar hack、Aimbot、VACのSEOガイドを22言語で提供。',
		readMore: 'スレッドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連スレッド',
		allPosts: 'すべてのスレッド',
		home: 'PUBG Hack ホーム',
		language: '言語',
		commentsTitle: '返信',
	},
	ko: {
		blogTitle: 'PUBG Hack 포럼',
		blogDescription:
			'PUBG Hack 블로그: ESP, wallhack, radar, Aimbot 가이드. PUBG Windows PC.',
		blogH1: '커뮤니티 포럼',
		blogIntro:
			'reliable PUBG 치트, ESP wallhack, radar hack, Aimbot, VAC SEO 가이드를 22개 언어로 제공.',
		readMore: '글 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 글',
		allPosts: '모든 글',
		home: 'PUBG Hack 홈',
		language: '언어',
		commentsTitle: '답글',
	},
	zh: {
		blogTitle: 'PUBG Hack 论坛',
		blogDescription:
			'PUBG Hack博客：ESP、wallhack、radar和Aimbot指南，适用于PUBG Windows PC。',
		blogH1: '社区论坛',
		blogIntro:
			'reliable PUBG作弊、ESP wallhack、radar hack、Aimbot和VAC的SEO指南，共22种语言。',
		readMore: '阅读帖子',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关帖子',
		allPosts: '全部帖子',
		home: 'PUBG Hack 首页',
		language: '语言',
		commentsTitle: '回复',
	},
	hi: {
		blogTitle: 'PUBG Hack फ़ोरम',
		blogDescription:
			'PUBG Hack ब्लॉग: ESP, wallhack, radar और Aimbot गाइड PUBG Windows PC के लिए।',
		blogH1: 'कम्युनिटी फ़ोरम',
		blogIntro:
			'PUBG hacks, ESP wallhack, radar hack, Aimbot और VAC SEO गाइड 22 भाषाओं में।',
		readMore: 'थ्रेड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित थ्रेड',
		allPosts: 'सभी थ्रेड',
		home: 'PUBG Hack होम',
		language: 'भाषा',
		commentsTitle: 'जवाब',
	},
	id: {
		blogTitle: 'Forum PUBG Hack',
		blogDescription:
			'Foros PUBG Hack: pandua ESP, wallhack, radar dan Aimbot untuk PUBG di PC Windows.',
		blogH1: 'Forum komunitas',
		blogIntro:
			'Panduan SEO cheat PUBG reliable, ESP wallhack, radar hack, Aimbot dan VAC dalam 22 bahasa.',
		readMore: 'Baca thread',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Thread terkait',
		allPosts: 'Semua thread',
		home: 'Beranda PUBG Hack',
		language: 'Bahasa',
		commentsTitle: 'Balasan',
	},
	th: {
		blogTitle: 'ฟอรั่ม PUBG Hack',
		blogDescription:
			'บล็อก PUBG Hack: คู่มือ ESP, wallhack, radar และ Aimbot สำหรับ PUBG บน PC',
		blogH1: 'ฟอรั่มชุมชน',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat PUBG reliable, ESP wallhack, radar hack, Aimbot และ VAC 22 ภาษา',
		readMore: 'อ่านกระทู้',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'กระทู้ที่เกี่ยวข้อง',
		allPosts: 'กระทู้ทั้งหมด',
		home: 'หน้าแรก PUBG Hack',
		language: 'ภาษา',
		commentsTitle: 'ตอบกลับ',
	},
	vi: {
		blogTitle: 'Diễn đàn PUBG Hack',
		blogDescription:
			'Foros PUBG Hack: hướng dẫn ESP, wallhack, radar và Aimbot cho PUBG trên PC.',
		blogH1: 'Diễn đàn cộng đồng',
		blogIntro:
			'Hướng dẫn SEO cheat PUBG reliable, ESP wallhack, radar hack, Aimbot và VAC bằng 22 ngôn ngữ.',
		readMore: 'Đọc bài',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Bài liên quan',
		allPosts: 'Tất cả bài',
		home: 'Trang chủ PUBG Hack',
		language: 'Ngôn ngữ',
		commentsTitle: 'Phản hồi',
	},
	uk: {
		blogTitle: 'Форуми PUBG Hack',
		blogDescription:
			'Блог PUBG Hack: ESP, wallhack, radar та Aimbot для PUBG на Windows PC.',
		blogH1: 'Форуми спільноти',
		blogIntro:
			'SEO-гайди з reliable читів PUBG, ESP wallhack, radar hack, Aimbot та VAC 22 мовами.',
		readMore: 'Читати тему',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди PUBG",
		allPosts: 'Усі теми',
		home: 'Головна PUBG Hack',
		language: 'Мова',
		commentsTitle: 'Відповіді',
	},
	cs: {
		blogTitle: 'Fóra PUBG Hack',
		blogDescription:
			'Foros PUBG Hack: ESP, wallhack, radar a Aimbot pro PUBG na Windows PC.',
		blogH1: 'Komunitní fóra',
		blogIntro:
			'SEO průvodce reliable PUBG hacky, ESP wallhack, radar hack, Aimbot a VAC ve 22 jazycích.',
		readMore: 'Číst vlákno',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související vlákna',
		allPosts: 'Všechna vlákna',
		home: 'Domů PUBG Hack',
		language: 'Jazyk',
		commentsTitle: 'Odpovědi',
	},
	ro: {
		blogTitle: 'Forumuri PUBG Hack',
		blogDescription:
			'Foros PUBG Hack: ghiduri ESP, wallhack, radar și Aimbot pentru PUBG pe PC.',
		blogH1: 'Forumuri comunitate',
		blogIntro:
			'Ghiduri SEO cheat-uri PUBG reliable, ESP wallhack, radar hack, Aimbot și VAC în 22 de limbi.',
		readMore: 'Citește discuția',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Discuții similare',
		allPosts: 'Toate discuțiile',
		home: 'Acasă PUBG Hack',
		language: 'Limbă',
		commentsTitle: 'Răspunsuri',
	},
	sv: {
		blogTitle: 'PUBG Hack Forum',
		blogDescription:
			'PUBG Hack blogg med ESP, wallhack, radar och Aimbot guider för PUBG på PC.',
		blogH1: 'Communityforum',
		blogIntro:
			'SEO-guider för PUBG hacks, ESP wallhack, radar hack, Aimbot och VAC på 22 språk.',
		readMore: 'Läs tråd',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade trådar',
		allPosts: 'Alla trådar',
		home: 'PUBG Hack hem',
		language: 'Språk',
		commentsTitle: 'Svar',
	},
};
