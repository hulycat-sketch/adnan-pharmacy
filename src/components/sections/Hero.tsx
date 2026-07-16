import Image from "next/image";
import { PHARMACY, IMAGES, SOCIAL, MAP } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = PHARMACY.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroCard}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={IMAGES.hero}
              alt={heroAlt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1023px) 52vw, 56vw"
              priority
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.contentCol}>
          <div className={styles.content}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              ثقة ورعاية منذ {PHARMACY.foundedYear}
            </span>

            <h1 id="hero-heading" className={styles.title}>
              رعايتكم الصحية
              <br />
              <span className={styles.highlight}>أولويتنا</span>
            </h1>

            <p className={styles.description}>{description}</p>

            <div className={styles.actions}>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                تواصل معنا
              </a>

              <a
                href={MAP.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                موقعنا
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
