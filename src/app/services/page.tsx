import type { Metadata } from "next";
import {
  ShoppingBag,
  Shield,
  Pill,
  HeartPulse,
  ScanFace,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = generatePageMetadata({
  title: "خدماتنا",
  path: "/services",
});

const ICONS: Record<string, LucideIcon> = {
  ShoppingBag,
  Shield,
  Pill,
  HeartPulse,
  ScanFace,
};

function ServiceIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={styles.icon} width={28} height={28} aria-hidden="true" />;
}

export default function ServicesPage() {
  return (
    <section className={styles.page} aria-labelledby="all-services-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 id="all-services-heading" className={styles.title}>
            جميع خدماتنا
          </h1>
          <span className={styles.underline} aria-hidden="true" />
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <ServiceIcon name={service.icon} />
              </div>

              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardDescription}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
