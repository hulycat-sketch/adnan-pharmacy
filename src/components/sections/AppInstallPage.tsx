"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES, PHARMACY } from "@/lib/constants";
import styles from "./AppInstallPage.module.css";

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

export default function AppInstallPage() {
  // الحالة الابتدائية لازم تطابق الـ SSR تمامًا (بدون زر/تعليمات) عشان نتفادى
  // Hydration mismatch — واقع الجهاز (iOS؟ مثبّت مسبقًا؟) ما بينحسب إلا بعد أول
  // رندر ثابت، جوا useEffect.
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

  const isInstalled = isStandalone || justInstalled;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Image
          src={IMAGES.logo}
          alt={`شعار ${PHARMACY.name}`}
          width={96}
          height={96}
          priority
          className={styles.logo}
        />

        <h1 className={styles.title}>ثبّت صيدلية عدنان على هاتفك</h1>
        <p className={styles.description}>
          احصل على وصول أسرع إلى خدماتنا ومقالاتنا الصحية مباشرة من الشاشة الرئيسية لهاتفك.
        </p>

        {mounted && (
          <div className={styles.action}>
            {isInstalled ? (
              <p className={styles.installedNotice}>صيدلية عدنان مثبتة على جهازك</p>
            ) : isIOS ? (
              <p className={styles.iosInstructions}>
                اضغط على زر المشاركة، ثم اختر «إضافة إلى الشاشة الرئيسية».
              </p>
            ) : deferredPrompt ? (
              <button type="button" className={styles.installBtn} onClick={handleInstallClick}>
                تثبيت على الهاتف
              </button>
            ) : null}
          </div>
        )}

        <Link href="/" className={styles.secondaryLink}>
          متابعة إلى الموقع
        </Link>
      </div>
    </div>
  );
}
