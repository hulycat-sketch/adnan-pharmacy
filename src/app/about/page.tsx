import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ABOUT_STORY_CARDS } from "@/lib/constants";
import AboutHero from "@/components/sections/AboutHero";
import AboutStoryCard from "@/components/sections/AboutStoryCard";
import styles from "./page.module.css";

export const metadata: Metadata = generatePageMetadata({
  title: "نبذة عنا",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className={styles.storySection}>
        <div className={`container ${styles.storyList}`}>
          {ABOUT_STORY_CARDS.map((card) => (
            <AboutStoryCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              imageAlt={card.title}
              imagePosition={card.imagePosition}
              imageFit={"imageFit" in card ? card.imageFit : undefined}
              caption={"caption" in card ? card.caption : undefined}
              badge={"badge" in card ? card.badge : undefined}
              icon={"icon" in card ? card.icon : undefined}
            />
          ))}
        </div>
      </section>
    </>
  );
}
