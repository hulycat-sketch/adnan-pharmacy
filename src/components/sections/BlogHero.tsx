import { Search } from "lucide-react";
import { BLOG_SECTION } from "@/lib/constants";
import styles from "./BlogHero.module.css";

type BlogHeroProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="blog-hero-heading">
      <div className="container">
        <div className={styles.content}>
          <h1 id="blog-hero-heading" className={styles.title}>
            {BLOG_SECTION.title}
          </h1>
          <p className={styles.description}>{BLOG_SECTION.description}</p>

          <div className={styles.searchWrapper}>
            <Search width={18} height={18} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="ابحث عن مقال..."
              aria-label="ابحث عن مقال في المدونة"
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
