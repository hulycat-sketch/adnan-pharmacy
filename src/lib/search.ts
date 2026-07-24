// =============================================================================
// search.ts
// أدوات بحث بسيطة وقابلة لإعادة الاستخدام — تطبيع نص عربي ومطابقة كلمات جزئية.
// لا تعتمد على أي مكتبة بحث خارجية، وما إلها علاقة بمصدر بيانات معيّن
// (مش خاصة بالمدونة تحديدًا)، فبيمكن إعادة استخدامها لاحقًا لأي بحث نصي
// عربي ثاني بالموقع.
// =============================================================================

// حركات التشكيل العربي مبنية من أكواد Unicode الرقمية صراحةً (0x064B..0x065F
// + الألف الخنجرية 0x0670) بدل كتابة الحروف حرفيًا — أدق وأسهل للتحقق منها،
// وبيضمن عدم امتداد المدى بالخطأ لأرقام أو علامات ترقيم عربية مجاورة.
function buildArabicDiacriticsRegex(): RegExp {
  let chars = "";
  for (let code = 0x064b; code <= 0x065f; code += 1) {
    chars += String.fromCharCode(code);
  }
  chars += String.fromCharCode(0x0670); // الألف الخنجرية (superscript alef)
  return new RegExp(`[${chars}]`, "g");
}

const ARABIC_DIACRITICS = buildArabicDiacriticsRegex();
const TATWEEL = new RegExp(String.fromCharCode(0x0640), "g"); // حرف التطويل (ـ)

const ALEF_VARIANTS = new RegExp(
  `[${String.fromCharCode(0x0623)}${String.fromCharCode(0x0625)}${String.fromCharCode(0x0622)}]`,
  "g"
); // أ إ آ
const ALEF = String.fromCharCode(0x0627); // ا
const ALEF_MAKSURA = new RegExp(String.fromCharCode(0x0649), "g"); // ى
const YEH = String.fromCharCode(0x064a); // ي
const TEH_MARBUTA = new RegExp(String.fromCharCode(0x0629), "g"); // ة
const HEH = String.fromCharCode(0x0647); // ه

/**
 * يطبّع نصًا عربيًا لأغراض البحث: يوحّد أشكال الألف (أ،إ،آ ← ا) والياء
 * (ى ← ي) والتاء المربوطة (ة ← ه)، ويزيل التشكيل والتطويل، ويحوّل الأحرف
 * اللاتينية لصغيرة، ويبسّط المسافات المتكررة — حتى يتطابق "بشرة" مع
 * "بشره" مثلًا، بغض النظر عن اختلافات الكتابة الشائعة عند المستخدمين.
 */
export function normalizeArabicText(input: string): string {
  return input
    .replace(ALEF_VARIANTS, ALEF)
    .replace(ALEF_MAKSURA, YEH)
    .replace(TEH_MARBUTA, HEH)
    .replace(ARABIC_DIACRITICS, "")
    .replace(TATWEEL, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/** يقسّم نص بحث مطبَّع مسبقًا (عبر normalizeArabicText) إلى كلمات فعلية فقط */
export function splitSearchWords(normalizedQuery: string): string[] {
  return normalizedQuery.split(" ").filter(Boolean);
}

/**
 * true لو كل كلمة من كلمات البحث موجودة كجزء من النص القابل للبحث
 * (مطابقة AND بسيطة بين الكلمات). تدعم المطابقة الجزئية تلقائيًا لأنها
 * تعتمد على includes() لا على تطابق كلمة كاملة — فـ"مغن" مثلًا بتلاقي
 * "المغنيسيوم". قائمة كلمات فاضية (بحث فاضي) بترجع true دايمًا.
 */
export function matchesAllSearchWords(searchableText: string, queryWords: string[]): boolean {
  if (queryWords.length === 0) return true;
  return queryWords.every((word) => searchableText.includes(word));
}
