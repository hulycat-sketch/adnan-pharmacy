// كاشفات منصّة مشتركة — منقولة من PwaInstall.tsx حتى يعاد استخدامها بدون
// تكرار من NotificationOptIn.tsx (كلاهما يحتاج نفس منطق كشف iOS/standalone).

export function detectIOS(): boolean {
  const ua = window.navigator.userAgent;
  const isIOSByUA = /iphone|ipad|ipod/i.test(ua);
  // iPadOS 13+ Safari يعرّف نفسه كـ"Macintosh" افتراضيًا — هاد فحص إضافي موثوق لتمييزه
  const isIPadOS = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
  return isIOSByUA || isIPadOS;
}

export function detectStandalone(): boolean {
  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return displayModeStandalone || iosStandalone;
}
