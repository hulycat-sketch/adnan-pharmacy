import { ShieldCheck } from "lucide-react";
import type { ArticleBlock } from "@/lib/blog";
import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

export default function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className={styles.body}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className={styles.paragraph}>
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2 key={index} className={styles.heading}>
                {block.text}
              </h2>
            );

          case "list":
            return (
              <ul key={index} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div key={index} className={styles.callout} role="note">
                <ShieldCheck width={20} height={20} className={styles.calloutIcon} aria-hidden="true" />
                <p className={styles.calloutText}>{block.text}</p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
