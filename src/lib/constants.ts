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
  ogImage: '/images/og-image.jpg',
  favicon: '/favicon.ico',
} as const


// -----------------------------------------------------------------------------
// 3. معلومات التواصل
// TODO: Replace with real contact details before production.
// -----------------------------------------------------------------------------
export const CONTACT = {
  phone:           '+962-2-000-0000',
  phoneDisplay:    '02 000 0000',
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
  facebook:  'https://facebook.com/adnanpharmacy',
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
  { label: 'موقعنا',      href: MAP.shareUrl           },
  { label: 'المدونة',     href: '/blog'                },
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
    href:           '/#skin-check',
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
// بتسمية kebab-case، وأضيفيها هون. خاصية scale اختيارية للتحكم بحجم شعار
// معيّن لو كانت أبعاده الأصلية تخليه يبين أصغر/أكبر بصريًا من الباقي.
//
// ملاحظة: الملفات "-trimmed.png" مقصوصة (trim) لحدود الرسمة الفعلية —
// نفس أسلوب pharmacy-line-art-trimmed.png — عشان كل الشعارات تطلع بنفس
// الحجم البصري تلقائيًا بدون الحاجة لمعامل scale يدوي لكل شعار جديد.
// -----------------------------------------------------------------------------
export const TRUSTED_BRANDS = [
  { name: 'Avène',          logo: '/images/brands/avene-trimmed.png' },
  { name: 'Bioderma',       logo: '/images/brands/bioderma-trimmed.png' },
  { name: 'Bionnex',        logo: '/images/brands/bionnex-trimmed.png' },
  { name: 'Bioten',         logo: '/images/brands/bioten-trimmed.png' },
  { name: 'CeraVe',         logo: '/images/brands/cerave-trimmed.png' },
  { name: 'Cetaphil',       logo: '/images/brands/cetaphil-trimmed.png' },
  { name: 'Flexitol',       logo: '/images/brands/flexitol-trimmed.png' },
  { name: 'Garnier',        logo: '/images/brands/garnier-trimmed.png' },
  { name: "Johnson's",      logo: '/images/brands/johnson-trimmed.png' },
  { name: 'La Roche-Posay', logo: '/images/brands/la-roche-posay-trimmed.png' },
  { name: "L'Oréal",        logo: '/images/brands/loreal-trimmed.png' },
  { name: 'Neutrogena',     logo: '/images/brands/neutrogena-trimmed.png' },
  { name: "Palmer's",       logo: '/images/brands/palmers-trimmed.png' },
  { name: 'QV',             logo: '/images/brands/qv-trimmed.png' },
  { name: 'Sebamed',        logo: '/images/brands/seba-med-trimmed.png' },
  { name: 'Vichy',          logo: '/images/brands/vichy-trimmed.png' },
] as const


// -----------------------------------------------------------------------------
// 9د. قصة الصيدلية — لصفحة /about (بطاقات Split بصورة + عنوان + وصف)
// -----------------------------------------------------------------------------
export const ABOUT_STORY_CARDS = [
  {
    id:          'four-decades',
    title:       'أكثر من أربعة عقود من العطاء',
    description: 'على امتداد أكثر من أربعة عقود، بنت الصيدلية ثقة أجيال من العائلات والطلاب والعاملين في المنطقة، من خلال الخبرة الصيدلانية، والاهتمام الحقيقي بالمريض، والحرص على توفير احتياجاته الدوائية، بما في ذلك الأدوية التي يصعب العثور عليها، مستفيدةً من علاقاتها المهنية الواسعة وخبرتها الطويلة في القطاع الصحي.',
    image:       '/about/first.webp',
    imagePosition: 'left',
    // الصورة مربعة (1:1) وصندوق الكرت 4:3 — أي قصّ (cover) بيقتطع جزء من
    // اللوحة أو الواجهة. بنستخدم contain عشان تظهر الواجهة كاملة بدون قصّ
    imageFit:    'contain',
    caption:     'صيدلية عدنان — عام 2006',
    badge:       'منذ 1981',
  },
  {
    id:          'medical-family',
    title:       'عائلة ارتبط اسمها بالمجال الطبي',
    description: 'تنتمي صيدلية عدنان إلى عائلة ارتبط اسمها بالمجال الطبي، وتضم بين أفرادها أطباء وصيادلة في تخصصات متعددة؛ لذلك كانت الرعاية الصحية بالنسبة إليها مسؤولية عائلية ومهنية توارثتها الأجيال.',
    image:       '/about/second.webp',
    imagePosition: 'right',
    caption:     'صيدلية عدنان — عام 1990',
    icon:        'Users',
  },
  {
    id:          'trust-and-expertise',
    title:       'نواصل مسيرتنا بثقة واحتراف',
    description: 'واليوم، تواصل الصيدلية مسيرتها بإدارة الدكتور محمد عدنان المومني، محافظةً على القيم التي تأسست عليها، ومواكبةً احتياجات المرضى الحديثة، إلى جانب تعاملها مع مجموعة واسعة من شركات التأمين والبنوك والجامعات والجهات المعتمدة.',
    image:       '/about/third.webp',
    imagePosition: 'right',
    icon:        'Pill',
  },
] as const


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
// -----------------------------------------------------------------------------
export const INSURANCE_COMPANIES = [
  { name: "GIG Jordan", logo: "/images/insurance/gign.png" },
  { name: "GlobeMed", logo: "/images/insurance/globemed3.png" },
  { name: "MedNet", logo: "/images/insurance/mednet3.png" },
  { name: "MedService", logo: "/images/insurance/medservicen.png" },
  { name: "Solidarity", logo: "/images/insurance/solidarity4.png" },
  { name: "EuroArab", logo: "/images/insurance/euroarabn.png" },
  { name: "Hakeem", logo: "/images/insurance/hakeem.png" },
  { name: "NatHealth", logo: "/images/insurance/nathealth3.png" },
  { name: "Newton", logo: "/images/insurance/newtonn.png" },
  { name: "Medexa", logo: "/images/insurance/medexa1.png" },
  { name: "Omnicare", logo: "/images/insurance/omnicare3.png" },
  { name: "Arab Bank",  logo: "/images/insurance/arab-bank2.png" },
  { name: "Al Rajhi Bank",  logo: "/images/insurance/alrajhi-bank1.png" },
  { name: "Housing Bank", logo: "/images/insurance/housing-bank.png" },
  { name: "Jordan Islamic Bank",  logo: "/images/insurance/jordan-islamic-bank.png", },
  { name: "Cairo Amman Bank",  logo: "/images/insurance/cairo-amman-bank.png", },
  { name: "bank aletihad",  logo: "/images/insurance/bank-aletihad.png", },
  { name: "safwa bank",  logo: "/images/insurance/safwa1.png" },
  { name: "yarmouk university",  logo: "/images/insurance/yarmouk-university.png", },
  { name: "jadara university",  logo: "/images/insurance/jadara-university.png", },
  { name: "philadelphia university",  logo: "/images/insurance/philadelphia-university.png", },
  { name: "Lawyers Association",  logo: "/images/insurance/lawyers-association.png", },
  { name: "Dental Association",  logo: "/images/insurance/dental-association.png", },
] as const;


// -----------------------------------------------------------------------------
// 13. نصوص قسم الجهات المعتمدة
// -----------------------------------------------------------------------------
export const INSURANCE_SECTION = {
  title:        'الجهات المعتمدة لدينا',
  subtitle:     'شركات التأمين • البنوك • الجامعات • النقابات',
  viewAllLabel: 'عرض جميع الجهات المعتمدة',
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
    description: 'سلامة المراجع واحتياجاته في المقام الأول.',
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
    description: 'نقدم إرشادات واضحة وتعاملًا قائمًا على الاحترام.',
    icon:        'Heart',
  },
] as const


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