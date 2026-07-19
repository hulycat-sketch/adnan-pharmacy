import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { PHARMACY, IMAGES, CONTACT, SOCIAL, FOOTER_LINKS } from "@/lib/constants";
import styles from "./Footer.module.css";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.59-1.56h1.7V3.14C15.98 3.1 15.03 3 13.92 3c-2.32 0-3.92 1.42-3.92 4.02v2.58H7.24v3.2h2.76V21h3.5Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.logoCol}>
          <Image
            src={IMAGES.logoFooter}
            alt={`شعار ${PHARMACY.name}`}
            width={2400}
            height={1792}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>{PHARMACY.name}</span>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.heading}>
            روابط سريعة
            <span className={styles.headingUnderline} aria-hidden="true" />
          </h3>
          <ul className={styles.linksList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h3 className={styles.heading}>
            معلومات التواصل
            <span className={styles.headingUnderline} aria-hidden="true" />
          </h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin className={styles.contactIcon} width={20} height={20} aria-hidden="true" />
              <span className={styles.contactText}>
                {CONTACT.address}
                <br />
                {CONTACT.addressLandmark}
              </span>
            </li>

            <li>
              <Mail className={styles.contactIcon} width={20} height={20} aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className={styles.contactLink}>
                {CONTACT.email}
              </a>
            </li>

            <li>
              <Phone className={styles.contactIcon} width={20} height={20} aria-hidden="true" />
              <a href={`https://wa.me/${CONTACT.whatsapp}`} className={styles.contactLink}>
                <span className={styles.phoneNumber}>{CONTACT.whatsappDisplay}</span>
              </a>
            </li>
          </ul>

          <div className={styles.hoursBlock}>
            <h4 className={styles.subheading}>
              ساعات العمل
              <span className={styles.headingUnderline} aria-hidden="true" />
            </h4>
            <div className={styles.hoursList}>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>{CONTACT.workingHours.dailyLabel}</span>
                <span className={styles.hoursValue}>{CONTACT.workingHours.dailyValue}</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.hoursLabel}>{CONTACT.workingHours.closedLabel}</span>
                <span className={styles.hoursValue}>{CONTACT.workingHours.closedValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="صفحتنا على فيسبوك"
          >
            <FacebookIcon className={styles.socialIcon} />
          </a>

          <p className={styles.copyright}>
            © {year} {PHARMACY.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
