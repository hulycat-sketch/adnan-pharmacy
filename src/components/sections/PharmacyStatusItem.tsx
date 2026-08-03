"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import styles from "./Hero.module.css";

// ساعات العمل الحقيقية الموثّقة بـCONTACT.workingHours (constants.ts):
// يوميًا 9:00 صباحًا حتى 3:00 فجرًا، الثلاثاء مغلق بالكامل. هون بس بنحسب
// نفس الجدول ده حيّ حسب وقت زائر الموقع الفعلي بتوقيت الأردن (Asia/Amman)
const OPEN_HOUR = 9;
const CLOSE_HOUR = 3;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CLOSED_DAY = "Tue";

function isPharmacyOpenNow(): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Amman",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutesNow = hour * 60 + minute;

  const todayIndex = WEEKDAYS.indexOf(weekday);
  const yesterday = WEEKDAYS[(todayIndex + 6) % 7];

  if (minutesNow < CLOSE_HOUR * 60) {
    // 00:00–02:59: ذيل جلسة الأمس، إلا إذا الأمس كان الثلاثاء (ما في جلسة أصلًا)
    return yesterday !== CLOSED_DAY;
  }
  if (minutesNow < OPEN_HOUR * 60) {
    // 03:00–08:59: فجوة يومية بين الإغلاق والافتتاح
    return false;
  }
  // 09:00–23:59: جلسة اليوم، إلا إذا اليوم الثلاثاء
  return weekday !== CLOSED_DAY;
}

// useSyncExternalStore هو الـAPI الصحيح لهيك حالة: بتُقرأ من مصدر خارجي
// (ساعة الجهاز) وممكن تختلف بين تصيير السيرفر والعميل. أثناء SSR
// وأول تصيير عميل (hydration) بيستخدم getServerSnapshot (قيمة ثابتة
// موحّدة، بدون أي hydration mismatch)، وفورًا بعدها React بيتحقق من
// getSnapshot الحقيقي ويحدّث تلقائيًا بدون أي useEffect يدوي
function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

function getSnapshot(): boolean {
  return isPharmacyOpenNow();
}

function getServerSnapshot(): boolean {
  return true;
}

export default function PharmacyStatusItem() {
  const isOpen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const statusClass = isOpen ? styles.infoIconWrapOpen : styles.infoIconWrapClosed;
  const dotClass = isOpen ? styles.statusDotOpen : styles.statusDotClosed;

  return (
    <li className={styles.infoItem}>
      <span className={`${styles.infoIconWrap} ${statusClass}`} aria-hidden="true">
        <Clock width={18} height={18} strokeWidth={2} className={styles.infoIcon} />
      </span>
      <span className={styles.infoText} aria-live="polite">
        <span className={styles.infoValue}>
          <span className={`${styles.statusDot} ${dotClass}`} aria-hidden="true" />
          {isOpen ? "مفتوح الآن" : "مغلق الآن"}
        </span>
        <span className={styles.infoLabel}>
          {isOpen ? "يغلق 3:00 فجراً" : "يفتح 9:00 صباحًا"}
        </span>
      </span>
    </li>
  );
}
