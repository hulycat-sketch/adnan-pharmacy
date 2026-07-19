// =============================================================================
// layout.tsx — Root Layout
// صيدلية عدنان | Server Component
// Last Updated: 2026-07-03
// =============================================================================
//
// المسؤوليات:
// ✅ استيراد globals.css مرة واحدة
// ✅ تحميل الخط محلياً من src/fonts عبر next/font/local
// ✅ إعداد html: lang="ar" dir="rtl"
// ✅ تصدير siteMetadata كـ metadata رسمي
// ✅ JSON-LD داخل body
//
// ممنوع هنا:
// ❌ Header / Footer / Hero
// ❌ 'use client'
// ❌ <head> مخصص
// ❌ أي محتوى خاص بصفحة معينة
//
// =============================================================================

import type { ReactNode }               from 'react'
import type { Metadata }                from 'next'
import localFont                        from 'next/font/local'
import { siteMetadata, pharmacySchema } from '@/lib/metadata'
import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// -----------------------------------------------------------------------------
// 1. الخط — IBM Plex Sans Arabic
//    المسار نسبي من src/app/layout.tsx إلى src/fonts/
// -----------------------------------------------------------------------------
const ibmPlexArabic = localFont({
  src: [
    {
      path:   '../fonts/IBMPlexSansArabic-Regular.ttf',
      weight: '400',
      style:  'normal',
    },
    {
      path:   '../fonts/IBMPlexSansArabic-SemiBold.ttf',
      weight: '600',
      style:  'normal',
    },
    {
  path: '../fonts/IBMPlexSansArabic-Bold.ttf',
  weight: '700',
  style: 'normal',
},
  ],
  variable: '--font-ibm-plex-arabic',
  display:  'swap',
  preload:  true,
  fallback: ['system-ui', 'sans-serif'],
})


// -----------------------------------------------------------------------------
// 2. Metadata — يُصدَّر ويُستخدم تلقائياً من Next.js
// -----------------------------------------------------------------------------
export const metadata: Metadata = siteMetadata


// -----------------------------------------------------------------------------
// 3. Root Layout
// -----------------------------------------------------------------------------
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={ibmPlexArabic.variable}
      suppressHydrationWarning
    >
      <body className={ibmPlexArabic.className}>

        {/* JSON-LD — Pharmacy Structured Data لـ Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pharmacySchema),
          }}
        />
<Header />
        {/* main#main-content — Accessibility + قابل للتوسع */}
        <main id="main-content">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  )
}