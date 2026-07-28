import Image from "next/image";
import Link from "next/link";
import { PHARMACY, HERO_SECTION, IMAGES, MAP } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = HERO_SECTION.description;

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
              quality={75}
              sizes="(max-width: 768px) calc(100vw - 20px), (max-width: 1023px) calc(42vw - 24px), (max-width: 1251px) calc(42vw - 62px), 464px"
              loading="eager"
              fetchPriority="high"
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
              رعايتكم الصحية{" "}
              <br />
              <span className={styles.highlight}>أولويتنا</span>
            </h1>

            <p className={styles.description}>{description}</p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.ctaPrimary}>
                تواصل معنا
              </Link>

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
