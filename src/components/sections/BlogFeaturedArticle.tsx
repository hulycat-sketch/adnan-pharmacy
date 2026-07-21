import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BlogArticle } from "@/lib/blog";
import { getCategoryById } from "@/lib/blog";
import CategoryBadge from "./CategoryBadge";
import ArticleMeta from "./ArticleMeta";
import styles from "./BlogFeaturedArticle.module.css";

type BlogFeaturedArticleProps = {
  article: BlogArticle;
};

export default function BlogFeaturedArticle({ article }: BlogFeaturedArticleProps) {
  const category = getCategoryById(article.category);

  return (
    <Link href={`/blog/${article.slug}`} className={styles.card} aria-label={article.title}>
      <span className={styles.eyebrow}>مقال مميز</span>

      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            quality={90}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          {category && <CategoryBadge label={category.label} />}
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <ArticleMeta date={article.publishedAt} readingTime={article.readingTime} />

          <span className={styles.readMore}>
            اقرأ المقال
            <ArrowLeft width={16} height={16} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
