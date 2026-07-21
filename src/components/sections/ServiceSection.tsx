"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Check } from "lucide-react";
import styles from "./ServiceSection.module.css";

type ServiceSectionProps = {
  title: string;
  description: string;
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  firstAfterHero?: boolean;
  lastBeforeMarquee?: boolean;
  cta?: { label: string; href: string };
  /** شارة صغيرة فوق العنوان (متل سنة) — اختياري */
  badge?: string;
  /** تعليق صغير تحت الصورة مباشرة — اختياري */
  caption?: string;
  /** عنوان أصغر شوي على الموبايل فقط — لعناوين طويلة بتنكسر لأكتر من سطرين */
  compactTitle?: boolean;
  /**
   * تعرض الصورة بأبعادها الطبيعية (width/height حقيقيين، بدون fill ولا
   * صندوق نسبة ثابتة) — width:100%/height:auto فبتبين كاملة بدون أي قصّ.
   * لازم تنعطى imageWidth/imageHeight (أبعاد الملف الأصلية) معها.
   */
  imageNatural?: boolean;
  imageWidth?: number;
  imageHeight?: number;
};

export default function ServiceSection({
  title,
  description,
  bullets,
  image,
  imageAlt,
  imagePosition,
  firstAfterHero,
  lastBeforeMarquee,
  cta,
  badge,
  caption,
  compactTitle,
  imageNatural,
  imageWidth,
  imageHeight,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const rowClassName = [
    styles.row,
    imagePosition === "left" ? styles.imageLeft : styles.imageRight,
    isVisible ? styles.visible : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sectionClassName = [
    styles.section,
    firstAfterHero ? styles.firstAfterHero : "",
    lastBeforeMarquee ? styles.lastBeforeMarquee : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className={`container ${rowClassName}`}>
        {imageNatural ? (
          <div className={`${styles.imageCol} ${styles.imageColNatural}`}>
            <Image
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              quality={90}
              sizes="(max-width: 1023px) 100vw, 42vw"
              className={styles.imageNatural}
            />
          </div>
        ) : (
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
            {caption && <p className={styles.caption}>{caption}</p>}
          </div>
        )}

        <div className={styles.content}>
          {badge && (
            <span className={styles.badge}>
              <Calendar width={14} height={14} aria-hidden="true" />
              {badge}
            </span>
          )}

          <h2 className={`${styles.title} ${compactTitle ? styles.titleCompact : ""}`}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>

          {bullets && bullets.length > 0 && (
            <ul className={styles.bullets}>
              {bullets.map((bullet) => (
                <li key={bullet} className={styles.bulletItem}>
                  <Check className={styles.bulletIcon} width={18} height={18} aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {cta && (
            <Link href={cta.href} className={styles.ctaBtn}>
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
