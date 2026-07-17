import styles from "./AboutHero.module.css";

function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15 250 C 50 200, 40 150, 80 110 C 105 85, 110 50, 118 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g transform="translate(55,190) rotate(-35)">
        <path d="M0,0 Q16,-20 34,0 Q16,20 0,0 Z" fill="currentColor" />
      </g>
      <g transform="translate(70,155) rotate(35)">
        <path d="M0,0 Q14,-18 30,0 Q14,18 0,0 Z" fill="currentColor" />
      </g>
      <g transform="translate(90,120) rotate(-30)">
        <path d="M0,0 Q12,-15 26,0 Q12,15 0,0 Z" fill="currentColor" />
      </g>
      <g transform="translate(103,85) rotate(30)">
        <path d="M0,0 Q10,-13 22,0 Q10,13 0,0 Z" fill="currentColor" />
      </g>
      <g transform="translate(112,50) rotate(-25)">
        <path d="M0,0 Q8,-10 18,0 Q8,10 0,0 Z" fill="currentColor" />
      </g>
      <circle cx="25" cy="230" r="3" fill="currentColor" />
      <circle cx="45" cy="170" r="2.5" fill="currentColor" />
      <circle cx="95" cy="70" r="2" fill="currentColor" />
    </svg>
  );
}

export default function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <BotanicalBranch className={styles.branchTopLeft} />
      <BotanicalBranch className={styles.branchBottomRight} />

      <div className="container">
        <div className={styles.content}>
          <h1 id="about-hero-heading" className={styles.title}>
            قصتنا
          </h1>

          <span className={styles.divider} aria-hidden="true">
            <span className={styles.dividerLine} />
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.dividerLeaf}
            >
              <path d="M12 22C12 22 4 18 4 10C4 6 7 3 12 3C17 3 20 6 20 10C20 18 12 22 12 22Z" />
              <path d="M12 3V22" />
            </svg>
            <span className={styles.dividerLine} />
          </span>

          <p className={styles.description}>ثقة تمتد عبر الأجيال</p>
        </div>
      </div>
    </section>
  );
}
