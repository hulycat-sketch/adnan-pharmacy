import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { PHARMACY, HERO_SECTION, MAP, ABOUT_LEGACY } from "@/lib/constants";
import PharmacyStatusItem from "./PharmacyStatusItem";
import styles from "./Hero.module.css";

const LOCATION_FACT = ABOUT_LEGACY.facts[2];

export default function Hero() {
  const description = HERO_SECTION.description;

  const heroAlt = `واجهة ${PHARMACY.name} من الخارج`;

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroCard}>
          {/* صورة الموبايل — نفس صورة الديسكتوب الجديدة (أفقية، واجهة الشارع)
              بقصّة عريضة مختلفة عبر CSS فقط (aspect-ratio + object-position
              مختلفين بالقاعدة الأساسية غير المشروطة بـmedia query). عنصر
              صورة منفصل عن صورة الديسكتوب — نفس الملف، بس sizes مختلف لكل
              وحدة حتى ما يصير أي تحميل حقيقي مكرر: هاي بترجع قيمة ضئيلة
              (1px) عند 768px فما فوق، وصورة الديسكتوب برجع نفس الشي تحت
              768px */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/Adnan_Pharmacy_storefront_building_final.png"
                alt={heroAlt}
                fill
                quality={75}
                sizes="(max-width: 767px) calc(100vw - 0px), 1px"
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
                src="/images/Adnan_Pharmacy_storefront_building_final.png"
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
        </div>
      </section>

      {/* شريط معلومات عائم — جسر بصري بين الـHero وقسم "خدماتنا"، ديسكتوب
          فقط (768px فما فوق). خارج قسم الـHero عمدًا (مش جوا heroCard) —
          overflow:hidden على heroCard/hero ضروري لقصّ الصورة full-bleed
          وأقواس الخلفية الزخرفية، فلو ضل الشريط جواهم كان رح ينقصّ لما
          نحطه يمتد تحت حدود الـHero.
          العنصر الأول (حالة المفتوح/المغلق) عنصر عميل منفصل (PharmacyStatusItem)
          بيحسب الوقت الفعلي بتوقيت الأردن — باقي الـHero يضل Server Component
          عادي. العنصر التاني نص Hero-specific (مش من ABOUT_LEGACY). العنصر
          الثالث (الموقع) لسا معاد استخدامه حرفيًا من ABOUT_LEGACY.facts نفس
          المصدر المستخدم بصفحة "نبذة عنا" */}
      <div className={styles.infoStripBridge}>
        <div className={styles.infoStrip}>
          <ul className={styles.infoList}>
            <PharmacyStatusItem />

            <li className={styles.infoItem}>
              <span className={styles.infoIconWrap} aria-hidden="true">
                <Clock width={18} height={18} strokeWidth={2} className={styles.infoIcon} />
              </span>
              <span className={styles.infoText}>
                <span className={styles.infoValue}>+40 سنة</span>
                <span className={styles.infoLabel}>في خدمة أهالي إربد</span>
              </span>
            </li>

            <li className={styles.infoItem}>
              <span className={styles.infoIconWrap} aria-hidden="true">
                <MapPin width={18} height={18} strokeWidth={2} className={styles.infoIcon} />
              </span>
              <span className={styles.infoText}>
                <span className={styles.infoValue}>{LOCATION_FACT.value}</span>
                <span className={styles.infoLabel}>بالقرب من البوابة الشمالية لجامعة اليرموك</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
