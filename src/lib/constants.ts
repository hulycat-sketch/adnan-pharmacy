// =============================================================================
// constants.ts
// Single Source of Truth — Pharmacy Configuration
// Last Updated: 2026-07-02
// =============================================================================
//
// ⚠️  PRE-LAUNCH CHECKLIST
//     قبل نشر الموقع، ابحثي عن كلمة TODO في هذا الملف
//     واستبدلي جميع البيانات المؤقتة بالبيانات الحقيقية.
//
// =============================================================================


// -----------------------------------------------------------------------------
// 1. معلومات الصيدلية
// TODO: Replace with official pharmacy information before production.
// -----------------------------------------------------------------------------
export const PHARMACY = {
  name:        'صيدلية عدنان',
  nameEn:      'Adnan Pharmacy',
  slogan:      'رعايتكم الصحية أولويتنا',
  description: 'أكثر من أربعة عقود من الثقة والرعاية الصحية في إربد، نقدم خدمات صيدلانية متخصصة واستشارات موثوقة، لنكون دائمًا بالقرب منكم.',
  foundedYear: 1981,
} as const


// -----------------------------------------------------------------------------
// 1ب. نص وصف قسم Hero بالصفحة الرئيسية
// -----------------------------------------------------------------------------
export const HERO_SECTION = {
  description: 'من قلب شارع الجامعة في إربد، نواصل تقديم رعاية صيدلانية موثوقة، بعناية تليق بثقة عملائنا.',
} as const


// -----------------------------------------------------------------------------
// 2. الصور الرسمية
// TODO: Replace with final optimized images before production.
// -----------------------------------------------------------------------------
export const IMAGES = {
  logo:    '/images/logo.png',
  // نسخة شعار مخصّصة للـFooter — بخلفية شفافة (مش مدمَجة بلون معيّن)، فبتبين
  // صح فوق أي لون خلفية للـFooter بدون الحاجة تتعدّل كل ما يتغيّر اللون.
  // الهيدر بيضل يستخدم logo العادي.
  logoFooter: '/images/footer-logo.png',
  hero: '/images/home-hero-pharmacy.webp',
  heroMobile: '/images/heromobilenew.webp',
  ogImage: '/og-image.jpg',
  favicon: '/favicon.ico',
} as const


// -----------------------------------------------------------------------------
// 3. معلومات التواصل
// TODO: Replace with real contact details before production.
// -----------------------------------------------------------------------------
export const CONTACT = {
  phone:           '+962799399751',
  phoneDisplay:    '0799 399 751',
  whatsapp:        '962799399751',
  whatsappDisplay: '0799 399 751',
  email:           'muhdalmomani@gmail.com',
  address:         'إربد، الأردن',
  addressLandmark: 'دوار الجامعة – مقابل أسواق الغزاوي',
  addressFull:     'دوار الجامعة – مقابل أسواق الغزاوي، إربد، الأردن',
  workingHours: {
    dailyLabel:  'يوميًا:',
    dailyValue:  '9:00 صباحًا حتى 3:00 فجرًا',
    closedLabel: 'الثلاثاء:',
    closedValue: 'مغلق',
  },
} as const


// -----------------------------------------------------------------------------
// 4. إحداثيات Google Maps
// TODO: Replace with exact pharmacy location coordinates before production.
// -----------------------------------------------------------------------------
export const MAP = {
  lat:      32.5568,
  lng:      35.8469,
  zoom:     15,
  embedUrl: 'https://www.google.com/maps/embed?pb=...',
  shareUrl: 'https://maps.app.goo.gl/ncFKLBf5Txh9aAyd7',
} as const


// -----------------------------------------------------------------------------
// 5. روابط التواصل الاجتماعي
// TODO: Replace with official social media links before production.
// -----------------------------------------------------------------------------
export const SOCIAL = {
  instagram: 'https://instagram.com/adnanpharmacy',
  facebook:  'https://web.facebook.com/profile.php?id=100057314685906&locale=ar_AR',
  whatsapp:  `https://wa.me/${CONTACT.whatsapp}`,
} as const


// -----------------------------------------------------------------------------
// 6. إعدادات الموقع
// TODO: Replace SITE.url with the real domain before production.
// -----------------------------------------------------------------------------
export const SITE = {
  url:      'https://adnanpharmacy.com',
  locale:   'ar_JO',
  language: 'ar',
  dir:      'rtl',
  currency: 'JOD',
  country:  'JO',
} as const


// -----------------------------------------------------------------------------
// 7. SEO — الكلمات المفتاحية والبيانات الوصفية
// TODO: Review and expand keywords before production.
// -----------------------------------------------------------------------------
export const SEO = {
  defaultTitle:       'صيدلية عدنان | منذ 1981',
  defaultDescription: 'صيدلية عدنان في إربد تقدم خدمات صيدلانية متخصصة، فحص البشرة، وشركات التأمين المعتمدة منذ عام 1981.',
  keywords: [
    'صيدلية عدنان',
    'صيدلية في إربد',
    'فحص البشرة إربد',
    'تأمين جامعة اليرموك',
    'تأمين نقابة المهندسين',
    'قياس الضغط والسكر',
    'استشارات صيدلانية',
    'أدوية إربد',
    'صيدلية الأردن',
  ],
} as const


// -----------------------------------------------------------------------------
// 8. روابط التنقل
// -----------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: 'الرئيسية',    href: '/'                    },
  { label: 'نبذة عنا', href: '/about' },
  { label: 'المدونة',     href: '/blog'                },
  { label: 'موقعنا',      href: MAP.shareUrl           },
  { label: 'تواصل معنا',  href: `tel:${CONTACT.phone}` },
 ] as const


// -----------------------------------------------------------------------------
// 8ب. روابط سريعة — Footer
// -----------------------------------------------------------------------------
export const FOOTER_LINKS = [
  { label: 'الرئيسية',        href: '/'      },
  { label: 'عن صيدلية عدنان', href: '/about' },
  { label: 'المدونة',         href: '/blog'  },
] as const


// -----------------------------------------------------------------------------
// 9. الخدمات
// -----------------------------------------------------------------------------
export const SERVICES = [
  {
    id:             'skin-check',
    title:          'فحص مجاني للبشرة والشعر',
    titleHighlight: 'مجاني',
    description:    'فحص مجاني باستخدام أجهزة متخصصة لمساعدتكم على فهم احتياجات البشرة والشعر.',
    icon:           'ScanFace',
    href:           '/#services',
  },
  {
    id:          'blood-pressure',
    title:       'قياس الضغط والسكر',
    description: 'قياس سريع ودقيق لمتابعة مؤشراتكم الصحية اليومية.',
    icon:        'HeartPulse',
    href:        '/#services',
  },
  {
    id:          'consultation',
    title:       'استشارات صيدلانية',
    description: 'إرشادات موثوقة حول الاستخدام الآمن والصحيح للأدوية.',
    icon:        'Pill',
    href:        '/#services',
  },
  {
    id:          'insurance',
    title:       'خدمات التأمين',
    description: 'نساعدكم في الاستفادة من التغطية لدى الجهات وشركات التأمين المعتمدة.',
    icon:        'Shield',
    href:        '/#insurance',
  },
] as const


// -----------------------------------------------------------------------------
// 9ب. تفاصيل الخدمات — لصفحة /services (أقسام Split بصورة + وصف + نقاط)
// TODO: أضيفي بقية الخدمات هون بنفس الشكل عند بناء أقسامها.
// -----------------------------------------------------------------------------
export const SERVICE_DETAILS = [
  {
    id:          'skin-hair-check',
    title:       'فحص البشرة والشعر',
    description: 'باستخدام أجهزة تحليل متخصصة، نقيّم احتياجات البشرة والشعر بدقة، ثم نقدم استشارات صيدلانية تساعدكم على اختيار المنتجات الأنسب للعناية اليومية.',
    image:       '/images/services/skin-hair-analysis.jpg',
    bullets: [
      'تحليل نوع البشرة واحتياجاتها.',
      'تقييم صحة فروة الرأس والشعر.',
      'توصيات صيدلانية لاختيار المنتجات المناسبة.',
    ],
  },
  {
    id:          'pharmaceutical-consultation',
    title:       'الاستشارات الصيدلانية',
    description: 'يقدم فريقنا استشارات صيدلانية موثوقة لمساعدتكم في اختيار المنتجات المناسبة، وشرح طريقة استخدامها بما يتوافق مع احتياجاتكم الصحية والعناية اليومية.',
    image:       '/images/services/service-02-pharmaceutical-consultation.webp',
    bullets: [
      'المساعدة في اختيار المنتجات المناسبة.',
      'شرح طريقة الاستخدام الصحيحة.',
      'إرشادات للعناية اليومية بالبشرة.',
    ],
  },
  {
    id:          'health-monitoring',
    title:       'قياس الضغط والسكر',
    description: 'نوفر خدمة قياس ضغط الدم ومستوى السكر بسرعة ودقة، لمساعدتكم على متابعة مؤشراتكم الصحية اليومية والاطمئنان على صحتكم في أي وقت.',
    image:       '/images/services/health-monitoring.webp',
    bullets: [
      'قياس ضغط الدم بدقة وسهولة.',
      'متابعة مستوى السكر باستخدام أجهزة حديثة.',
      'نتائج فورية مع إرشادات صيدلانية عند الحاجة.',
    ],
  },
  {
    id:          'insurance-services',
    title:       'خدمات التأمين',
    description: 'نتعاون مع العديد من شركات التأمين المعتمدة لتسهيل إجراءات صرف الوصفات الطبية، ومساعدتكم في الحصول على أدويتكم بسرعة وسهولة وراحة.',
    image:       '/images/services/service-insurance.webp',
    bullets: [
      'استقبال معظم شركات التأمين المعتمدة.',
      'إجراءات سريعة وسهلة لصرف الوصفات الطبية.',
      'فريق صيدلاني جاهز للإجابة عن استفساراتكم.',
    ],
  },
  {
    id:          'trusted-brands',
    title:       'العلامات التجارية الموثوقة',
    description: 'نوفر مجموعة مختارة من العلامات التجارية العالمية الموثوقة في العناية بالبشرة والشعر والصحة اليومية، مع استشارات صيدلانية تساعدكم على اختيار المنتج الأنسب لاحتياجاتكم.',
    image:       '/images/services/trusted-brands.webp',
    bullets: [
      'منتجات من علامات تجارية عالمية موثوقة.',
      'خيارات تناسب مختلف أنواع البشرة والشعر.',
      'استشارات صيدلانية لاختيار المنتج المناسب.',
    ],
  },
] as const


// -----------------------------------------------------------------------------
// 9ج. العلامات التجارية الموثوقة — لشريط TrustedBrandsMarquee
// لإضافة/تعديل علامة: ضيفي ملف SVG (مفضّل) داخل public/images/brands/
// بتسمية kebab-case، وأضيفيها هون. خاصية visualScale اختيارية (خاصة
// بالموبايل فقط) للتحكم بحجم شعار معيّن لو نسبة أبعاده (عريض جدًا أو
// مربّع) خلّته يبين أصغر/أكبر بصريًا من الباقي جوا نفس صندوق العرض.
//
// ملاحظة: الملفات "-trimmed.png" مقصوصة (trim) لحدود الرسمة الفعلية —
// نفس أسلوب pharmacy-line-art-trimmed.png — عشان ما في هامش شفاف داخلي
// زائد. الفرق البصري المتبقي (يلي visualScale بيعالجه) سببه نسبة
// أبعاد كل شعار نفسها (عريض جدًا مقابل مربّع)، مش الهامش الداخلي.
// -----------------------------------------------------------------------------
// ترتيب الشعارات هون مقصود (مش أبجدي) — رتّبتها يدويًا بالتناوب بين
// الألوان (بارد/دافئ/محايد) وحجم كل شعار، حتى ولا لونين متشابهين (خصوصًا
// الأزرق/الأسود الكتار) يضلوا ملتصقين ببعض بالشريط. خاصية scale (شاملة)
// إضافية تحت لملفات مو مقصوصة أصلًا (زي laroche-posay.png) وفيها هامش
// شفاف داخلي حقيقي بيخلّيها تبين أصغر — نفس سبب scale المستخدم بقسم
// الجهات المعتمدة، مش خاص بالموبايل متل visualScale.
export const TRUSTED_BRANDS = [
  { name: 'Avène',            logo: '/images/brands/avene-trimmed.png' },
  { name: 'Bioderma',         logo: '/images/brands/bioderma-trimmed.png', visualScale: 1.18 },
  { name: 'Cantu',            logo: '/images/brands/cantu.png' },
  { name: 'CeraVe',           logo: '/images/brands/cerave-trimmed.png' },
  { name: 'Garnier',          logo: '/images/brands/garnier-trimmed.png' },
  { name: 'Sebamed',          logo: '/images/brands/seba-med-trimmed.png', visualScale: 0.85 },
  { name: 'Bioten',           logo: '/images/brands/bioten-trimmed.png' },
  { name: 'Chicco',           logo: '/images/brands/chicco.png' },
  { name: "L'Oréal",          logo: '/images/brands/loreal-trimmed.png', visualScale: 1.1 },
  { name: 'Philips Avent',    logo: '/images/brands/avent.png' },
  { name: 'Neutrogena',       logo: '/images/brands/neutrogena-trimmed.png', visualScale: 1.15 },
  { name: 'Bionnex',          logo: '/images/brands/bionnex-trimmed.png', visualScale: 1.1 },
  { name: 'HiGeen',           logo: '/images/brands/higeen.png' },
  { name: 'Vichy',            logo: '/images/brands/vichy-trimmed.png' },
  { name: 'OZ Naturals',      logo: '/images/brands/oz-naturals.png', scale: 1.28 },
  { name: 'Flexitol',         logo: '/images/brands/flexitol-trimmed.png', visualScale: 1.1 },
  { name: 'Cetaphil',         logo: '/images/brands/cetaphil-trimmed.png', visualScale: 0.85 },
  { name: 'BioBalance',       logo: '/images/brands/bio-balance.png', scale: 1.12 },
  { name: "Johnson's",        logo: '/images/brands/johnson-trimmed.png' },
  { name: 'Ozone Cosmetics',  logo: '/images/brands/ozone-cosmetics.png', scale: 1.2 },
  { name: 'Clean & Clear',    logo: '/images/brands/clean-and-clear.png' },
  { name: "Palmer's",        logo: '/images/brands/palmers-trimmed.png' },
  { name: 'Miriam Marvels',  logo: '/images/brands/miriam-marvels.png', scale: 1.12 },
  { name: 'QV',              logo: '/images/brands/qv-trimmed.png', visualScale: 0.85 },
  { name: 'Deep Fresh',      logo: '/images/brands/deep-fresh.png' },
  { name: 'Maybelline',      logo: '/images/brands/maybelline.png', scale: 1.3 },
  { name: 'Ducray',          logo: '/images/brands/ducray.png', scale: 1.2 },
  { name: 'La Roche-Posay',  logo: '/images/brands/laroche-posay.png', scale: 1.2 },
  { name: 'Eucerin',         logo: '/images/brands/eucerin.png', scale: 1.08 },
  { name: 'TRESemmé',        logo: '/images/brands/tresemme.png' },
  { name: 'Cosmo Cosmetics', logo: '/images/brands/cosmo-cometics.png' },
  { name: 'Uriage',          logo: '/images/brands/uriage.png', scale: 1.08 },
  { name: 'Panthophil',      logo: '/images/brands/panthophil.png', scale: 1.28 },
  { name: 'Olay',            logo: '/images/brands/olay.png', scale: 1.12 },
  { name: 'Mineaderm',       logo: '/images/brands/mineaderm.png', scale: 1.2 },
  { name: 'ISDIN',           logo: '/images/brands/isdin-love-your-skin.png', scale: 1.12 },
  { name: 'Skincode',        logo: '/images/brands/skin-code.png', scale: 1.2 },
  { name: 'Mavala',          logo: '/images/brands/mavala.png', scale: 1.28 },
  { name: 'Revigen',         logo: '/images/brands/revigen-sience-for-hair.png', scale: 1.08 },
  { name: 'Filorga',         logo: '/images/brands/filogra.png', scale: 1.12 },
  { name: 'LysaSkin',        logo: '/images/brands/lysa-skin.png', scale: 1.12 },
  { name: 'laCabine',        logo: '/images/brands/la-cabine.png', scale: 1.2 },
  { name: 'DermoXEN',        logo: '/images/brands/dermoxen.png', scale: 1.25 },
  { name: 'Pantogar',        logo: '/images/brands/pantogar.png', scale: 1.2 },
  { name: 'SoSkin',          logo: '/images/brands/so-skin.png' },
  { name: 'Labello',         logo: '/images/brands/labello.png', scale: 1.25 },
  { name: '4 Long Lashes',   logo: '/images/brands/4long-lashes.png' },
] as const


// -----------------------------------------------------------------------------
// 9د. صفحة "نبذة عنا" (/about) — مسار سردي واحد متصل:
// 1981 → المؤسس → عائلة طبية → اليوم → الإرث
// -----------------------------------------------------------------------------

// Hero مضغوط — عنوان + شعار فرعي + مقدّمة قصيرة
export const ABOUT_HERO = {
  title:    'قصتنا',
  subtitle: 'ثقة بدأت عام 1981 وما زالت مستمرة',
  intro:    'من قلب شارع الجامعة في إربد، بدأت رحلة صيدلية عدنان لتكون قريبة من أهالي المنطقة وطلبتها، وتبني مكانتها على المعرفة الصيدلانية والأمانة والاهتمام.',
} as const

// قسم المؤسس — الصورة التاريخية الحقيقية
export const ABOUT_FOUNDER = {
  badge:       `البداية • ${PHARMACY.foundedYear}`,
  title:       'البداية مع الدكتور عدنان محمد جبر المومني',
  description: 'أسّس الدكتور عدنان محمد جبر المومني صيدلية عدنان عام 1981، لتكون من أوائل الصيدليات في شارع الجامعة بإربد. ومنذ بدايتها، ارتبط اسمها بالخدمة الموثوقة والحرص على تلبية احتياجات المراجعين باهتمام ومسؤولية.',
  image:       '/about/adnan-pharmacy-past.webp',
  caption:     'صيدلية عدنان – شارع الجامعة، عام 1990',
} as const

// قسم انتقالي قصير — بدون صورة أو بطاقة، أيقونة فقط على خلفية خضراء فاتحة
export const ABOUT_MEDICAL_FAMILY = {
  title:       'عائلة في قلب القطاع الصحي',
  description: 'نشأت صيدلية عدنان ضمن عائلة تضم أطباء وصيادلة في تخصصات متعددة، فكانت الرعاية الصحية مسؤولية مهنية وقيمة عائلية توارثتها الأجيال.',
} as const

// قسم اليوم — نفس صورة الواجهة المستخدمة بالـHero الرئيسي، لاستمرارية بصرية مع الصفحة الرئيسية
export const ABOUT_TODAY = {
  // 2026 معلَّقة عمدًا (مش new Date().getFullYear()) — محطّة تاريخية
  // مرتبطة بصورة الواجهة الحالية بالذات، مش "السنة الحالية" المتغيّرة
  badge:       '2026',
  title:       'جيل جديد يواصل المسيرة',
  description: 'اليوم يواصل الدكتور محمد عدنان المومني مسيرة والده، محافظًا على القيم التي وضعها المؤسس، ومواكبًا لاحتياجات المراجعين بأسلوب مهني يجمع بين الخبرة والرعاية الشخصية.',
  image:       IMAGES.hero,
  // أبعاد الملف الأصلية (1254×1254) — لازمة لعرض الصورة بأبعادها
  // الطبيعية عبر Next/Image بدون fill (width:100% بيحسب الارتفاع تلقائيًا)
  imageWidth:  1254,
  imageHeight: 1254,
} as const

// قسم الإرث الختامي — 3 حقائق مختصرة بدون بطاقات
// mobileValue/mobileLabel اختياريان — نسخة مختصرة تُعرض بعمود موبايل ضيّق
// (أقل من 769px)؛ لو غير موجودين بيتم الرجوع لـvalue/label العاديين
export const ABOUT_LEGACY = {
  title:       'إرث يستمر',
  description: 'تغيّرت الواجهة وتطورت الخدمات، لكن يبقى وعدنا ثابتًا: معرفة صيدلانية موثوقة، وتعامل واضح وأمين، واهتمام حقيقي بزائرينا.',
  facts: [
    { icon: 'Calendar', label: 'سنة التأسيس',        value: String(PHARMACY.foundedYear) },
    { icon: 'Clock',     label: 'من الخبرة',          value: 'أكثر من أربعة عقود', mobileValue: '+40 سنة' },
    // عبارة مختصرة للسرد هون فقط — العنوان التفصيلي الكامل موجود بمعلومات
    // التواصل (CONTACT.addressLandmark) وما بلزم يتكرر بهالقسم
    { icon: 'MapPin',    label: 'موقعنا منذ البداية', value: 'شارع الجامعة – إربد', mobileLabel: 'شارع الجامعة', mobileValue: 'إربد' },
  ],
} as const


// -----------------------------------------------------------------------------
// 10. الإحصائيات
// -----------------------------------------------------------------------------
export const STATS = [
  { value: '+40',  label: 'عام من الخبرة' },
  { value: '+10',  label: 'صيدلاني متخصص' },
  { value: '+50',  label: 'شركة تأمين'     },
  { value: '+20K', label: 'عميل راضٍ'      },
] as const


// -----------------------------------------------------------------------------
// 11. مزايا صيدلية عدنان
// -----------------------------------------------------------------------------
export const WHY_US = [
  'خبرة تمتد منذ عام 1981',
  'فريق صيدلاني متخصص',
  'خدمات صحية شاملة ومتكاملة',
  'التزام بالجودة والمصداقية',
  'رعاية شخصية لكل عميل',
] as const


// -----------------------------------------------------------------------------
// 12. شركات التأمين
// TODO: Replace logos with real insurance company images before production.
//
// - shape: نسبة أبعاد الشعار بعد القصّ (wide/medium/square) — تحدد صندوق
//   الحجم المناسب لكل شعار على الموبايل (كل نوع أبعاده مختلفة عمدًا حتى
//   الشعارات المربعة ما تضل صغيرة جوا صندوق عريض مصمم للشعارات المستطيلة).
// - scale: تصحيح شامل (ديسكتوب + موبايل) لشعار فيه هامش فارغ داخلي أكبر
//   من الباقي — موجود من جولة سابقة، ما تغيّر.
// - visualScale: تصحيح إضافي خاص بالموبايل فقط (فوق الـshape الجديد)،
//   لنفس سبب scale بالضبط بس مضبوط لصندوق الموبايل الجديد تحديدًا.
// -----------------------------------------------------------------------------
export const INSURANCE_CATEGORIES = [
  { id: "insurance",    label: "شركات التأمين" },
  { id: "banks",        label: "البنوك" },
  { id: "universities", label: "الجامعات" },
  { id: "syndicates",   label: "النقابات" },
] as const;

export const INSURANCE_COMPANIES = [
  { name: "GIG Jordan", logo: "/images/insurance/gign.png", category: "insurance", shape: "medium", scale: 1.4, visualScale: 0.95 },
  { name: "MedService", logo: "/images/insurance/medservicen.png", category: "insurance", shape: "medium", scale: 1.2, visualScale: 0.95 },
  { name: "MedNet", logo: "/images/insurance/mednet3.png", category: "insurance", shape: "medium", visualScale: 1.08 },
  { name: "GlobeMed", logo: "/images/insurance/globemed3.png", category: "insurance", shape: "wide", scale: 1.1 },
  { name: "Solidarity", logo: "/images/insurance/solidarity4.png", category: "insurance", shape: "wide", scale: 1.13 },
  { name: "Hakeem", logo: "/images/insurance/hakeem.png", category: "insurance", shape: "medium", scale: 1.15 },
  { name: "EuroArab", logo: "/images/insurance/euroarabn.png", category: "insurance", shape: "medium" },
  { name: "NatHealth", logo: "/images/insurance/nathealth3.png", category: "insurance", shape: "wide", scale: 1.1 },
  { name: "Newton", logo: "/images/insurance/newtonn.png", category: "insurance", shape: "wide", scale: 0.92 },
  { name: "Medexa", logo: "/images/insurance/medexa1.png", category: "insurance", shape: "wide", scale: 0.92 },
  { name: "Omnicare", logo: "/images/insurance/omnicare3.png", category: "insurance", shape: "wide", scale: 1.11 },
  { name: "Al Nisr Al Arabi Insurance", logo: "/images/insurance/al-nisir-alarabi-insurance.png", category: "insurance", shape: "medium", scale: 1.11 },
  { name: "Al Manara Islamic Insurance", logo: "/images/insurance/almanara-islamic-insurance.png", category: "insurance", shape: "square", visualScale: 1.12 },
  { name: "Arab Potash", logo: "/images/insurance/arab-potash.png", category: "insurance", shape: "square" },
  { name: "Jordan Phosphate Mines", logo: "/images/insurance/phosphate-mines.png", category: "insurance", shape: "square" },
  { name: "Arab Bank",  logo: "/images/insurance/arab-bank2.png", category: "banks", shape: "wide", visualScale: 1.12 },
  { name: "Al Rajhi Bank",  logo: "/images/insurance/alrajhi-bank1.png", category: "banks", shape: "wide" },
  { name: "Housing Bank", logo: "/images/insurance/housing-bank.png", category: "banks", shape: "wide", scale: 1.2 },
  { name: "Jordan Islamic Bank",  logo: "/images/insurance/jordan-islamic-bank.png", category: "banks", shape: "wide", scale: 1.25, visualScale: 1.15 },
  { name: "Cairo Amman Bank",  logo: "/images/insurance/cairo-amman-bank.png", category: "banks", shape: "wide", visualScale: 1.12 },
  { name: "bank aletihad",  logo: "/images/insurance/bank-aletihad.png", category: "banks", shape: "wide", visualScale: 1.1 },
  { name: "safwa bank",  logo: "/images/insurance/safwa1.png", category: "banks", shape: "wide", scale: 1.15, visualScale: 1.08 },
  { name: "yarmouk university",  logo: "/images/insurance/yarmouk-university.png", category: "universities", shape: "square" },
  { name: "jadara university",  logo: "/images/insurance/jadara-university.png", category: "universities", shape: "square", scale: 1.15 },
  { name: "philadelphia university",  logo: "/images/insurance/philadelphia-university.png", category: "universities", shape: "square" },
  { name: "irbid national university",  logo: "/images/insurance/irbid-national-university.png", category: "universities", shape: "square" },
  { name: "Lawyers Association",  logo: "/images/insurance/lawyers-association.png", category: "syndicates", shape: "medium" },
  { name: "Dental Association",  logo: "/images/insurance/dental-association.png", category: "syndicates", shape: "wide" },
] as const;


// -----------------------------------------------------------------------------
// 13. نصوص قسم الجهات المعتمدة
// -----------------------------------------------------------------------------
export const INSURANCE_SECTION = {
  title:    'الجهات المعتمدة لدينا',
  subtitle: 'نتعامل مع مجموعة واسعة من الجهات والمؤسسات المعتمدة لتسهيل حصولكم على خدماتنا.',
} as const


// -----------------------------------------------------------------------------
// 14. لماذا صيدلية عدنان؟ — للصفحة الرئيسية
// -----------------------------------------------------------------------------
export const WHY_US_SECTION = {
  title: 'لماذا صيدلية عدنان؟',
} as const

export const WHY_US_POINTS = [
  {
    id:          'since-1981',
    title:       'خبرة منذ عام 1981',
    description: 'أكثر من أربعة عقود في خدمة أهالي إربد.',
    icon:        'Calendar',
  },
  {
    id:          'responsible-care',
    title:       'رعاية صيدلانية مسؤولة',
    description: 'سلامة المراجع واحتياجاته أولًا.',
    icon:        'ShieldCheck',
  },
  {
    id:          'qualified-team',
    title:       'فريق صيدلاني مؤهل',
    description: 'معرفة مهنية وخبرة عملية في خدمتكم.',
    icon:        'UserRound',
  },
  {
    id:          'our-values',
    title:       'الوضوح والأمانة',
    description: 'إرشادات واضحة وتعامل مهني.',
    icon:        'Heart',
  },
] as const


// -----------------------------------------------------------------------------
// 15. المدونة الصحية — نصوص Hero وقسم الاستشارة الختامي
// بيانات التصنيفات والمقالات نفسها موجودة بملف مخصّص: src/lib/blog.ts
// -----------------------------------------------------------------------------
export const BLOG_SECTION = {
  title:       'المدونة الصحية',
  description: 'مقالات صحية موثوقة ونصائح صيدلانية عملية تساعدكم على اتخاذ قرارات أكثر وعيًا لصحتكم وصحة عائلتكم.',
} as const

export const BLOG_CONSULTATION = {
  title:       'هل تحتاجون إلى استشارة؟',
  description: 'يسعد فريق صيدلية عدنان بمساعدتكم وتقديم الإرشاد الصيدلاني المناسب لاحتياجاتكم.',
} as const


// =============================================================================
//
//  IMPORTANT
//
//  Do not hard-code any values anywhere else in the project.
//
//  If any static data changes (phone, address, social links, images...),
//  update it here only — in this file.
//
//  This file is the Single Source of Truth.
//
// =============================================================================