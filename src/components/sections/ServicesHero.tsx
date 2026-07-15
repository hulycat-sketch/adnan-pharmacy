import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  return (
    <section className={styles.hero} aria-labelledby="services-hero-heading">
      <div className="container">
        <div className={styles.content}>
          <h1 id="services-hero-heading" className={styles.title}>
            خدمات <span className={styles.highlight}>صُممت</span> لتلبية
            <br />
            احتياجاتكم الصحية
          </h1>

          <p className={styles.description}>
            من الاستشارات الصيدلانية المتخصصة والعناية بالبشرة، إلى المتابعة
            الصحية اليومية، نقدّم لكم في صيدلية عدنان رعايةً موثوقة بخبرة
            تمتد منذ عام 1981.
          </p>
        </div>
      </div>
    </section>
  );
}
