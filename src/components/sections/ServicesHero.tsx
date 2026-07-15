import Image from "next/image";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-heading">
      <div className="container">
        <div className={styles.frame}>
          <Image
            src="/images/services/services2-hero.png"
            alt="منتجات العناية الصحية والبشرة في صيدلية عدنان"
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1152px"
            priority
            className={styles.image}
          />

          <div className={styles.overlay} aria-hidden="true" />

          <div className={styles.content}>
            <h1 id="services-hero-heading" className={styles.title}>
              خدمات <span className={styles.highlight}>صُممت</span> لتلبية
              <br />
              احتياجاتكم الصحية
            </h1>

            <p className={styles.description}>
              من الاستشارات الصيدلانية وخدمات العناية بالبشرة والشعر، إلى
              الفحوصات الصحية اليومية، نقدّم لكم رعاية موثوقة بخبرة تمتد منذ
              عام 1981.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
