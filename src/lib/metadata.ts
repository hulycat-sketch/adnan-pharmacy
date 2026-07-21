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
//   title: 'خدماتنا',
//   description: 'تعرف على خدمات صيدلية عدنان...',
//   path: '/services',
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