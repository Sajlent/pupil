import Nav from '@/app/ui/noticeboard/nav/nav';
import styles from './noticeboard.module.scss';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Nav />
      <main className={styles.root}>{children}</main>
    </div>
  );
}
