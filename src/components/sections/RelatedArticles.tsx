import type { BlogArticle } from "@/lib/blog";
import BlogArticleGrid from "./BlogArticleGrid";
import styles from "./RelatedArticles.module.css";

type RelatedArticlesProps = {
  articles: BlogArticle[];
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="related-articles-heading">
      <div className="container">
        <h2 id="related-articles-heading" className={styles.heading}>
          مقالات ذات صلة
        </h2>
        <BlogArticleGrid articles={articles} />
      </div>
    </section>
  );
}
