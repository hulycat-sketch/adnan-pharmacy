import Link from "next/link";
import { Info, ShieldCheck } from "lucide-react";
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
                {typeof block.text === "string"
                  ? block.text
                  : block.text.map((run, runIndex) => {
                      if (typeof run === "string") return run;

                      if ("external" in run && run.external) {
                        return (
                          <a
                            key={runIndex}
                            href={run.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.inlineLink}
                            aria-label={`${run.text} (يفتح في نافذة جديدة)`}
                          >
                            {run.text}
                          </a>
                        );
                      }

                      return (
                        <Link key={runIndex} href={run.href} className={styles.inlineLink}>
                          {run.text}
                        </Link>
                      );
                    })}
              </p>
            );

          case "heading":
            return (
              <h2 key={index} className={styles.heading}>
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3 key={index} className={styles.subheading}>
                {block.text}
              </h3>
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
                <div>
                  {block.title && <p className={styles.calloutTitle}>{block.title}</p>}
                  <p className={styles.calloutText}>{block.text}</p>
                </div>
              </div>
            );

          case "table":
            return (
              <div key={index}>
                <p className={styles.tableHint}>← اسحب الجدول أفقيًا لعرض جميع الأعمدة</p>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {block.headers.map((header) => (
                          <th key={header} scope="col">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case "faq":
            return (
              <div key={index} className={styles.faq}>
                {block.items.map((item) => (
                  <div key={item.question} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{item.question}</h3>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </div>
                ))}
              </div>
            );

          case "disclaimer":
            return (
              <div key={index} className={styles.disclaimer} role="note">
                <Info width={18} height={18} className={styles.disclaimerIcon} aria-hidden="true" />
                <p className={styles.disclaimerText}>{block.text}</p>
              </div>
            );

          case "sourceList":
            return (
              <ul key={index} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item.href} className={styles.listItem}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineLink}
                      aria-label={`${item.label} (يفتح في نافذة جديدة)`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
