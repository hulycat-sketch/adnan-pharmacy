"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PHARMACY, HERO_SECTION, IMAGES, SOCIAL, MAP } from "@/lib/constants";
import styles from "./Hero.module.css";

export default function Hero() {
  const description = HERO_SECTION.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // نفس نظام الحركة المستخدم بقسم "لماذا صيدلية عدنان" — IntersectionObserver
  // يشتغل مرة وحدة بس، وموبايل فقط (شوفي Hero.module.css) — الديسكتوب
  // والتابلت ما بيتأثروا إطلاقًا
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sectionClassName = `${styles.hero} ${isVisible ? styles.visible : ""}`;

  return (
    <section ref={sectionRef} className={sectionClassName} aria-labelledby="hero-heading">
      {/* بدون JavaScript ما في IntersectionObserver يشتغل، فهاد الفولباك
          بيفرض ظهور العنوان/الوصف فورًا بدل ما تضل مخفية للأبد */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.description} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

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
              رعايتكم الصحية{" "}
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
