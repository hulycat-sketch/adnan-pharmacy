import Image from "next/image";
import Link from "next/link";
import { PHARMACY, IMAGES } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = PHARMACY.description;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            ثقة ورعاية منذ {PHARMACY.foundedYear}
          </span>

          <h1 id="hero-heading" className={styles.title}>
  رعايتكم الصحية
  <br />
  <span className={styles.highlight}>تبدأ من هنا</span>
</h1>

          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Link href="/#services" className={styles.ctaPrimary}>
              خدماتنا
            </Link>

            <Link href="/#insurance" className={styles.ctaSecondary}>
              شركات التأمين
            </Link>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.imageWrapper}>
            <Image
              src={IMAGES.hero}
              alt={`${PHARMACY.name} - داخل الصيدلية`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}