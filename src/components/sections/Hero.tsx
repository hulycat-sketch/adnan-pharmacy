import { getImageProps } from "next/image";
import { PHARMACY, IMAGES, SOCIAL, MAP } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = PHARMACY.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  // Art Direction: صورة مخصّصة للموبايل عن الـDesktop عبر <picture> الطبيعي
  // بالمتصفح — يضمن تحميل صورة واحدة فقط حسب عرض الشاشة، بدل تحميل
  // الاثنتين ثم إخفاء واحدة بـCSS.
  const {
    props: { srcSet: heroMobileSrcSet },
  } = getImageProps({
    alt: heroAlt,
    src: IMAGES.heroMobile,
    width: 1536,
    height: 1024,
    quality: 82,
    sizes: "100vw",
    priority: true,
  });

  const { props: heroDesktopImgProps } = getImageProps({
    alt: heroAlt,
    src: IMAGES.hero,
    width: 1536,
    height: 1024,
    quality: 82,
    sizes: "(max-width: 1024px) 100vw, 50vw",
    priority: true,
  });

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

        <div className={styles.media}>
          <div className={styles.decor} aria-hidden="true">
            <span className={styles.capsuleAccent} />
            <span className={styles.ring} />
            <span className={styles.groundShadow} />
            <span className={styles.platform} />
          </div>

          <div className={styles.imageWrapper}>
            <picture className={styles.picture}>
              <source media="(max-width: 768px)" srcSet={heroMobileSrcSet} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img {...heroDesktopImgProps} className={styles.image} />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}