import { Calendar, Clock } from "lucide-react";
import styles from "./ArticleMeta.module.css";

type ArticleMetaProps = {
  date: string;
  readingTime: string;
};

export default function ArticleMeta({ date, readingTime }: ArticleMetaProps) {
  return (
    <ul className={styles.meta}>
      <li className={styles.metaItem}>
        <Calendar width={15} height={15} aria-hidden="true" />
        <span>{date}</span>
      </li>
      <li className={styles.metaItem}>
        <Clock width={15} height={15} aria-hidden="true" />
        <span>{readingTime}</span>
      </li>
    </ul>
  );
}
