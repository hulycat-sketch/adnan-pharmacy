'use client'

// =============================================================================
// ContactMenu.tsx — قائمة "تواصل معنا" السريعة
// src/components/layout/ContactMenu.tsx
// =============================================================================
//
// يصدّر مكونين يشاركان نفس بيانات MENU_ITEMS:
// ✅ ContactMenuDropdown — ديسكتوب: زر + قائمة منسدلة عائمة (Escape/Click
//    outside بيسكروها، تفتح بالنقر فقط — بدون hover حسب قاعدة Header.tsx)
// ✅ ContactMenuMobileSection — موبايل: نفس الخيارات كقسم ثابت (غير منسدل)
//    جوا قائمة الموبايل الموجودة أصلًا
//
// =============================================================================

import { useEffect, useRef, useState, type ComponentType } from 'react'
import Link from 'next/link'
import { ChevronDown, MapPin, PhoneCall } from 'lucide-react'
import { FaWhatsapp, FaFacebookMessenger, FaFacebookF } from 'react-icons/fa'
import { CONTACT, CONTACT_MENU } from '@/lib/constants'
import styles from './ContactMenu.module.css'

// نوع عام يغطي أيقونات lucide-react وreact-icons معًا (كلاهما بيدعمان
// size/className) — بيسمح لعنصر PhoneCall (lucide) وأيقونات العلامات
// التجارية الحقيقية (react-icons) تتعايش بنفس البنية
type IconComponent = ComponentType<{ size?: number; className?: string }>

type MenuItem = {
  id: string
  label: string
  icon: IconComponent
  href: string
  external: boolean
  primary?: boolean
}

// أيقونات العلامات التجارية الحقيقية من react-icons (lucide-react ما فيه
// شعارات واتساب/ماسنجر/فيسبوك) — الهاتف بس ضل من lucide-react
const MENU_ITEMS: readonly MenuItem[] = [
  {
    id:       'whatsapp',
    label:    'واتساب',
    icon:     FaWhatsapp,
    href:     `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT_MENU.whatsappMessage)}`,
    external: true,
    primary:  true,
  },
  {
    id:       'call',
    label:    'اتصال هاتفي',
    icon:     PhoneCall,
    href:     `tel:${CONTACT.phone}`,
    external: false,
  },
  {
    id:       'messenger',
    label:    'ماسنجر',
    icon:     FaFacebookMessenger,
    href:     CONTACT_MENU.messengerUrl,
    external: true,
  },
  {
    id:       'facebook',
    label:    'صفحة الفيسبوك',
    icon:     FaFacebookF,
    href:     CONTACT_MENU.facebookUrl,
    external: true,
  },
] as const

function MenuItemLink({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className={`${styles.item} ${item.primary ? styles.itemPrimary : ''}`}
      onClick={onNavigate}
    >
      <Icon size={18} className={styles.itemIcon} aria-hidden="true" />
      <span>{item.label}</span>
    </a>
  )
}

function FullInfoLink({ onNavigate, className }: { onNavigate: () => void; className: string }) {
  return (
    <Link href="/contact" className={className} onClick={onNavigate}>
      <MapPin width={16} height={16} aria-hidden="true" />
      <span>جميع معلومات التواصل</span>
    </Link>
  )
}

// -----------------------------------------------------------------------------
// ديسكتوب — زر + قائمة منسدلة عائمة
// -----------------------------------------------------------------------------
type ContactMenuDropdownProps = {
  label: string
  triggerClassName: string
}

export function ContactMenuDropdown({ label, triggerClassName }: ContactMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <div ref={containerRef} className={styles.dropdownWrap}>
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClassName} ${styles.triggerButton}`}
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          width={14}
          height={14}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          {MENU_ITEMS.map((item) => (
            <MenuItemLink key={item.id} item={item} onNavigate={closeMenu} />
          ))}

          <div className={styles.divider} />

          <FullInfoLink onNavigate={closeMenu} className={styles.fullInfoLink} />
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// موبايل — قسم ثابت (غير منسدل) جوا قائمة الموبايل
// -----------------------------------------------------------------------------
export function ContactMenuMobileSection({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={styles.mobileSection}>
      {MENU_ITEMS.map((item) => (
        <MenuItemLink key={item.id} item={item} onNavigate={onNavigate} />
      ))}

      <div className={styles.divider} />

      <FullInfoLink onNavigate={onNavigate} className={styles.fullInfoLink} />
    </div>
  )
}
