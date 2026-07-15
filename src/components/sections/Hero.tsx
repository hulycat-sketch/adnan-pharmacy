import Image from "next/image";
import { PHARMACY, IMAGES, SOCIAL, MAP } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = PHARMACY.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroCard}>
        <div className={styles.media}>
          <div className={styles.decor} aria-hidden="true">
            <span className={styles.capsuleAccent} />
            <span className={styles.ring} />
            <span className={styles.groundShadow} />
            <span className={styles.platform} />
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={IMAGES.hero}
              alt={heroAlt}
              width={1659}
              height={948}
              quality={90}
              sizes="100vw"
              priority
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              ثقة ورعاية منذ {PHARMACY.foundedYear}
            </span>

            <div className={styles.contentTop}>
              <h1 id="hero-heading" className={styles.title}>
    رعايتكم الصحية
    <br />
    <span className={styles.highlight}>أولويتنا</span>
  </h1>

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

            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}