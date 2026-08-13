"use client";

import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";
import { detectIOS, detectStandalone } from "@/lib/platform";
import styles from "./PwaInstall.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_STORAGE_KEY = "adnan-pharmacy-pwa-install-dismissed-until";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 يوم

// ما لازم يظهر فورًا — بيبين بعد أول شرط يتحقق من الاثنين: سكرول ~400px
// أو مرور 8-10 ثانية (هون 9000ms، منتصف المدى)، حتى ما يقاطع فتح الصفحة
const REVEAL_SCROLL_THRESHOLD_PX = 400;
const REVEAL_TIMEOUT_MS = 9000;

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
  const [revealed, setRevealed] = useState(false);

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

  // تأجيل الظهور حتى أول شرط يتحقق (سكرول أو مؤقّت) — بمجرد ما revealed
  // يصير true، الـcleanup بيشيل الـlistener/timer فورًا، فما في أي عمل زائد بعدها
  useEffect(() => {
    if (revealed) return;

    const reveal = () => setRevealed(true);

    const handleScroll = () => {
      if (window.scrollY >= REVEAL_SCROLL_THRESHOLD_PX) reveal();
    };

    const timeoutId = window.setTimeout(reveal, REVEAL_TIMEOUT_MS);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [revealed]);

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
  if (!revealed) return null;

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
                ثبّت صيدلية عدنان على هاتفك
              </h2>
              <p className={styles.description}>وصول أسرع إلى خدماتنا من شاشتك الرئيسية.</p>
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
