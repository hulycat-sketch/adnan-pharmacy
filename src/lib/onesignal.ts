// =============================================================================
// onesignal.ts
// تهيئة OneSignal مشتركة — Promise واحد على مستوى الموديول، بحيث أي مكوّن
// (سواء المُهيّئ العام بالـlayout أو بطاقة تفعيل الإشعارات بالصفحة الرئيسية)
// بيشارك نفس التهيئة، بدون تكرارها أو الحاجة لتنسيق توقيت التركيب بينهم.
// بدون أي promptOptions أو notifyButton — يعني init() لحاله ما بيعرض أي
// نافذة إذن تلقائيًا؛ الإذن ما بينطلب إلا لما نستدعي
// OneSignal.Notifications.requestPermission() يدويًا بعد ضغطة المستخدم.
// =============================================================================

import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

let initPromise: Promise<void> | null = null;

export function initOneSignalOnce(): Promise<void> {
  if (!ONESIGNAL_APP_ID) return Promise.resolve();
  if (!initPromise) {
    initPromise = OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      serviceWorkerPath: "onesignal/OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/onesignal/" },
    });
  }
  return initPromise;
}

export function isOneSignalConfigured(): boolean {
  return Boolean(ONESIGNAL_APP_ID);
}
