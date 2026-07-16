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

import { useState }                    from 'react'
import Link                            from 'next/link'
import Image                           from 'next/image'
import { usePathname }                 from 'next/navigation'
import { NAV_LINKS, PHARMACY, IMAGES } from '@/lib/constants'
import styles                          from './Header.module.css'


export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={styles.header} role="banner">
<div className={styles.inner}>
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
width={44}
height={44}
            priority
            className={styles.logoImage}
          />
<div className={styles.logoContent}>
  <span className={styles.logoText}>{PHARMACY.name}</span>
  <span className={styles.logoSince}>منذ عام 1981</span>
</div>
 </Link>

        {/* ------------------------------------------------------------------ */}
        {/* القائمة — Desktop */}
        {/* ------------------------------------------------------------------ */}
        <nav className={styles.desktopNav} aria-label="القائمة الرئيسية">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => {
              const isActive = link.href === pathname
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ------------------------------------------------------------------ */}
        {/* Hamburger — Mobile */}
        {/* ------------------------------------------------------------------ */}
        <div className={styles.actions}>
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
            {NAV_LINKS.map((link) => {
              const isActive = link.href === pathname
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${isActive ? styles.active : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
