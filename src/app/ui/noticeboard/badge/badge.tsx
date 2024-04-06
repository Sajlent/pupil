import { FC } from "react";
import Image from "next/image";

import styles from "./badge.module.scss";

interface IBadgeProps {
  label: string;
  icon: string;
  alt: string;
}

const Badge: FC<IBadgeProps> = ({ label, icon, alt }) => (
  <div className={styles.badge}>
    <Image src={`/images/icons/${icon}`} height={32} width={32} alt={alt} />
    <span className={styles.badge__label}>{label}</span>
  </div>
);

export default Badge;
