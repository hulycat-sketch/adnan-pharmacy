// =============================================================================
// metadata.ts
// Central SEO Configuration — المرجع الرسمي لجميع إعدادات الـ SEO
// Last Updated: 2026-07-02
// =============================================================================
//
// كيفية الاستخدام:
// - layout.tsx   ← يستورد siteMetadata كـ base metadata
// - كل صفحة     ← تستورد generateMetadata وتضيف بياناتها
//
// =============================================================================

import type { Metadata } from 'next'
import { PHARMACY, SITE, CONTACT, SEO, IMAGES, SOCIAL } from './constants'
import type { BlogArticle } from './blog'


// -----------------------------------------------------------------------------
// 1. Base Metadata — الـ Metadata الأساسي المشترك بين كل الصفحات
// -----------------------------------------------------------------------------
export const siteMetadata: Metadata = {

  // --- Title ---
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${PHARMACY.name}`,
    // مثال: "خدماتنا | صيدلية عدنان"
  },

  // --- Description ---
  description: SEO.defaultDescription,

  // --- Keywords ---
  keywords: [...SEO.keywords],

  // --- Authors ---
  authors: [{ name: PHARMACY.name, url: SITE.url }],

  // --- Canonical ---
  metadataBase: new URL(SITE.url),

  // --- Open Graph (مشاركة واتساب وفيسبوك) ---
  openGraph: {
    type:        'website',
    locale:      SITE.locale,
    url:         SITE.url,
    siteName:    PHARMACY.name,
    title:       SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url:    IMAGES.ogImage,
        width:  1200,
        height: 630,
        alt:    `${PHARMACY.name} — ${PHARMACY.slogan}`,
      },
    ],
  },

  // --- Twitter / X ---
  twitter: {
    card:        'summary_large_image',
    title:       SEO.defaultTitle,
    description: SEO.defaultDescription,
    images:      [IMAGES.ogImage],
  },

  // --- Robots ---
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-image-preview': 'large',
    },
  },

  // --- Icons ---
  icons: {
    icon:    IMAGES.favicon,
    apple:   IMAGES.favicon,
  },

  // --- Verification (أضيفي لاحقاً بعد ربط Google Search Console) ---
  // TODO: Add Google Search Console verification before production.
  // verification: {
  //   google: 'your-verification-code',
  // },
}


// -----------------------------------------------------------------------------
// 2. generatePageMetadata — لإنشاء Metadata خاص بكل صفحة
//
// الاستخدام في أي صفحة:
//
// export const metadata = generatePageMetadata({
//   title: 'نبذة عنا',
//   description: 'تعرف على صيدلية عدنان...',
//   path: '/about',
// })
// -----------------------------------------------------------------------------
interface PageMetadataProps {
  title:        string
  description?: string
  path?:        string
  image?:       string
}

export function generatePageMetadata({
  title,
  description = SEO.defaultDescription,
  path        = '/',
  image       = IMAGES.ogImage,
}: PageMetadataProps): Metadata {

  const url      = `${SITE.url}${path}`
  const fullTitle = `${title} | ${PHARMACY.name}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title:       fullTitle,
      description,
      url,
      images: [
        {
          url:    image,
          width:  1200,
          height: 630,
          alt:    fullTitle,
        },
      ],
    },
    twitter: {
      title:       fullTitle,
      description,
      images: [image],
    },
  }
}


// -----------------------------------------------------------------------------
// 3. JSON-LD Structured Data — بيانات منظمة لـ Google
//
// الاستخدام في layout.tsx أو page.tsx:
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
// />
// -----------------------------------------------------------------------------
export const pharmacySchema = {
  '@context':   'https://schema.org',
  '@type':      'Pharmacy',
  name:          PHARMACY.name,
  description:   PHARMACY.description,
  url:           SITE.url,
  foundingDate:  PHARMACY.foundedYear.toString(),
  address: {
    '@type':         'PostalAddress',
    streetAddress:    CONTACT.addressFull,
    addressLocality:  'إربد',
    addressCountry:   SITE.country,
  },
  telephone:     CONTACT.phone,
  email:         CONTACT.email,
  openingHours: [
    'Sa-Th 08:00-22:00',
    'Fr 09:00-22:00',
  ],
  sameAs: [
    SOCIAL.facebook,
    // TODO: Add remaining official social media URLs (Instagram, etc.) once confirmed.
  ],
  // TODO: Add geo coordinates once Google Maps location is finalized.
  // geo: {
  //   '@type':    'GeoCoordinates',
  //   latitude:   32.5568,
  //   longitude:  35.8469,
  // },
}


// -----------------------------------------------------------------------------
// 4. Article / FAQ Schema — لمقالات المدونة (src/app/blog/[slug]/page.tsx)
// -----------------------------------------------------------------------------
const ARABIC_MONTHS: Record<string, string> = {
  'يناير': '01', 'فبراير': '02', 'مارس': '03', 'أبريل': '04',
  'مايو': '05', 'يونيو': '06', 'يوليو': '07', 'أغسطس': '08',
  'سبتمبر': '09', 'أكتوبر': '10', 'نوفمبر': '11', 'ديسمبر': '12',
}

/** يحوّل تاريخ نصي بالعربي (متل "23 يوليو 2026") لصيغة ISO المطلوبة بـ Schema.org */
export function parseArabicDateToISO(text: string): string | undefined {
  const match = text.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/)
  if (!match) return undefined
  const [, day, monthName, year] = match
  const month = ARABIC_MONTHS[monthName]
  if (!month) return undefined
  return `${year}-${month}-${day.padStart(2, '0')}`
}

export function generateArticleSchema(article: BlogArticle) {
  const datePublished = parseArabicDateToISO(article.publishedAt)

  return {
    '@context':  'https://schema.org',
    '@type':     'Article',
    headline:    article.title,
    description: article.excerpt,
    image:       [`${SITE.url}${article.image}`],
    ...(datePublished ? { datePublished } : {}),
    author: {
      '@type': 'Organization',
      name:     PHARMACY.name,
      url:      SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name:     PHARMACY.name,
      logo: {
        '@type': 'ImageObject',
        url:      `${SITE.url}${IMAGES.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':    `${SITE.url}/blog/${article.slug}`,
    },
  }
}

/** بترجع null لو المقال ما فيه أي كتلة أسئلة شائعة (faq) */
export function generateFaqSchema(article: BlogArticle) {
  const questions = article.body
    .filter((block) => block.type === 'faq')
    .flatMap((block) => block.items)

  if (questions.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name:     item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:     item.answer,
      },
    })),
  }
}