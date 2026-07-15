import { Sparkles } from "lucide-react";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-heading">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          {/* Placeholder مؤقت — يُستبدل لاحقًا بصورة حقيقية عبر next/image */}
          <div className={styles.placeholder} aria-hidden="true">
            <Sparkles className={styles.placeholderIcon} width={48} height={48} />
          </div>
        </div>

        <div className={styles.content}>
          <h1 id="services-hero-heading" className={styles.title}>
            خدمات صُممت لتلبية احتياجاتكم الصحية
          </h1>

          <p className={styles.description}>
            من الاستشارات الصيدلانية وخدمات العناية بالبشرة والشعر، إلى
            الفحوصات الصحية اليومية، نقدّم لكم رعاية موثوقة بخبرة تمتد منذ عام
            1981.
          </p>

          {/* بدون رابط مؤقتًا — سيُربط لاحقًا بقسم الخدمات عند إضافته */}
          <button type="button" className={styles.cta}>
            استكشف الخدمات
          </button>
        </div>
      </div>
    </section>
  );
}
