import Link from "next/link";
import { SERVICES } from "@/lib/constants";
// عدّلي المسار أعلاه ليطابق مكان constants.ts الفعلي عندك
//
// الشكل المتوقع لكل عنصر في SERVICES (عدّلي الحقول لتطابق تعريفك الفعلي):
// {
//   id: string;
//   title: string;
//   description: string;
//   icon: "products" | "insurance" | "consultation" | "vitals" | "skin";
//   href: string;
// }

import styles from "./Services.module.css";

type IconKey =
  | "products"
  | "insurance"
  | "consultation"
  | "vitals"
  | "skin"
  | "default";

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<IconKey, JSX.Element> = {
    products: (
      <path
        d="M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    insurance: (
      <path
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z M9.5 12l1.8 1.8L14.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    consultation: (
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="5.5"
          y="10.5"
          width="13"
          height="6"
          rx="3"
          transform="rotate(-40 12 13.5)"
          fill="none"
        />
        <line
          x1="10.6"
          y1="16.2"
          x2="13.4"
          y2="10.8"
          transform="rotate(-40 12 13.5)"
        />
      </g>
    ),
    vitals: (
      <path
        d="M3 12h3.2l1.8-3.2L10.5 15l2-6 1.7 3h5.8M16.8 6.4a2.6 2.6 0 0 0-4.3-1.4L12 5.5l-.5-.5a2.6 2.6 0 1 0-3.7 3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    skin: (
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="7.5" fill="none" />
        <circle cx="9.3" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="14.7" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
        <path d="M9 14.5c1 1 5 1 6 0" fill="none" strokeLinejoin="round" />
      </g>
    ),
    default: (
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  const path = icons[(name as IconKey) in icons ? (name as IconKey) : "default"];

  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      aria-hidden="true"
      className={styles.icon}
    >
      {path}
    </svg>
  );
}

export default function Services() {
  return (
    <section className={styles.services} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="services-heading" className={styles.title}>
            خدماتنا
          </h2>
          <span className={styles.underline} aria-hidden="true" />
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <ServiceIcon name={service.icon} />
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>

              <Link href={service.href} className={styles.cardLink}>
                المزيد
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className={styles.cardLinkIcon}
                >
                  <path
                    d="M19 12H5M5 12L11 6M5 12L11 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}