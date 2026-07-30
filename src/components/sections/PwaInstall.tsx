"use client";

import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import styles from "./PwaInstall.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_STORAGE_KEY = "adnan-pharmacy-pwa-install-dismissed-until";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 أيام

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

function readIsDismissed(): boolean {
  const raw = window.localStorage.getItem(DISMISS_STORAGE_KEY);
  const parsed = raw ? Number(raw) : 0;
  const until = Number.isFinite(parsed) ? parsed : 0;
  return until > Date.now();
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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- مزامنة مقصودة مع واقع
       المتصفح/الجهاز/التخزين المحلي بعد أول رندر، مش قيمة كان ممكن تُحسب أثناء الرندر نفسه */
    setMounted(true);
    setIsStandalone(detectStandalone());
    setIsIOS(detectIOS());
    setDismissed(readIsDismissed());
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

  const handleDismiss = () => {
    const until = Date.now() + DISMISS_DURATION_MS;
    window.localStorage.setItem(DISMISS_STORAGE_KEY, String(until));
    setDismissed(true);
  };

  if (!mounted) return null;
  if (isStandalone || justInstalled) return null;
  if (dismissed) return null;
  if (!isIOS && !deferredPrompt) return null;

  return (
    <section className={styles.section} aria-labelledby="pwa-install-heading">
      <div className="container">
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={handleDismiss}
            aria-label="إغلاق"
          >
            <X width={16} height={16} aria-hidden="true" />
          </button>

          <div className={styles.mainRow}>
            <span className={styles.iconWrapper} aria-hidden="true">
              <Smartphone width={18} height={18} className={styles.icon} />
            </span>

            <div className={styles.content}>
              <h2 id="pwa-install-heading" className={styles.title}>
                احتفظ بصيدلية عدنان على هاتفك
              </h2>
              <p className={styles.description}>وصول أسرع إلى خدماتنا ومعلومات التواصل.</p>
            </div>
          </div>

          <div className={styles.actionArea}>
            {isIOS ? (
              <p className={styles.iosInstructions}>
                اضغط على زر المشاركة ثم اختر إضافة إلى الشاشة الرئيسية.
              </p>
            ) : (
              <button type="button" className={styles.installBtn} onClick={handleInstallClick}>
                تثبيت
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
