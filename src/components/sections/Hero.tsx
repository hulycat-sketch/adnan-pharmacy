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
          {/* صورة الموبايل — أصل مستقل تمامًا عن صورة الديسكتوب (تصوير
              عمودي/portrait حقيقي للواجهة، اللافتة كاملة من الأعلى للأسفل
              بدون أي قصّ). نسبة aspect-ratio القاعدة الأساسية مطابقة
              لأبعاد الصورة الحقيقية بالضبط (703×823) فما في أي قصّ فعلي —
              object-fit:cover هون مجرد إجراء احترازي قياسي. sizes بترجع
              قيمة ضئيلة (1px) عند 768px فما فوق حتى ما يصير أي تحميل غير
              ضروري لهاي الصورة على الديسكتوب */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/home-hero-pharmacy-final.jpg"
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

          {/* صورة الديسكتوب — تجربة "Split Layout" مضغوطة: نفس أصل صورة
              الموبايل (portrait، home-hero-pharmacy-final.jpg) بحاوية
              محكومة الحجم (~420×440px)، cover بقصّ خفيف بدل contain.
              sizes معدّلة هون كمان — الحاوية صارت سقفها ~440px ثابت
              تقريبًا (مش نسبة من عرض الشاشة زي الجولة السابقة 55vw) */}
          <div className={styles.imageColDesktop}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/home-hero-pharmacy-final.jpg"
                alt={heroAlt}
                fill
                quality={75}
                sizes="(min-width: 768px) 440px, 1px"
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

              {/* صف المعلومات المساعدة (Utility Row) — ديسكتوب فقط
                  (1024px فما فوق)، جوا اللوحة الزجاجية نفسها تحت
                  الأزرار مباشرة. بدون بطاقات ولا ظلال ولا خلفية إضافية،
                  مفصول بخط رفيع جداً فوقه بس. مخفي تماماً تحت 1024px —
                  الموبايل/التابلت لسا عندهم نظام البطاقات العائمة
                  الأصلي (infoStripBridge تحت) بدون أي تغيير */}
              <div className={styles.utilityRow}>
                <PharmacyStatusItem variant="utility" />

                <span className={styles.utilityDivider} aria-hidden="true" />

                <span className={styles.utilityItem}>
                  <MapPin width={16} height={16} strokeWidth={2} className={styles.utilityIcon} aria-hidden="true" />
                  <span className={styles.utilityText}>
                    <span className={styles.utilityValue}>{LOCATION_FACT.value}</span>
                    <span className={styles.utilityLabel}>مقابل أسواق الغزاوي</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط معلومات عائم — جسر بصري بين الـHero وقسم "خدماتنا"، موبايل
          وتابلت فقط (أقل من 1024px — مخفي بالكامل عند 1024px فما فوق
          لصالح صف المعلومات المساعدة الجديد جوا اللوحة الزجاجية فوق).
          خارج قسم الـHero عمدًا (مش جوا heroCard) — overflow:hidden على
          heroCard/hero ضروري لقصّ الصورة full-bleed وأقواس الخلفية
          الزخرفية، فلو ضل الشريط جواهم كان رح ينقصّ لما نحطه يمتد تحت
          حدود الـHero.
          العنصر الأول (حالة المفتوح/المغلق) عنصر عميل منفصل (PharmacyStatusItem،
          variant="card" الافتراضي) بيحسب الوقت الفعلي بتوقيت الأردن —
          باقي الـHero يضل Server Component عادي. العنصر التاني نص
          Hero-specific (مش من ABOUT_LEGACY). العنصر الثالث (الموقع) لسا
          معاد استخدامه حرفيًا من ABOUT_LEGACY.facts نفس المصدر المستخدم
          بصفحة "نبذة عنا" */}
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
                <span className={styles.infoLabel}>مقابل أسواق الغزاوي</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
