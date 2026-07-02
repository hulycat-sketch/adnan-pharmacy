# Design System — صيدلية عدنان
**المرجع الرسمي الوحيد (Single Source of Truth) للمشروع بالكامل**
> كل Component، كل صفحة، كل قرار تصميمي يجب أن يرجع لهذا الملف.

---

## 1. فلسفة التصميم (Design Philosophy)

صيدلية عدنان موجودة منذ 1981 — هذا الإرث يجب أن يظهر في كل تفصيلة.

**المبادئ الأساسية:**
- **الثقة أولاً** — التصميم يعكس مؤسسة طبية موثوقة، وليس متجراً عادياً
- **Minimal وهادئ** — لا ازدحام بصري، المساحة البيضاء هي عنصر تصميمي أساسي
- **أوروبي حديث** — نظيف، واضح، احترافي
- **سريع وسهل** — المستخدم يجد ما يريد في ثوانٍ
- **UX أولاً** — كل قرار تصميمي يخدم المستخدم قبل الجماليات

---

## 2. لوحة الألوان (Color Palette)

مستخرجة مباشرة من شعار صيدلية عدنان.

```
/* Primary — الأزرق الكحلي (من نص الشعار) */
--color-primary:       #1B2B5E;   /* الاستخدام الرئيسي: Header, Footer, العناوين */
--color-primary-dark:  #14204A;   /* Hover على الأزرق */
--color-primary-light: #2D4480;   /* تدرجات خفيفة */

/* Secondary — الأخضر (من دائرة الشعار) */
--color-secondary:       #3BAA35; /* الأزرار الرئيسية، الأيقونات، التمييز */
--color-secondary-dark:  #2E8A29; /* Hover على الأخضر */
--color-secondary-light: #E8F5E7; /* خلفيات خفيفة خضراء */

/* Background */
--color-bg:            #F8F9FA;   /* خلفية الصفحة العامة */
--color-bg-white:      #FFFFFF;   /* البطاقات والأقسام البيضاء */
--color-bg-section:    #F0F4F8;   /* أقسام رمادية فاتحة للتمييز */

/* Surface */
--color-surface:       #FFFFFF;   /* Cards, Modals */
--color-surface-hover: #F5F8FF;   /* Hover على البطاقات */

/* Border */
--color-border:        #E2E8F0;   /* حدود خفيفة */
--color-border-focus:  #3BAA35;   /* حدود عند التركيز على Input */

/* Text */
--color-text-primary:  #1A202C;   /* النصوص الرئيسية */
--color-text-secondary:#4A5568;   /* النصوص الثانوية */
--color-text-muted:    #718096;   /* نصوص خفيفة */
--color-text-inverse:  #FFFFFF;   /* نص على خلفية داكنة */

/* States */
--color-success:       #3BAA35;
--color-error:         #E53E3E;
--color-warning:       #D69E2E;
--color-info:          #3182CE;
```

---

## 3. Typography

**الخط الرسمي:** IBM Plex Arabic
**السبب:** سريع (woff2)، حديث، مقروء، مجاني، يدعم العربية باحتراف

**الأوزان المستخدمة فقط (لا نحمّل غيرها):**
- `400` — Regular — النصوص العادية
- `600` — SemiBold — العناوين والأزرار

```
/* H1 — العنوان الرئيسي (Hero) */
font-size:    2.5rem  (40px) desktop / 1.75rem (28px) mobile
font-weight:  600
line-height:  1.3
color:        --color-primary

/* H2 — عناوين الأقسام */
font-size:    2rem    (32px) desktop / 1.5rem  (24px) mobile
font-weight:  600
line-height:  1.35

/* H3 — عناوين البطاقات */
font-size:    1.25rem (20px)
font-weight:  600
line-height:  1.4

/* H4 — عناوين فرعية */
font-size:    1rem    (16px)
font-weight:  600
line-height:  1.5

/* Paragraph */
font-size:    1rem    (16px)
font-weight:  400
line-height:  1.8

/* Small Text */
font-size:    0.875rem (14px)
font-weight:  400
line-height:  1.6

/* Button Text */
font-size:    1rem    (16px)
font-weight:  600
letter-spacing: 0.01em
```

---

## 4. Spacing System

نظام مبني على وحدة أساسية = **4px**

```
--space-1:   4px    /* مسافات داخلية صغيرة جداً */
--space-2:   8px    /* مسافات صغيرة */
--space-3:   12px
--space-4:   16px   /* الوحدة الأساسية */
--space-5:   20px
--space-6:   24px   /* Padding داخل البطاقات */
--space-8:   32px   /* Gaps بين العناصر */
--space-10:  40px
--space-12:  48px   /* Padding الأقسام (mobile) */
--space-16:  64px   /* Padding الأقسام (desktop) */
--space-20:  80px   /* مسافات بين الأقسام الكبيرة */
--space-24:  96px

/* Container */
--container-max:     1200px
--container-padding: 24px   /* على الجانبين */
```

---

## 5. Border Radius

```
--radius-sm:   6px    /* Badges, Tags */
--radius-md:   10px   /* Buttons, Inputs */
--radius-lg:   16px   /* Cards */
--radius-xl:   24px   /* أقسام كبيرة */
--radius-full: 9999px /* Pills, الأزرار المستديرة */
```

---

## 6. Shadow System

ظلال خفيفة وراقية — لا ظلال ثقيلة أبداً

```
/* Card Shadow — الظل الافتراضي للبطاقات */
--shadow-card:  0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);

/* Hover Shadow — عند المرور على البطاقة */
--shadow-hover: 0 4px 16px rgba(27,43,94,0.10), 0 1px 4px rgba(0,0,0,0.06);

/* Large Shadow — للأقسام العائمة */
--shadow-lg:    0 8px 32px rgba(27,43,94,0.08);

/* Header Shadow */
--shadow-header: 0 1px 0px rgba(0,0,0,0.08);
```

---

## 7. Buttons

### Primary Button (الأخضر)
```
background:    --color-secondary   (#3BAA35)
color:         #FFFFFF
padding:       12px 28px
border-radius: --radius-md
font-weight:   600
hover:         background → --color-secondary-dark (#2E8A29)
transition:    150ms ease
```

### Secondary Button (الأزرق الكحلي)
```
background:    --color-primary
color:         #FFFFFF
hover:         background → --color-primary-dark
```

### Outline Button
```
background:    transparent
border:        2px solid --color-primary
color:         --color-primary
hover:         background → --color-primary, color → white
```

### Text Button
```
background:    transparent
color:         --color-secondary
hover:         color → --color-secondary-dark, underline
```

**Disabled (جميع الأنواع):**
```
opacity:       0.45
cursor:        not-allowed
```

---

## 8. Cards

```
background:    --color-surface      (#FFFFFF)
border:        1px solid --color-border
border-radius: --radius-lg          (16px)
padding:       --space-6            (24px)
shadow:        --shadow-card
transition:    box-shadow 200ms ease, transform 200ms ease

/* Hover */
shadow:        --shadow-hover
transform:     translateY(-2px)
```

---

## 9. Icons

**المكتبة:** Lucide React (خفيفة جداً، tree-shakeable)
**الأسلوب:** Outline (متوافق مع الهوية الطبية الراقية)

```
/* أحجام موحدة */
--icon-sm:   16px   /* داخل الأزرار */
--icon-md:   20px   /* الاستخدام العام */
--icon-lg:   24px   /* أيقونات الخدمات */
--icon-xl:   40px   /* أيقونات الأقسام الرئيسية */

/* الألوان */
أيقونات الخدمات:  --color-secondary
أيقونات Navigation: --color-text-secondary
أيقونات على أزرق: #FFFFFF
```

---

## 10. Images

```
/* الصيغة */
الصيغة الأساسية:  WebP
fallback:          JPEG/PNG
الجودة:           80-85%

/* Aspect Ratios */
Hero:              16:9 أو 3:1
بطاقات الخدمات:   1:1 أو 4:3
صور المقالات:      16:9

/* قواعد ثابتة */
- دائماً next/image لتحسين تلقائي
- دائماً lazy loading (loading="lazy") ما عدا Hero
- alt text وصفي بالعربية
- border-radius حسب السياق
- لا overlay ثقيل إلا عند الحاجة
```

---

## 11. Animations

**القاعدة الذهبية:** الموقع سريع أولاً — الحركة وظيفة وليست ديكور

```
/* Transitions مسموح بها فقط */
--transition-fast:   150ms ease
--transition-base:   200ms ease
--transition-slow:   300ms ease

/* Hover Effects المسموح بها */
- Buttons:    تغيير لون الخلفية فقط (150ms)
- Cards:      translateY(-2px) + shadow (200ms)
- Links:      تغيير اللون (150ms)

/* ممنوع */
- Keyframe animations ثقيلة
- Parallax
- Scroll-triggered animations معقدة
- أي animation يؤثر على LCP أو CLS
```

---

## 12. Responsive Design (Breakpoints)

```
/* Mobile First */
--bp-sm:   480px    /* Mobile كبير */
--bp-md:   768px    /* Tablet */
--bp-lg:   1024px   /* Laptop */
--bp-xl:   1280px   /* Desktop */
--bp-2xl:  1536px   /* Large Desktop */

/* Tailwind */
sm:  480px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px

/* قواعد الـ Grid */
Mobile:   1 عمود
Tablet:   2 أعمدة
Desktop:  3-4 أعمدة حسب المحتوى
```

---

## 13. Accessibility

```
/* Contrast */
النص على خلفية بيضاء: نسبة 4.5:1 كحد أدنى
النص الكبير:          3:1 كحد أدنى
اللون الأخضر (#3BAA35) على أبيض: متوافق ✓
الأزرق (#1B2B5E) على أبيض:       متوافق ✓

/* Focus States */
كل عنصر تفاعلي يجب أن يكون له:
outline: 2px solid --color-secondary
outline-offset: 2px

/* حجم الخط الأدنى */
16px — لا نصوص أصغر من هذا في المحتوى الرئيسي
14px — فقط للملاحظات والـ Captions

/* الكيبورد */
Tab order منطقي
Skip to main content link
```

---

## 14. Performance Rules

```
/* Next.js */
✓ App Router دائماً
✓ Static Generation (SSG) لكل الصفحات الثابتة
✓ Server Components افتراضياً
✓ Client Components فقط عند الحاجة ('use client')

/* الصور */
✓ next/image دائماً
✓ WebP/AVIF
✓ Lazy loading ما عدا LCP image
✓ تحديد width و height دائماً

/* الخطوط */
✓ تحميل محلي (public/fonts/) وليس من Google
✓ font-display: swap
✓ woff2 فقط

/* المكتبات */
✓ Lucide React (أيقونات)
✗ لا Framer Motion
✗ لا GSAP
✗ لا jQuery
✗ لا Bootstrap

/* الأهداف */
Lighthouse Performance: 95+
LCP: أقل من 2.5 ثانية
CLS: أقل من 0.1
FID: أقل من 100ms
```

---

## 15. SEO Rules

```
/* كل صفحة يجب أن تحتوي */
✓ <title> فريد — بالصيغة: "الصفحة | صيدلية عدنان"
✓ meta description: 150-160 حرف، وصفي، يشمل الكلمات المفتاحية
✓ canonical URL
✓ lang="ar" dir="rtl" على <html>

/* Open Graph */
✓ og:title
✓ og:description
✓ og:image (1200x630px WebP)
✓ og:type
✓ og:locale = ar_JO

/* Structured Data (JSON-LD) */
✓ Pharmacy schema على الصفحة الرئيسية
✓ BreadcrumbList على الصفحات الداخلية

/* الملفات */
✓ /robots.txt
✓ /sitemap.xml (auto-generated)

/* HTML */
✓ Semantic HTML: header, main, section, article, nav, footer
✓ alt text وصفي لكل صورة
✓ عنوان H1 واحد فقط في كل صفحة
✓ تسلسل منطقي: H1 → H2 → H3
```

---

## 16. Coding Rules

```
/* هيكل الملفات */
src/
├── app/           ← Pages و Layouts
├── components/
│   ├── layout/    ← Header, Footer
│   ├── sections/  ← Hero, About, Services...
│   └── ui/        ← Button, Card, SectionTitle...
├── lib/           ← metadata, constants, helpers
└── types/         ← TypeScript types

/* قواعد الكود */
✓ كل قسم = Component مستقل في sections/
✓ كل عنصر مشترك = Component في ui/
✗ لا تكرار للكود
✓ أسماء Components بـ PascalCase: Hero.tsx
✓ أسماء الملفات بـ kebab-case: section-title.tsx
✓ TypeScript دائماً
✓ Props موثقة بـ Interface

/* Comments */
✓ تعليق عربي لكل قسم رئيسي
✓ لا تعليقات مبالغ بها على الكود الواضح
```

---

## 17. Future Scalability — التوسع المستقبلي

هذا القسم إلزامي وليس اختيارياً.

**كل قرار تصميمي في هذا المشروع يجب أن يسمح للموقع بالنمو من صفحة واحدة إلى مئات الصفحات دون تغيير الهوية البصرية أو إعادة كتابة الـ Components الأساسية.**

### الصفحات المستقبلية المتوقعة
```
/                        ← الرئيسية ✓ (نبنيها أولاً)
/about                   ← من نحن
/services                ← الخدمات
/services/[slug]         ← صفحة خدمة محددة
/insurance               ← شركات التأمين
/insurance/[slug]        ← صفحة شركة تأمين
/skin-check              ← فحص البشرة
/blog                    ← المدونة
/blog/[slug]             ← مقال محدد
/faq                     ← الأسئلة الشائعة
/contact                 ← تواصل معنا
/branches                ← الفروع
```

### قواعد التوسع الإلزامية

**1. CSS Variables لا Hard-coded Values**
```css
/* ✓ صح */
color: var(--color-primary);
/* ✗ غلط */
color: #1B2B5E;
```
تغيير لون الهوية مستقبلاً = تغيير متغير واحد فقط.

**2. Components قابلة لإعادة الاستخدام**
```tsx
// SectionTitle يُستخدم في كل الأقسام والصفحات
// Card يُستخدم للخدمات والتأمين والمقالات
// Button يُستخدم في كل مكان
```

**3. Dynamic Routes جاهزة**
```
/services/[slug] — كل خدمة لها صفحة SEO مستقلة
/blog/[slug]     — كل مقال لها صفحة SEO مستقلة
```

**4. Metadata System مركزي**
```
lib/metadata.ts يُصدّر base metadata
كل صفحة تمدّه وتضيف بياناتها
```

**5. لا Magic Numbers في الكود**
```tsx
// ✓ صح
import { SITE_NAME, SITE_URL } from '@/lib/constants'
// ✗ غلط
title="صيدلية عدنان" // مكرر في 50 صفحة
```

### الهدف النهائي للتوسع
> بعد سنة، يجب أن يستطيع مطور جديد يفتح المشروع لأول مرة أن يضيف صفحة جديدة كاملة (بنفس الهوية، نفس الأداء، نفس SEO) في أقل من ساعة، دون الحاجة لفهم كل الكود الموجود.

---

*آخر تحديث: يونيو 2026 — صيدلية عدنان منذ 1981*
