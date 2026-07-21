import { Leaf } from "lucide-react";
import styles from "./LeafDivider.module.css";

/**
 * فاصل الورقة الموحّد — خطّان رفيعان حوالين أيقونة ورقة صغيرة بالنص.
 * مشترك بين Hero صفحة "نبذة عنا" وقسم "إرث يستمر" الختامي، حتى فتحة
 * الصفحة وخاتمتها يحسّوا بنفس الهوية البصرية بالضبط.
 */
export default function LeafDivider() {
  return (
    <span className={styles.divider} aria-hidden="true">
      <span className={styles.dividerLine} />
      <Leaf width={16} height={16} className={styles.dividerIcon} />
      <span className={styles.dividerLine} />
    </span>
  );
}
