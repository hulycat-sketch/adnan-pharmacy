import { Stethoscope } from "lucide-react";
import { BLOG_CONSULTATION, SOCIAL } from "@/lib/constants";
import styles from "./BlogConsultationCta.module.css";

export default function BlogConsultationCta() {
  return (
    <section className={styles.section} aria-labelledby="blog-consultation-heading">
      <div className="container">
        <div className={styles.card}>
          <span className={styles.iconCircle} aria-hidden="true">
            <Stethoscope width={26} height={26} strokeWidth={1.75} />
          </span>

          <h2 id="blog-consultation-heading" className={styles.title}>
            {BLOG_CONSULTATION.title}
          </h2>
          <p className={styles.description}>{BLOG_CONSULTATION.description}</p>

          <a
            href={SOCIAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            تواصلوا معنا
          </a>
        </div>
      </div>
    </section>
  );
}
