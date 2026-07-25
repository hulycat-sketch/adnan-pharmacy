"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, X } from "lucide-react";
import OneSignal from "react-onesignal";
import { initOneSignalOnce, isOneSignalConfigured } from "@/lib/onesignal";
import styles from "./NotificationOptIn.module.css";

const DISMISS_STORAGE_KEY = "adnan-pharmacy-notifications-dismissed";

export default function NotificationOptIn() {
  const pathname = usePathname();

  // الحالة الابتدائية لازم تطابق الـ SSR تمامًا (بدون بطاقة) عشان نتفادى
  // Hydration mismatch — دعم الإشعارات وحالة الإذن ما بتنحسب إلا بعد أول
  // رندر ثابت، جوا useEffect.
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    /* eslint-disable react-hooks/set-state-in-effect -- مزامنة مقصودة مع
       واقع المتصفح/التخزين المحلي بعد أول رندر، مش قيمة كان ممكن تُحسب
       أثناء الرندر نفسه */
    setMounted(true);
    setDismissed(window.localStorage.getItem(DISMISS_STORAGE_KEY) === "1");
    /* eslint-enable react-hooks/set-state-in-effect */

    initOneSignalOnce()
      .then(() => {
        if (cancelled || !isOneSignalConfigured()) return;
        if (!OneSignal.Notifications.isPushSupported()) return;

        setReady(true);
        setPermission(OneSignal.Notifications.permissionNative);

        const handlePermissionChange = (granted: boolean) => {
          setPermission(granted ? "granted" : "denied");
        };
        OneSignal.Notifications.addEventListener("permissionChange", handlePermissionChange);
      })
      .catch(() => {
        // فشل التهيئة (مثلاً App ID غير صالح) — البطاقة ببساطة ما بتظهر
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEnableClick = async () => {
    try {
      await OneSignal.Notifications.requestPermission();
    } finally {
      setPermission(OneSignal.Notifications.permissionNative);
    }
  };

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISS_STORAGE_KEY, "1");
    setDismissed(true);
  };

  const showCard =
    mounted && ready && pathname === "/" && permission === "default" && !dismissed;

  if (!showCard) return null;

  return (
    <section className={styles.section} aria-labelledby="notification-optin-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={handleDismiss}
            aria-label="إغلاق"
          >
            <X width={16} height={16} aria-hidden="true" />
          </button>

          <span className={styles.iconWrapper} aria-hidden="true">
            <Bell width={22} height={22} className={styles.icon} />
          </span>

          <div className={styles.content}>
            <h2 id="notification-optin-heading" className={styles.title}>
              فعّل إشعارات صيدلية عدنان
            </h2>
            <p className={styles.description}>
              احصل على إشعارات حول أيام الفحص المجاني للبشرة والشعر، والخدمات الجديدة، والمقالات
              الصحية المهمة.
            </p>
          </div>

          <button type="button" className={styles.enableBtn} onClick={handleEnableClick}>
            تفعيل الإشعارات
          </button>
        </div>
      </div>
    </section>
  );
}
