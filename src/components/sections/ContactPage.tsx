import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaPhoneAlt, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { CONTACT, MAP, QUICK_CONTACT } from "@/lib/constants";
import styles from "./ContactPage.module.css";

// بطاقات "التواصل السريع" الثلاث — واتساب هو الخيار الأساسي (أول عنصر
// بالـDOM = أقصى اليمين بسياق RTL)، بأيقونات علامات تجارية حقيقية من
// react-icons بلون كل علامة الرسمي
const QUICK_ACTIONS = [
  {
    id:       "whatsapp",
    label:    "واتساب",
    helper:   "راسلنا مباشرة",
    icon:     FaWhatsapp,
    href:     `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(QUICK_CONTACT.whatsappMessage)}`,
    external: true,
    variant:  "whatsapp",
    primary:  true,
  },
  {
    id:       "call",
    label:    "اتصال هاتفي",
    helper:   "اتصل بنا الآن",
    icon:     FaPhoneAlt,
    href:     `tel:${CONTACT.phone}`,
    external: false,
    variant:  "phone",
    primary:  false,
  },
  {
    id:       "messenger",
    label:    "ماسنجر",
    helper:   "تواصل عبر ماسنجر",
    icon:     FaFacebookMessenger,
    href:     QUICK_CONTACT.messengerUrl,
    external: true,
    variant:  "messenger",
    primary:  false,
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
                className={`${styles.quickActionCard} ${action.primary ? styles.quickActionPrimary : ""}`}
              >
                <span
                  className={`${styles.quickActionIcon} ${styles[action.variant]}`}
                  aria-hidden="true"
                >
                  <Icon size={26} />
                </span>
                <span className={styles.quickActionText}>
                  <span className={styles.quickActionLabel}>{action.label}</span>
                  <span className={styles.quickActionHelper}>{action.helper}</span>
                </span>
              </a>
            );
          })}
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoColumn}>
            <h2 className={styles.infoHeading}>معلومات الصيدلية</h2>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.iconWrapper} aria-hidden="true">
                  <Phone width={19} height={19} className={styles.icon} />
                </span>
                <div>
                  <p className={styles.itemLabel}>رقم الهاتف</p>
                  <a href={`tel:${CONTACT.phone}`} className={styles.itemLink}>
                    <span className={styles.ltr}>{CONTACT.phoneDisplay}</span>
                  </a>
                </div>
              </li>

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

          <div className={styles.mapColumn}>
            <div className={styles.mapPreview}>
              <iframe
                src={MAP.embedUrl}
                title="خريطة موقع صيدلية عدنان"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapIframe}
                aria-hidden="true"
                tabIndex={-1}
              />
              <MapPin
                className={styles.mapPin}
                fill="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>

            <a
              href={MAP.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapButton}
            >
              <MapPin width={18} height={18} aria-hidden="true" />
              عرض الموقع على الخريطة
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
