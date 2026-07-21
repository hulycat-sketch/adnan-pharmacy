import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import styles from "./ArticleBreadcrumb.module.css";

type ArticleBreadcrumbProps = {
  currentTitle: string;
};

export default function ArticleBreadcrumb({ currentTitle }: ArticleBreadcrumbProps) {
  return (
    <nav aria-label="مسار التصفح" className={styles.breadcrumb}>
      <ol className={styles.list}>
        <li>
          <Link href="/" className={styles.link}>
            الرئيسية
          </Link>
        </li>
        <li className={styles.separator} aria-hidden="true">
          <ChevronLeft width={14} height={14} />
        </li>
        <li>
          <Link href="/blog" className={styles.link}>
            المدونة
          </Link>
        </li>
        <li className={styles.separator} aria-hidden="true">
          <ChevronLeft width={14} height={14} />
        </li>
        <li className={styles.current} aria-current="page">
          {currentTitle}
        </li>
      </ol>
    </nav>
  );
}
