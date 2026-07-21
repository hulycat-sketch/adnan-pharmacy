import type { BlogArticle } from "@/lib/blog";
import BlogArticleCard from "./BlogArticleCard";
import styles from "./BlogArticleGrid.module.css";

type BlogArticleGridProps = {
  articles: BlogArticle[];
};

export default function BlogArticleGrid({ articles }: BlogArticleGridProps) {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <BlogArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
