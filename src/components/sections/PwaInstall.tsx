"use client";

import { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import styles from "./PwaInstall.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function detectIOS(): boolean {
  const ua = window.navigator.userAgent;
  const isIOSByUA = /iphone|ipad|ipod/i.test(ua);
  // iPadOS 13+ Safari يعرّف نفسه كـ"Macintosh" افتراضيًا — هاد فحص إضافي موثوق لتمييزه
  const isIPadOS = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
  return isIOSByUA || isIPadOS;
}

function detectStandalone(): boolean {
  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return displayModeStandalone || iosStandalone;
}

export default function PwaInstall() {
  // الحالة الابتدائية لازم تطابق الـ SSR تمامًا (كل شي false/مخفي) عشان نتفادى
  // Hydration mismatch حقيقي — القيم متل isIOS/isStandalone بتتغيّر شكل الرندر نفسه
  // (تظهر/تختفي كل القسم)، فما بينفع نحسبها بـ lazy initializer متل حالات تانية
  // بالمشروع؛ لازم تُحسب بعد أول رندر ثابت فقط، جوا useEffect.
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- مزامنة مقصودة مع واقع
       المتصفح/الجهاز بعد أول رندر، مش قيمة كان ممكن تُحسب أثناء الرندر نفسه */
    setMounted(true);
    setIsStandalone(detectStandalone());
    setIsIOS(detectIOS());
    /* eslint-enable react-hooks/set-state-in-effect */

    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = () => setIsStandalone(detectStandalone());
    standaloneQuery.addEventListener("change", handleDisplayModeChange);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setJustInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      standaloneQuery.removeEventListener("change", handleDisplayModeChange);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setJustInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!mounted) return null;
  if (isStandalone || justInstalled) return null;
  if (!isIOS && !deferredPrompt) return null;

  return (
    <section className={styles.section} aria-labelledby="pwa-install-heading">
      <div className={`container ${styles.inner}`}>
        <span className={styles.iconWrapper} aria-hidden="true">
          <Smartphone width={26} height={26} className={styles.icon} />
        </span>

        <div className={styles.content}>
          <h2 id="pwa-install-heading" className={styles.title}>
            ثبّت صيدلية عدنان على هاتفك
          </h2>
          <p className={styles.description}>
            احصل على وصول أسرع إلى خدماتنا مباشرة من الشاشة الرئيسية لهاتفك.
          </p>
        </div>

        {isIOS ? (
          <p className={styles.iosInstructions}>
            اضغط على زر المشاركة ثم اختر إضافة إلى الشاشة الرئيسية.
          </p>
        ) : (
          <button type="button" className={styles.installBtn} onClick={handleInstallClick}>
            تثبيت على الهاتف
          </button>
        )}
      </div>
    </section>
  );
}
