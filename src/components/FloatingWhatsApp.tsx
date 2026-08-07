import { FaWhatsapp } from "react-icons/fa";
import { CONTACT, PHARMACY, QUICK_CONTACT } from "@/lib/constants";
import styles from "./FloatingWhatsApp.module.css";

// عنصر عائم ثابت الموضع (position:fixed) بدون أي تفاعل JS — الـhover
// وحركة التكبير كلها CSS بحت، فما في داعٍ لـ"use client" إطلاقًا
export default function FloatingWhatsApp() {
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    QUICK_CONTACT.floatingMessage
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label={`تواصل مع ${PHARMACY.name} عبر واتساب`}
    >
      <FaWhatsapp className={styles.icon} aria-hidden="true" />
    </a>
  );
}
