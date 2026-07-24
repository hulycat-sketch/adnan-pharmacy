import { SearchX } from "lucide-react";
import styles from "./BlogEmptyState.module.css";

type BlogEmptyStateProps = {
  onReset: () => void;
};

export default function BlogEmptyState({ onReset }: BlogEmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.iconCircle} aria-hidden="true">
        <SearchX width={26} height={26} strokeWidth={1.75} />
      </span>
      <p className={styles.title}>لم يتم العثور على مقالات مطابقة.</p>
      <p className={styles.description}>
        جرّب كلمة مختلفة أو استعرض جميع المقالات.
      </p>
      <button type="button" className={styles.resetBtn} onClick={onReset}>
        عرض جميع المقالات
      </button>
    </div>
  );
}
