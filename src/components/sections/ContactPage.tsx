import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, SOCIAL, MAP } from "@/lib/constants";
import styles from "./ContactPage.module.css";

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

        <div className={styles.card}>
          <a
            href={SOCIAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <MessageCircle width={20} height={20} aria-hidden="true" />
            تواصل معنا عبر واتساب
          </a>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <Phone width={19} height={19} className={styles.icon} />
              </span>
              <div>
                <p className={styles.itemLabel}>اتصال هاتفي</p>
                <a href={`tel:${CONTACT.phone}`} className={styles.itemLink}>
                  <span className={styles.phoneNumber}>{CONTACT.phoneDisplay}</span>
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
      </div>
    </section>
  );
}
