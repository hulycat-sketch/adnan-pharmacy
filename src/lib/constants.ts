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
// 2. الصور الرسمية
// TODO: Replace with final optimized images before production.
// -----------------------------------------------------------------------------
export const IMAGES = {
  logo:    '/images/logo.png',
  hero: '/images/adnan-pharmacy-hero-02.webp',
  heroMobile: '/images/heromobilenew.webp',
  ogImage: '/images/og-image.jpg',
  favicon: '/favicon.ico',
} as const


// -----------------------------------------------------------------------------
// 3. معلومات التواصل
// TODO: Replace with real contact details before production.
// -----------------------------------------------------------------------------
export const CONTACT = {
  phone:        '+962-2-000-0000',
  phoneDisplay: '02 000 0000',
  whatsapp:     '962799399751',
  email:        'info@adnanpharmacy.com',
  address:      'إربد، الأردن',
  addressFull:  'شارع الجامعة، إربد، الأردن',
  workingHours: {
    weekdays: 'السبت – الخميس: 8 صباحاً – 10 مساءً',
    friday:   'الجمعة: 9 صباحاً – 10 مساءً',
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
  { label: 'نبذة عنا',    href: '/#about'              },
  { label: 'خدماتنا',     href: '/services'            },
  { label: 'موقعنا',      href: MAP.shareUrl           },
  { label: 'المدونة',     href: '/blog'                },
  { label: 'تواصل معنا',  href: `tel:${CONTACT.phone}` },
 ] as const


// -----------------------------------------------------------------------------
// 9. الخدمات
// -----------------------------------------------------------------------------
export const SERVICES = [
  {
    id:          'products',
    title:       'علامات تجارية موثوقة',
    description: 'نوفر علامات تجارية موثوقة في العناية الصحية والبشرة، مع استشارة تساعدكم على اختيار الأنسب.',
    icon:        'ShoppingBag',
    href:        '/#services',
  },
  {
    id:          'insurance',
    title:       'خدمات التأمين',
    description: 'نتعامل مع مجموعة واسعة من شركات التأمين لتسهيل حصولكم على أدويتكم.',
    icon:        'Shield',
    href:        '/#insurance',
  },
  {
    id:          'consultation',
    title:       'استشارات صيدلانية',
    description: 'إرشادات دوائية موثوقة من فريقنا الخبير لضمان استخدام الأدوية بشكل آمن وصحيح.',
    icon:        'Pill',
    href:        '/#services',
  },
  {
    id:          'blood-pressure',
    title:       'قياس الضغط والسكر',
    description: 'قياس سريع ودقيق للضغط والسكر لمتابعة صحتكم اليومية.',
    icon:        'HeartPulse',
    href:        '/#services',
  },
  {
    id:          'skin-check',
    title:       'فحص البشرة والشعر',
    description: 'فحص احترافي للبشرة والشعر بأجهزة متخصصة وبإشراف صيادلة مختصين.',
    icon:        'ScanFace',
    href:        '/#skin-check',
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
// -----------------------------------------------------------------------------
export const TRUSTED_BRANDS = [
  { name: 'Avène',          logo: '/images/brands/avene.svg' },
  { name: 'Bioderma',       logo: '/images/brands/bioderma.svg' },
  { name: 'Bionnex',        logo: '/images/brands/bionnex.svg', scale: 1.05 },
  { name: 'Bioten',         logo: '/images/brands/bioten.svg', scale: 1.05 },
  { name: 'CeraVe',         logo: '/images/brands/cerave.svg', scale: 0.95 },
  { name: 'Cetaphil',       logo: '/images/brands/cetaphil.svg', scale: 0.95 },
  { name: 'Flexitol',       logo: '/images/brands/flexitol.svg', scale: 1.05 },
  { name: 'Garnier',        logo: '/images/brands/garnier.svg', scale: 0.95 },
  { name: "Johnson's",      logo: '/images/brands/johnson.svg' },
  { name: 'La Roche-Posay', logo: '/images/brands/la-roche-posay.svg', scale: 0.95 },
  { name: "L'Oréal",        logo: '/images/brands/loreal.svg' },
  { name: 'Neutrogena',     logo: '/images/brands/neutrogena.svg', scale: 1.1 },
  { name: "Palmer's",       logo: '/images/brands/palmers.svg', scale: 0.95 },
  { name: 'QV',             logo: '/images/brands/qv.svg', scale: 1.1 },
  { name: 'Sebamed',        logo: '/images/brands/seba-med.svg' },
  { name: 'Vichy',          logo: '/images/brands/vichy.svg' },
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
INSURANCE_COMPANIES