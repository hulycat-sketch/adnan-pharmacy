"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, CheckCircle2, X } from "lucide-react";
import OneSignal, { type SubscriptionChangeEvent } from "react-onesignal";
import { initOneSignalOnce, isOneSignalConfigured } from "@/lib/onesignal";
import { detectIOS, detectStandalone } from "@/lib/platform";
import styles from "./NotificationOptIn.module.css";

const DISMISS_STORAGE_KEY = "adnan-pharmacy-notifications-dismissed";
// أقصى انتظار لتأكيد إنشاء الاشتراك بعد الموافقة (نفس رتبة REVEAL_TIMEOUT_MS
// المستخدمة بـPwaInstall.tsx) — لو ما وصل تأكيد خلال هالمدة، الحالة بترجع
// "needs-optin" تلقائيًا (زر "إكمال التفعيل" بيسمح بإعادة المحاولة يدويًا)
const SUBSCRIPTION_CONFIRM_TIMEOUT_MS = 9000;

type Status = "ios-needs-install" | "unsupported" | "denied" | "default" | "subscribed" | "needs-optin";

export default function NotificationOptIn() {
  const pathname = usePathname();

  // الحالة الابتدائية لازم تطابق الـ SSR تمامًا (بدون بطاقة) عشان نتفادى
  // Hydration mismatch — دعم الإشعارات وحالة الإذن ما بتنحسب إلا بعد أول
  // رندر ثابت، جوا useEffect.
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [optedIn, setOptedIn] = useState<boolean | undefined>(undefined);
  const [subscriptionId, setSubscriptionId] = useState<string | null | undefined>(undefined);
  const [justSubscribed, setJustSubscribed] = useState(false);
  const [pending, setPending] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    /* eslint-disable react-hooks/set-state-in-effect -- مزامنة مقصودة مع
       واقع المتصفح/التخزين المحلي بعد أول رندر، مش قيمة كان ممكن تُحسب
       أثناء الرندر نفسه */
    setMounted(true);
    setDismissed(window.localStorage.getItem(DISMISS_STORAGE_KEY) === "1");
    setIsIOS(detectIOS());
    setIsStandalone(detectStandalone());
    /* eslint-enable react-hooks/set-state-in-effect */

    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = () => setIsStandalone(detectStandalone());
    standaloneQuery.addEventListener("change", handleDisplayModeChange);

    let handlePermissionChange: ((granted: boolean) => void) | null = null;
    let handleSubscriptionChange: ((change: SubscriptionChangeEvent) => void) | null = null;

    initOneSignalOnce()
      .then(() => {
        if (cancelled || !isOneSignalConfigured()) return;

        setPushSupported(OneSignal.Notifications.isPushSupported());
        setReady(true);
        setPermission(OneSignal.Notifications.permissionNative);
        setOptedIn(OneSignal.User.PushSubscription.optedIn);
        setSubscriptionId(OneSignal.User.PushSubscription.id);

        handlePermissionChange = (granted: boolean) => {
          setPermission(granted ? "granted" : "denied");
        };
        OneSignal.Notifications.addEventListener("permissionChange", handlePermissionChange);

        handleSubscriptionChange = (change: SubscriptionChangeEvent) => {
          setOptedIn(change.current.optedIn);
          setSubscriptionId(change.current.id);
        };
        OneSignal.User.PushSubscription.addEventListener("change", handleSubscriptionChange);
      })
      .catch(() => {
        // فشل التهيئة (مثلاً App ID غير صالح) — البطاقة ببساطة ما بتظهر
      });

    return () => {
      cancelled = true;
      standaloneQuery.removeEventListener("change", handleDisplayModeChange);
      if (handlePermissionChange) {
        OneSignal.Notifications.removeEventListener("permissionChange", handlePermissionChange);
      }
      if (handleSubscriptionChange) {
        OneSignal.User.PushSubscription.removeEventListener("change", handleSubscriptionChange);
      }
    };
  }, []);

  // تتحقق فورًا من optedIn/id، وإذا لسا ما وصلوا (تسجيل الاشتراك عند
  // OneSignal بياخد لحظة إضافية أحيانًا)، بتستنى حدث "change" واحد أو
  // انتهاء المهلة (أيهما أول) بدل ما تفترض نجاح فوري
  const confirmSubscription = async () => {
    const subscription = OneSignal.User.PushSubscription;

    if (subscription.optedIn === true && subscription.id) {
      setOptedIn(true);
      setSubscriptionId(subscription.id);
      setJustSubscribed(true);
      setPending(false);
      return;
    }

    await new Promise<void>((resolve) => {
      let settled = false;

      const onChange = (change: SubscriptionChangeEvent) => {
        if (settled) return;
        settled = true;
        subscription.removeEventListener("change", onChange);
        window.clearTimeout(timeoutId);
        setOptedIn(change.current.optedIn);
        setSubscriptionId(change.current.id);
        if (change.current.optedIn && change.current.id) setJustSubscribed(true);
        resolve();
      };

      subscription.addEventListener("change", onChange);

      const timeoutId = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        subscription.removeEventListener("change", onChange);
        resolve();
      }, SUBSCRIPTION_CONFIRM_TIMEOUT_MS);
    });

    setPending(false);
  };

  const handleEnableClick = async () => {
    if (pending) return;
    setPending(true);

    try {
      const granted = await OneSignal.Notifications.requestPermission();
      setPermission(OneSignal.Notifications.permissionNative);

      if (!granted) {
        setPending(false);
        return;
      }

      await confirmSubscription();
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[NotificationOptIn] فشل تفعيل الإشعارات:", error);
      }
      setPending(false);
    }
  };

  // ما في حاجة لإذن جديد من المتصفح هون — الإذن ممنوح أصلًا، بس الاشتراك
  // نفسه عند OneSignal يحتاج (إعادة) تسجيل عبر optIn()
  const handleCompleteOptInClick = async () => {
    if (pending) return;
    setPending(true);

    try {
      await OneSignal.User.PushSubscription.optIn();
      await confirmSubscription();
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[NotificationOptIn] فشل إكمال الاشتراك:", error);
      }
      setPending(false);
    }
  };

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISS_STORAGE_KEY, "1");
    setDismissed(true);
  };

  const showCard = mounted && ready && pathname === "/" && !dismissed;

  if (!showCard) return null;

  // ترتيب الفحوصات مهم: iOS لازم تُفحص قبل pushSupported — سفاري iOS بره
  // وضع standalone بترجّع isPushSupported()=false، فلو فحصناها بعده كانت
  // رح تختفي البطاقة بصمت بدل ما تبين رسالة "ثبّت أولًا"
  const status: Status = isIOS && !isStandalone
    ? "ios-needs-install"
    : !pushSupported
      ? "unsupported"
      : permission === "denied"
        ? "denied"
        : permission === "default"
          ? "default"
          : optedIn === true && subscriptionId
            ? "subscribed"
            : "needs-optin";

  if (status === "unsupported") return null;
  if (status === "subscribed" && !justSubscribed) return null;

  let description: string;
  switch (status) {
    case "default":
      description =
        "احصل على إشعارات حول أيام الفحص المجاني للبشرة والشعر، والخدمات الجديدة، والمقالات الصحية المهمة.";
      break;
    case "subscribed":
      description =
        "تم التفعيل بنجاح — رح توصلك تنبيهات أيام الفحص المجاني والخدمات الجديدة والمقالات الصحية المهمة.";
      break;
    case "needs-optin":
      description = "المتصفح يسمح بالإشعارات، لكن الاشتراك يحتاج خطوة أخيرة بسيطة لإكماله.";
      break;
    case "denied":
      description =
        "تم حظر إذن الإشعارات من متصفحك. لتفعيلها، افتح إعدادات الموقع (Site settings) من المتصفح، فعّل الإشعارات (Notifications) لصيدلية عدنان، ثم أعد تحميل الصفحة.";
      break;
    case "ios-needs-install":
      description =
        "الإشعارات على آيفون تحتاج تثبيت الموقع أولًا: اضغط على زر المشاركة ثم اختر «إضافة إلى الشاشة الرئيسية»، بعدين افتح صيدلية عدنان من الأيقونة على شاشتك وفعّل الإشعارات من هناك.";
      break;
  }

  const title = status === "subscribed" ? "الإشعارات مفعّلة ✓" : "فعّل إشعارات صيدلية عدنان";

  return (
    <section className={styles.section} aria-labelledby="notification-optin-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.card}>
          {status !== "subscribed" && (
            <button
              type="button"
              className={styles.dismissBtn}
              onClick={handleDismiss}
              aria-label="إغلاق"
            >
              <X width={16} height={16} aria-hidden="true" />
            </button>
          )}

          <span className={styles.iconWrapper} aria-hidden="true">
            {status === "subscribed" ? (
              <CheckCircle2 width={22} height={22} className={styles.icon} />
            ) : (
              <Bell width={22} height={22} className={styles.icon} />
            )}
          </span>

          <div className={styles.content}>
            <h2 id="notification-optin-heading" className={styles.title}>
              {title}
            </h2>
            <p
              className={status === "denied" ? `${styles.description} ${styles.warningText}` : styles.description}
              aria-live="polite"
            >
              {description}
            </p>
          </div>

          {status === "default" && (
            <button type="button" className={styles.enableBtn} onClick={handleEnableClick} disabled={pending}>
              {pending ? "جارٍ التفعيل..." : "تفعيل الإشعارات"}
            </button>
          )}

          {status === "needs-optin" && (
            <button
              type="button"
              className={styles.completeBtn}
              onClick={handleCompleteOptInClick}
              disabled={pending}
            >
              {pending ? "جارٍ الإكمال..." : "إكمال التفعيل"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
