"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, Users, Pill, type LucideIcon } from "lucide-react";
import styles from "./AboutStoryCard.module.css";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Pill,
};

type AboutStoryCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  /** "contain" لما الصورة أبعادها مختلفة عن صندوق 4:3 وما بدنا نقصّ منها إطلاقًا */
  imageFit?: "cover" | "contain";
  caption?: string;
  badge?: string;
  icon?: string;
};

export default function AboutStoryCard({
  title,
  description,
  image,
  imageAlt,
  imagePosition,
  imageFit = "cover",
  caption,
  badge,
  icon,
}: AboutStoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = icon ? ICONS[icon] : null;

  useEffect(() => {
    const node = cardRef.current;
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

  const cardClassName = [styles.card, isVisible ? styles.visible : ""]
    .filter(Boolean)
    .join(" ");

  const rowClassName = [
    styles.row,
    imagePosition === "left" ? styles.imageLeft : styles.imageRight,
  ].join(" ");

  return (
    <div ref={cardRef} className={cardClassName}>
      <div className={rowClassName}>
        <div className={styles.imageCol}>
          <div
            className={[styles.imageWrapper, imageFit === "contain" ? styles.imageWrapperContain : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              quality={90}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={styles.image}
              style={{ objectFit: imageFit }}
            />
          </div>
          {caption && <p className={styles.caption}>{caption}</p>}
        </div>

        <div className={styles.content}>
          {badge && (
            <span className={styles.badge}>
              <Calendar width={14} height={14} aria-hidden="true" />
              {badge}
            </span>
          )}

          {Icon && (
            <span className={styles.iconCircle} aria-hidden="true">
              <Icon width={20} height={20} />
            </span>
          )}

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
