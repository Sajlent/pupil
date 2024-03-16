import Image from 'next/image';

import styles from './badge.module.scss';

const Badge = ({ label, icon, alt }) => (
  <div className={styles.badge}>
    <Image src={`/images/icons/${icon}`} height={32} width={32} alt={alt} />
    <span className={styles.badge__label}>{label}</span>
  </div>
);

export default Badge;
