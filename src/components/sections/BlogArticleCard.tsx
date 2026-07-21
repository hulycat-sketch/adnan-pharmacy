import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import { getCategoryById } from "@/lib/blog";
import CategoryBadge from "./CategoryBadge";
import ArticleMeta from "./ArticleMeta";
import styles from "./BlogArticleCard.module.css";

type BlogArticleCardProps = {
  article: BlogArticle;
};

export default function BlogArticleCard({ article }: BlogArticleCardProps) {
  const category = getCategoryById(article.category);

  return (
    <Link href={`/blog/${article.slug}`} className={styles.card} aria-label={article.title}>
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
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <ArticleMeta date={article.publishedAt} readingTime={article.readingTime} />
      </div>
    </Link>
  );
}
