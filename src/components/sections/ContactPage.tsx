import { Mail, MapPin, Clock } from "lucide-react";
import { FaPhoneAlt, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { CONTACT, MAP, QUICK_CONTACT } from "@/lib/constants";
import styles from "./ContactPage.module.css";

// بطاقات "التواصل السريع" الثلاث — أيقونات علامات تجارية حقيقية من
// react-icons، كل وحدة بلونها الرسمي الخاص (شوفي variant جوا CSS)
const QUICK_ACTIONS = [
  {
    id:       "call",
    label:    "اتصال مباشر",
    icon:     FaPhoneAlt,
    href:     `tel:${CONTACT.phone}`,
    external: false,
    variant:  "phone",
  },
  {
    id:       "whatsapp",
    label:    "واتساب",
    icon:     FaWhatsapp,
    href:     `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(QUICK_CONTACT.whatsappMessage)}`,
    external: true,
    variant:  "whatsapp",
  },
  {
    id:       "messenger",
    label:    "ماسنجر",
    icon:     FaFacebookMessenger,
    href:     QUICK_CONTACT.messengerUrl,
    external: true,
    variant:  "messenger",
  },
] as const;

export default function ContactPage() {
  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className="container">
        <div className={styles.header}>
          <h1 id="contact-heading" className={styles.title}>
            تواصل معنا
          </h1>
          <p className={styles.subtitle}>يسعدنا تواصلكم معنا عبر أي من الطرق التالية.</p>
        </div>

        <div className={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.id}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={styles.quickActionCard}
              >
                <span
                  className={`${styles.quickActionIcon} ${styles[action.variant]}`}
                  aria-hidden="true"
                >
                  <Icon size={40} />
                </span>
                <span className={styles.quickActionLabel}>{action.label}</span>
              </a>
            );
          })}
        </div>

        <div className={styles.card}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <Mail width={19} height={19} className={styles.icon} />
              </span>
              <div>
                <p className={styles.itemLabel}>البريد الإلكتروني</p>
                <a href={`mailto:${CONTACT.email}`} className={styles.itemLink}>
                  {CONTACT.email}
                </a>
              </div>
            </li>

            <li className={styles.listItem}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <MapPin width={19} height={19} className={styles.icon} />
              </span>
              <div>
                <p className={styles.itemLabel}>العنوان</p>
                <a
                  href={MAP.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.itemLink}
                >
                  {CONTACT.addressFull}
                </a>
              </div>
            </li>

            <li className={styles.listItem}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <Clock width={19} height={19} className={styles.icon} />
              </span>
              <div>
                <p className={styles.itemLabel}>ساعات العمل</p>
                <p className={styles.itemText}>
                  {CONTACT.workingHours.dailyLabel} {CONTACT.workingHours.dailyValue}
                  <br />
                  {CONTACT.workingHours.closedLabel} {CONTACT.workingHours.closedValue}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
