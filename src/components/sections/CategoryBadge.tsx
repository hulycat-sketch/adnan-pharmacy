import styles from "./CategoryBadge.module.css";

type CategoryBadgeProps = {
  label: string;
};

export default function CategoryBadge({ label }: CategoryBadgeProps) {
  return <span className={styles.badge}>{label}</span>;
}
