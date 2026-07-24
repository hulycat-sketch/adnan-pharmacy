import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { generatePageMetadata, generateArticleSchema, generateFaqSchema } from "@/lib/metadata";
import {
  BLOG_ARTICLES,
  getArticleBySlug,
  getCategoryById,
} from "@/lib/blog";
import ArticleBreadcrumb from "@/components/sections/ArticleBreadcrumb";
import CategoryBadge from "@/components/sections/CategoryBadge";
import ArticleMeta from "@/components/sections/ArticleMeta";
import ArticleBody from "@/components/sections/ArticleBody";
import BlogConsultationCta from "@/components/sections/BlogConsultationCta";
import styles from "./page.module.css";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return generatePageMetadata({ title: "المدونة الصحية", path: "/blog" });
  }

  return generatePageMetadata({
    title:       article.seoTitle ?? article.title,
    description: article.excerpt,
    path:        `/blog/${article.slug}`,
    image:       article.image,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryById(article.category);
  const articleSchema = generateArticleSchema(article);
  const faqSchema = generateFaqSchema(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article>
        <div className="container">
          <ArticleBreadcrumb currentTitle={article.title} />

          <header className={styles.header}>
            {category && <CategoryBadge label={category.label} />}
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.intro}>{article.excerpt}</p>
            <ArticleMeta date={article.publishedAt} readingTime={article.readingTime} />
          </header>

          <div className={styles.imageWrapper}>
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              quality={90}
              priority
              sizes="(max-width: 1023px) 100vw, 768px"
              className={styles.image}
            />
          </div>

          <ArticleBody blocks={article.body} />
        </div>
      </article>

      <BlogConsultationCta />
    </>
  );
}
