"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getCategoryById, type BlogArticle } from "@/lib/blog";
import { LATEST_ARTICLES_SECTION } from "@/lib/constants";
import CategoryBadge from "./CategoryBadge";
import styles from "./LatestArticles.module.css";

// 3 مقالات مختارة يدويًا فقط (LATEST_ARTICLES_SECTION.slugs) — نفس بيانات
// src/lib/blog.ts المستخدمة بصفحة /blog تمامًا، بدون أي تكرار أو نسخ نص
const articles = LATEST_ARTICLES_SECTION.slugs
  .map((slug) => getArticleBySlug(slug))
  .filter((article): article is BlogArticle => Boolean(article));

export default function LatestArticles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // نفس نظام حركة الدخول المستخدم بباقي أقسام الصفحة الرئيسية (Insurance
  // مثلًا) — يشتغل مرة وحدة بس أول ما القسم يبين عالشاشة
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

  if (articles.length === 0) return null;

  const sectionClassName = `${styles.latestArticles} ${isVisible ? styles.visible : ""}`;

  return (
    <section ref={sectionRef} className={sectionClassName} aria-labelledby="latest-articles-heading">
      {/* بدون JavaScript ما في IntersectionObserver يشتغل، فهاد الفولباك
          بيفرض ظهور العنوان/الوصف فورًا بدل ما تضل مخفية للأبد */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.subtitle} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="latest-articles-heading" className={styles.title}>
            {LATEST_ARTICLES_SECTION.title}
          </h2>
          <span className={styles.underline} aria-hidden="true" />
          <p className={styles.subtitle}>{LATEST_ARTICLES_SECTION.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => {
            const category = getCategoryById(article.category);

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={styles.card}
                aria-label={article.title}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  {category && <CategoryBadge label={category.label} />}
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <span className={styles.readMore}>
                    اقرأ المقال
                    <ArrowLeft width={16} height={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.ctaWrap}>
          <Link href="/blog" className={styles.ctaBtn}>
            عرض جميع المقالات
            <ArrowLeft width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
