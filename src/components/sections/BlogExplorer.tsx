"use client";

import { useMemo, useState } from "react";
import {
  BLOG_ALL_CATEGORY_ID,
  BLOG_ARTICLES,
  getFeaturedArticle,
} from "@/lib/blog";
import BlogHero from "./BlogHero";
import BlogCategoryFilter from "./BlogCategoryFilter";
import BlogFeaturedArticle from "./BlogFeaturedArticle";
import BlogArticleGrid from "./BlogArticleGrid";
import BlogEmptyState from "./BlogEmptyState";
import styles from "./BlogExplorer.module.css";

export default function BlogExplorer() {
  const [activeCategory, setActiveCategory] = useState(BLOG_ALL_CATEGORY_ID);
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = getFeaturedArticle();
  const isDefaultView = activeCategory === BLOG_ALL_CATEGORY_ID && searchQuery.trim() === "";

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim();

    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === BLOG_ALL_CATEGORY_ID || article.category === activeCategory;
      const matchesQuery =
        query === "" ||
        article.title.includes(query) ||
        article.excerpt.includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const gridArticles = isDefaultView
    ? filteredArticles.filter((article) => article.slug !== featuredArticle?.slug)
    : filteredArticles;

  const handleReset = () => {
    setActiveCategory(BLOG_ALL_CATEGORY_ID);
    setSearchQuery("");
  };

  return (
    <>
      <BlogHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <BlogCategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className={styles.section} aria-labelledby="blog-articles-heading">
        <div className="container">
          {isDefaultView && featuredArticle && (
            <div className={styles.featuredWrap}>
              <BlogFeaturedArticle article={featuredArticle} />
            </div>
          )}

          <h2 id="blog-articles-heading" className={styles.heading}>
            أحدث المقالات
          </h2>

          {gridArticles.length > 0 ? (
            <BlogArticleGrid articles={gridArticles} />
          ) : (
            <BlogEmptyState onReset={handleReset} />
          )}
        </div>
      </section>
    </>
  );
}
