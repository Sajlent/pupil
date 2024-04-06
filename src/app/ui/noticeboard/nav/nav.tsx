"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { useAuthContext } from "@/app/providers";
import { auth } from "@/app/scripts/firebase";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";

import styles from "./nav.module.scss";

const navLinks = [
  { name: "Strona główna", href: "/noticeboard" },
  { name: "Ogłoszenia", href: "/noticeboard/notices" },
  { name: "Opiekunowie", href: "/noticeboard/petsitters" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuthContext();

  async function signOutUser() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("error", error);
        // Maybe toast message?
      });
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {navLinks.map((link) => (
          <li key={link.name} className={styles.nav__item}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        {!!currentUser && (
          <li className={styles.user}>
            <span className={styles.user__displayName}>
              {currentUser.displayName}
              <span className={styles.user__type}>{currentUser.type}</span>
            </span>
            <Link href={`/noticeboard/user/${currentUser.uid}`}>
              <Button
                title="Profil"
                type={ButtonTypes.BUTTON}
                icon="user"
                variant={ButtonVariants.ICON}
              />
            </Link>
            <Button
              title="Wyloguj się"
              type={ButtonTypes.BUTTON}
              icon="exit"
              variant={ButtonVariants.ICON}
              onClick={signOutUser}
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
