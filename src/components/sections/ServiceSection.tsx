"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
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

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
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
