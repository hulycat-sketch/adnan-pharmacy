'use client'

// =============================================================================
// Header.tsx — Global Navigation Header
// src/components/layout/Header.tsx
// =============================================================================
//
// ✅ use client: فقط لـ useState (فتح/إغلاق قائمة الموبايل)
// ✅ Sticky: CSS فقط
// ✅ Hover: CSS classes فقط — لا onMouseEnter/onMouseLeave
// ✅ البيانات من constants.ts
//
// =============================================================================

import { useState }                             from 'react'
import Link                                     from 'next/link'
import Image                                    from 'next/image'
import { NAV_LINKS, PHARMACY, IMAGES, CONTACT } from '@/lib/constants'
import styles                                   from './Header.module.css'


export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>

        {/* ------------------------------------------------------------------ */}
        {/* الشعار */}
        {/* ------------------------------------------------------------------ */}
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${PHARMACY.name} - الصفحة الرئيسية`}
        >
          <Image
            src={IMAGES.logo}
            alt={`شعار ${PHARMACY.name}`}
            width={48}
            height={48}
            priority
            className={styles.logoImage}
          />
          <span className={styles.logoText}>{PHARMACY.name}</span>
        </Link>

        {/* ------------------------------------------------------------------ */}
        {/* القائمة — Desktop */}
        {/* ------------------------------------------------------------------ */}
        <nav className={styles.desktopNav} aria-label="القائمة الرئيسية">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ------------------------------------------------------------------ */}
        {/* CTA + Hamburger */}
        {/* ------------------------------------------------------------------ */}
        <div className={styles.actions}>

          {/* زر تواصل معنا — Desktop */}
          <a
            href={`tel:${CONTACT.phone}`}
            className={`${styles.ctaBtn} ${styles.ctaDesktop}`}
            aria-label="اتصل بصيدلية عدنان"
          >
            تواصل معنا
          </a>

          {/* زر Hamburger — Mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`${styles.bar} ${isMenuOpen ? styles.barTop : ''}`}    />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barMid : ''}`}    />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barBot : ''}`}    />
          </button>

        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* القائمة — Mobile */}
      {/* -------------------------------------------------------------------- */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileNav}
          aria-label="قائمة الموبايل"
        >
          <ul className={`container ${styles.mobileList}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className={styles.mobileCta}>
              <a
                href={`tel:${CONTACT.phone}`}
                className={styles.ctaBtn}
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
