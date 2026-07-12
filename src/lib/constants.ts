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
  slogan:      'رعايتكم الصحية تبدأ من هنا',
  description: 'أكثر من أربعة عقود من الثقة والرعاية الصحية في إربد، نقدم خدمات صيدلانية متخصصة واستشارات موثوقة، لنكون دائمًا بالقرب منكم.',
  foundedYear: 1981,
} as const


// -----------------------------------------------------------------------------
// 2. الصور الرسمية
// TODO: Replace with final optimized images before production.
// -----------------------------------------------------------------------------
export const IMAGES = {
  logo:    '/images/logo.png',
  hero: '/images/hero-transparent.png',
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
  whatsapp:     '+962790000000',
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
} as const


// -----------------------------------------------------------------------------
// 5. روابط التواصل الاجتماعي
// TODO: Replace with official social media links before production.
// -----------------------------------------------------------------------------
export const SOCIAL = {
  instagram: 'https://instagram.com/adnanpharmacy',
  facebook:  'https://facebook.com/adnanpharmacy',
  whatsapp:  'https://wa.me/+962790000000',
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
  { label: 'الرئيسية',      href: '/'           },
  { label: 'من نحن',        href: '/#about'      },
  { label: 'خدماتنا',       href: '/#services'   },
  { label: 'شركات التأمين', href: '/#insurance'  },
  { label: 'فحص البشرة',    href: '/#skin-check' },
  { label: 'المدونة',       href: '/blog'        },
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
    description: 'استشارات دقيقة من صيدلانيين مختصين لمساعدتكم في اختيار العلاج الأمثل.',
    icon:        'Pill',
    href:        '/#services',
  },
  {
    id:          'blood-pressure',
    title:       'قياس الضغط والسكر',
    description: 'خدمة مجانية ودقيقة لمتابعة صحتكم باستخدام أحدث الأجهزة.',
    icon:        'HeartPulse',
    href:        '/#services',
  },
  {
    id:          'skin-check',
    title:       'فحص البشرة',
    description: 'فحص احترافي للبشرة بواسطة أجهزة متخصصة وبإشراف صيدلانيين متخصصين.',
    icon:        'ScanFace',
    href:        '/#skin-check',
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
  { name: "safwa bank",  logo: "/images/insurance/safwa1.png" },
  { name: "Arab Bank",  logo: "/images/insurance/arab-bank2.png" },
  { name: "Al Rajhi Bank",  logo: "/images/insurance/alrajhi-bank1.png" },
  { name: "Hakeem", logo: "/images/insurance/hakeem.png" },
  { name: "Lawyers Association",  logo: "/images/insurance/lawyers-association.png", },
  { name: "Dental Association",  logo: "/images/insurance/dental-association.png", },
  { name: "NatHealth", logo: "/images/insurance/nathealth3.png" },
  { name: "Newton", logo: "/images/insurance/newtonn.png" },
  { name: "Medexa", logo: "/images/insurance/medexa1.png" },
  { name: "Omnicare", logo: "/images/insurance/omnicare3.png" },
  { name: "Housing Bank", logo: "/images/insurance/housing-bank.png" },
] as const;


// -----------------------------------------------------------------------------
// 13. نصوص قسم الجهات المعتمدة
// -----------------------------------------------------------------------------
export const INSURANCE_SECTION = {
  title:        'الجهات والمؤسسات المعتمدة',
  subtitle:     'نفخر بتقديم خدماتنا لمنتسبي عدد من شركات التأمين والبنوك والجامعات والنقابات والجهات المعتمدة في المملكة.',
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