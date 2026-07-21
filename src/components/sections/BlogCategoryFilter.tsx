import { BLOG_ALL_CATEGORY_ID, BLOG_CATEGORIES } from "@/lib/blog";
import styles from "./BlogCategoryFilter.module.css";

type BlogCategoryFilterProps = {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
};

export default function BlogCategoryFilter({
  activeCategory,
  onCategoryChange,
}: BlogCategoryFilterProps) {
  const chips = [{ id: BLOG_ALL_CATEGORY_ID, label: "الكل" }, ...BLOG_CATEGORIES];

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.scroller}
        role="group"
        aria-label="تصفية المقالات حسب التصنيف"
      >
        {chips.map((chip) => {
          const isActive = chip.id === activeCategory;

          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={isActive}
              className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
              onClick={() => onCategoryChange(chip.id)}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
