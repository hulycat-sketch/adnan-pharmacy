import { ABOUT_HERO } from "@/lib/constants";
import LeafDivider from "./LeafDivider";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <div className="container">
        <div className={styles.content}>
          <h1 id="about-hero-heading" className={styles.title}>
            {ABOUT_HERO.title}
          </h1>

          <LeafDivider />

          <p className={styles.subtitle}>{ABOUT_HERO.subtitle}</p>
          <p className={styles.intro}>{ABOUT_HERO.intro}</p>
        </div>
      </div>
    </section>
  );
}
