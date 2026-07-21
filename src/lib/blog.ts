// =============================================================================
// blog.ts
// بيانات المدونة الصحية — مصدر بيانات مؤقت (Placeholder)
// =============================================================================
//
// هاي الحلقة الأولى: بنية وتصميم فقط، بمقالات نموذجية مختصرة (مقال واحد لكل
// تصنيف). المحتوى الكامل والصور الحقيقية لكل مقال رح تنضاف لاحقًا.
//
// عند الانتقال لاحقًا لمصدر بيانات حقيقي (CMS أو ملفات MDX)، الأنواع
// (BlogCategory / BlogArticle) والدوال المساعدة تحت هون بتضل نفسها —
// بس مصدر BLOG_ARTICLES بيتغيّر (fetch من CMS مثلًا) بدل المصفوفة الثابتة.
//
// =============================================================================


// -----------------------------------------------------------------------------
// 1. الأنواع
// -----------------------------------------------------------------------------
export type BlogCategory = {
  id: string;
  label: string;
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // BlogCategory["id"]
  image: string;
  imageAlt: string;
  publishedAt: string; // نص جاهز للعرض (متل "10 يوليو 2026")
  readingTime: string; // نص جاهز للعرض (متل "4 دقائق للقراءة")
  featured?: boolean;
  body: ArticleBlock[];
};


// -----------------------------------------------------------------------------
// 2. التصنيفات
// -----------------------------------------------------------------------------
export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "supplements",        label: "المكملات الغذائية" },
  { id: "skin-hair",          label: "العناية بالبشرة والشعر" },
  { id: "women-health",       label: "صحة المرأة والأم" },
  { id: "child-health",       label: "صحة الطفل" },
  { id: "devices-monitoring", label: "الأجهزة والمتابعة الصحية" },
  { id: "pharmacist-tips",    label: "نصائح صيدلانية" },
];

export const BLOG_ALL_CATEGORY_ID = "all";


// -----------------------------------------------------------------------------
// 3. المقالات النموذجية
// TODO: صور مؤقتة من صور الصيدلية الفعلية بانتظار تصوير مخصص لكل مقال —
// وكذلك محتوى كل مقال نص تعريفي عام مختصر بانتظار المراجعة الصيدلانية الكاملة.
// -----------------------------------------------------------------------------
const PHARMACY_PLACEHOLDER_IMAGE = "/images/pharmacy-interior.webp";
const STOREFRONT_PLACEHOLDER_IMAGE = "/images/home-hero-pharmacy.webp";

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug:        "magnesium-timing",
    title:       "ما الوقت المناسب لتناول المغنيسيوم؟",
    excerpt:     "يختلف التوقيت الأنسب لتناول المغنيسيوم حسب الهدف منه ونوع المكمل — إليكم أبرز الأساسيات للانتباه لها.",
    category:    "supplements",
    image:       PHARMACY_PLACEHOLDER_IMAGE,
    imageAlt:    "مكملات غذائية على أرفف صيدلية عدنان",
    publishedAt: "10 يوليو 2026",
    readingTime: "3 دقائق للقراءة",
    body: [
      { type: "paragraph", text: "يُعدّ المغنيسيوم من أكثر المكملات الغذائية شيوعًا، ويُستخدم لأسباب متعددة تتراوح بين دعم النوم والاسترخاء العضلي وحتى المساعدة الهضمية." },
      { type: "heading", text: "هل يُفضَّل تناوله صباحًا أم مساءً؟" },
      { type: "paragraph", text: "يعتمد التوقيت الأنسب على الهدف من تناوله وعلى نوع المركّب الكيميائي المستخدم في المكمل، وقد يختلف من شخص لآخر." },
      { type: "heading", text: "نقاط عامة تستحق الانتباه" },
      { type: "list", items: [
        "تناوله مع الطعام يقلل غالبًا من اضطراب المعدة.",
        "قد يتداخل مع بعض الأدوية الأخرى.",
        "الالتزام بالجرعة الموصى بها على العبوة.",
        "استشارة الصيدلي عند وجود أمراض مزمنة أو أدوية أخرى.",
      ] },
      { type: "callout", text: "هذا المحتوى لأغراض التوعية العامة فقط، ولا يغني عن استشارة الصيدلي أو الطبيب قبل البدء بأي مكمل غذائي جديد." },
    ],
  },
  {
    slug:        "identify-skin-type",
    title:       "كيف تتعرفين إلى نوع بشرتك؟",
    excerpt:     "معرفة نوع بشرتك الحقيقي أول خطوة لاختيار روتين عناية مناسب — إليك علامات بسيطة تساعدك على التمييز.",
    category:    "skin-hair",
    image:       PHARMACY_PLACEHOLDER_IMAGE,
    imageAlt:    "منتجات العناية بالبشرة على أرفف صيدلية عدنان",
    publishedAt: "5 يوليو 2026",
    readingTime: "4 دقائق للقراءة",
    body: [
      { type: "paragraph", text: "معرفة نوع بشرتك الحقيقي خطوة أساسية قبل اختيار أي منتج للعناية اليومية، فما يناسب بشرة قد لا يناسب أخرى." },
      { type: "heading", text: "الأنواع الشائعة للبشرة" },
      { type: "paragraph", text: "تُصنَّف البشرة عادة إلى دهنية أو جافة أو مختلطة أو حساسة، ولكل نوع منها احتياجات مختلفة عن الآخر." },
      { type: "heading", text: "علامات بسيطة للملاحظة" },
      { type: "list", items: [
        "درجة اللمعان بعد الغسل بساعات قليلة.",
        "الشعور بالشد أو الجفاف خلال اليوم.",
        "ظهور حبوب أو احمرار متكرر.",
        "تفاوت الملمس بين مناطق الوجه المختلفة.",
      ] },
      { type: "callout", text: "فحص البشرة لدى مختص أو صيدلي مؤهل يعطي نتائج أدق بكثير من الملاحظة الذاتية وحدها." },
    ],
  },
  {
    slug:        "folic-acid-pregnancy",
    title:       "حمض الفوليك قبل الحمل وخلاله",
    excerpt:     "لحمض الفوليك دور مهم في مراحل ما قبل الحمل وأثناءه — تعرّفي على أبرز الأساسيات المتعلقة به.",
    category:    "women-health",
    image:       STOREFRONT_PLACEHOLDER_IMAGE,
    imageAlt:    "واجهة صيدلية عدنان",
    publishedAt: "28 يونيو 2026",
    readingTime: "3 دقائق للقراءة",
    body: [
      { type: "paragraph", text: "يحظى حمض الفوليك باهتمام خاص لدى المرأة في مرحلة التخطيط للحمل، نظرًا لدوره المهم في هذه المرحلة الحساسة." },
      { type: "heading", text: "لماذا يُنصح به مبكرًا؟" },
      { type: "paragraph", text: "يُفضَّل غالبًا البدء بتناوله قبل الحمل بفترة معيّنة، بحسب تقييم الطبيب المتابع لكل حالة على حدة." },
      { type: "heading", text: "أمور يُفضَّل مراعاتها" },
      { type: "list", items: [
        "الالتزام بالجرعة التي يحددها الطبيب.",
        "الاستمرار وفق المدة الموصى بها.",
        "إخبار الطبيب عن أي أدوية أو مكملات أخرى.",
        "المتابعة الدورية خلال فترة الحمل.",
      ] },
      { type: "callout", text: "قرار البدء بحمض الفوليك وتحديد جرعته يعود دائمًا لتقييم الطبيب المتابع لحالتك الصحية." },
    ],
  },
  {
    slug:        "child-fever-safety",
    title:       "التعامل الآمن مع ارتفاع حرارة الطفل",
    excerpt:     "ارتفاع حرارة الطفل من أكثر المواقف التي تقلق الأهل — إليكم خطوطًا عامة للتعامل الآمن معها.",
    category:    "child-health",
    image:       PHARMACY_PLACEHOLDER_IMAGE,
    imageAlt:    "صيدلاني يقدم استشارة لأم وطفلها في صيدلية عدنان",
    publishedAt: "20 يونيو 2026",
    readingTime: "4 دقائق للقراءة",
    body: [
      { type: "paragraph", text: "ارتفاع الحرارة عند الأطفال من أكثر المواقف التي تثير قلق الأهل، رغم أنها في أغلب الأحيان استجابة طبيعية من الجسم." },
      { type: "heading", text: "خطوات أولية عامة" },
      { type: "paragraph", text: "تشمل الراحة، والحرص على شرب السوائل، ومراقبة درجة الحرارة بانتظام خلال الساعات الأولى." },
      { type: "heading", text: "متى تجب استشارة الطبيب فورًا؟" },
      { type: "list", items: [
        "ارتفاع الحرارة عند رضيع أقل من 3 أشهر.",
        "استمرار الحمى أكثر من يومين.",
        "ظهور أعراض إضافية مقلقة.",
        "عدم استجابة الطفل للخافضات الموصوفة.",
      ] },
      { type: "callout", text: "لا تُعطى أي خافضات حرارة للأطفال دون استشارة الصيدلي أو الطبيب لتحديد النوع والجرعة المناسبة للعمر والوزن." },
    ],
  },
  {
    slug:        "choosing-blood-pressure-monitor",
    title:       "كيف تختار جهاز قياس الضغط المنزلي؟",
    excerpt:     "اختيار جهاز قياس ضغط دم مناسب للمنزل يسهّل متابعة صحتكم بدقة — إليكم أبرز نقاط المقارنة.",
    category:    "devices-monitoring",
    image:       STOREFRONT_PLACEHOLDER_IMAGE,
    imageAlt:    "واجهة صيدلية عدنان",
    publishedAt: "15 يونيو 2026",
    readingTime: "3 دقائق للقراءة",
    body: [
      { type: "paragraph", text: "توفر المتابعة المنزلية لضغط الدم صورة أوضح عن الحالة الصحية اليومية، خصوصًا لمن يتابعون ضغطهم بشكل دوري." },
      { type: "heading", text: "أنواع الأجهزة الشائعة" },
      { type: "paragraph", text: "تتوفر أجهزة تقيس من الذراع وأخرى من المعصم، ولكل نوع دقّة وطريقة استخدام مختلفة قليلًا." },
      { type: "heading", text: "نقاط عملية عند الاختيار" },
      { type: "list", items: [
        "اختيار حجم الكفة المناسب لذراعك.",
        "التأكد من اعتماد الجهاز طبيًا.",
        "سهولة قراءة الشاشة وحجم الأرقام.",
        "إمكانية حفظ القراءات السابقة.",
      ] },
      { type: "callout", text: "يسعد فريق الصيدلية بمساعدتكم على اختيار الجهاز المناسب والتأكد من طريقة استخدامه الصحيحة." },
    ],
  },
  {
    slug:        "supplements-pharmacist-consultation",
    title:       "المكملات الغذائية: متى نحتاج إلى استشارة الصيدلي؟",
    excerpt:     "مع تعدد المكملات الغذائية المتوفرة، تصبح استشارة الصيدلي خطوة مهمة قبل البدء بأي منها.",
    category:    "pharmacist-tips",
    image:       PHARMACY_PLACEHOLDER_IMAGE,
    imageAlt:    "صيدلاني يقدّم استشارة داخل صيدلية عدنان",
    publishedAt: "15 يوليو 2026",
    readingTime: "4 دقائق للقراءة",
    featured:    true,
    body: [
      { type: "paragraph", text: "انتشرت المكملات الغذائية بشكل كبير في السنوات الأخيرة، مع تنوّع كبير في أنواعها والغرض من استخدام كل منها." },
      { type: "heading", text: "متى يُفضَّل السؤال قبل الشراء؟" },
      { type: "paragraph", text: "تزداد أهمية استشارة الصيدلي خصوصًا عند وجود أمراض مزمنة، أو تناول أدوية أخرى، أو خلال فترتي الحمل والرضاعة." },
      { type: "heading", text: "ما الذي يمكن أن يساعدكم الصيدلي به؟" },
      { type: "list", items: [
        "التأكد من عدم تعارض المكمل مع أدوية أخرى.",
        "اقتراح الجرعة والتوقيت المناسبين.",
        "توضيح الفرق بين المنتجات المتشابهة.",
        "الإجابة عن أي استفسار يخص طريقة الاستخدام.",
      ] },
      { type: "callout", text: "لا تترددوا بسؤال فريق صيدلية عدنان قبل البدء بأي مكمل غذائي جديد." },
    ],
  },
];


// -----------------------------------------------------------------------------
// 4. دوال مساعدة
// -----------------------------------------------------------------------------
export function getCategoryById(id: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.id === id);
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getFeaturedArticle(): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.featured);
}

/** مقالات أخرى غير المقال الحالي — بالأولوية لنفس التصنيف، ثم البقية */
export function getRelatedArticles(slug: string, count = 3): BlogArticle[] {
  const others = BLOG_ARTICLES.filter((article) => article.slug !== slug);
  const current = getArticleBySlug(slug);

  const sameCategory = current
    ? others.filter((article) => article.category === current.category)
    : [];
  const rest = others.filter((article) => !sameCategory.includes(article));

  return [...sameCategory, ...rest].slice(0, count);
}
