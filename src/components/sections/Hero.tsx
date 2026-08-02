import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, type LucideIcon } from "lucide-react";
import { PHARMACY, HERO_SECTION, IMAGES, MAP, ABOUT_LEGACY } from "@/lib/constants";
import styles from "./Hero.module.css";

const ICONS: Record<string, LucideIcon> = {
  Calendar,
  Clock,
  MapPin,
};

export default function Hero() {
  const description = HERO_SECTION.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroCard}>
        {/* صورة الموبايل (مربّعة) — بدون أي تغيير، نفس الأصل الأصلي. مخفية
            بالكامل عند 768px فما فوق، وsizes بترجع قيمة ضئيلة (1px) هناك
            حتى لو انطلب تحميلها (eager) ما تاخد إلا أصغر نسخة ممكنة */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={IMAGES.hero}
              alt={heroAlt}
              fill
              quality={75}
              sizes="(max-width: 767px) calc(100vw - 20px), 1px"
              loading="eager"
              fetchPriority="high"
              className={styles.image}
            />
          </div>
        </div>

        {/* صورة الديسكتوب (أفقية، واجهة الشارع) — full-bleed بعرض الشاشة
            الكامل هلق، عنصر صورة منفصل مخفي بالكامل تحت 768px، وsizes
            بترجع قيمة ضئيلة (1px) هناك بنفس المنطق. أصل حقيقي جديد أضافه
            المستخدم، بدون أي تعديل عليه */}
        <div className={styles.imageColDesktop}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Adnan_Pharmacy_storefront_building.jpeg"
              alt={heroAlt}
              fill
              quality={75}
              sizes="(min-width: 768px) calc(100vw - 0px), 1px"
              loading="eager"
              fetchPriority="high"
              className={styles.image}
            />
          </div>
        </div>

        {/* تحسين قابلية القراءة على الديسكتوب فقط (768px فما فوق) — تدرّج
            أبيض خفيف من جهة النص (يمين RTL) بدون أي تعتيم أزرق/داكن على
            الصورة نفسها. لا يحتوي أي صورة، فما في خطر تحميل مكرر */}
        <div className={styles.gradientOverlay} aria-hidden="true" />

        <div className={styles.contentCol}>
          <div className={styles.content}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              ثقة ورعاية منذ {PHARMACY.foundedYear}
            </span>

            <h1 id="hero-heading" className={styles.title}>
              رعايتكم الصحية{" "}
              <br />
              <span className={styles.highlight}>أولويتنا</span>
            </h1>

            <p className={styles.description}>{description}</p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.ctaPrimary}>
                تواصل معنا
              </Link>

              <a
                href={MAP.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                موقعنا
              </a>
            </div>
          </div>
        </div>

        {/* شريط معلومات عائم — ديسكتوب فقط (768px فما فوق). البيانات الثلاث
            هون معاد استخدامها حرفيًا من ABOUT_LEGACY.facts (نفس المصدر
            المستخدم بصفحة "نبذة عنا")، مش نص مُخترَع أو حالة "مفتوح الآن"
            حيّة غير موثّقة بالمشروع */}
        <div className={styles.infoStrip}>
          <ul className={styles.infoList}>
            {ABOUT_LEGACY.facts.map((fact) => {
              const Icon = ICONS[fact.icon];
              return (
                <li key={fact.label} className={styles.infoItem}>
                  <span className={styles.infoIconWrap} aria-hidden="true">
                    <Icon width={18} height={18} strokeWidth={2} className={styles.infoIcon} />
                  </span>
                  <span className={styles.infoText}>
                    <span className={styles.infoValue}>{fact.value}</span>
                    <span className={styles.infoLabel}>{fact.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
