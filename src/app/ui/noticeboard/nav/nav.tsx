"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { useAuthContext } from "@/app/providers";
import { auth } from "@/app/scripts/firebase";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";
import Image from "next/image";
import Logo from "../../../../../public/images/logo pupil.png";

import styles from "./nav.module.scss";
import { UserType } from "@/app/types/User";

const navLinks = [
  { name: "Strona główna", href: "/noticeboard" },
  { name: "Ogłoszenia", href: "/noticeboard/notices" },
  { name: "Opiekunowie", href: "/noticeboard/petsitters" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function signOutUser() {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}
      >
        <ul className={styles.nav__list}>
          <li className={styles.logo}>
            <Image src={Logo} width={150} height={82} alt="Logo Pupil" />
          </li>
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`${styles.nav__item} ${pathname === link.href ? styles.active : ""}`}
            >
              <Link href={link.href} onClick={handleLinkClick}>
                {link.name}
              </Link>
            </li>
          ))}
          {!!currentUser && (
            <li className={styles.user}>
              <div className={styles.right_side}>
                <span className={styles.user__displayName}>
                  {currentUser.displayName}
                  <span className={styles.user__type}>{currentUser.type}</span>
                </span>
                <div className={styles.icons}>
                  {currentUser.type === UserType.PETSITTER && (
                    <Link
                      href={`/noticeboard/user/${currentUser.uid}`}
                      onClick={handleLinkClick}
                    >
                      <Button
                        title="Profil"
                        type={ButtonTypes.BUTTON}
                        image="/images/user.png"
                        variant={ButtonVariants.IMAGE}
                      />
                    </Link>
                  )}
                  <Link
                    href={`/noticeboard/messages/${currentUser.uid}`}
                    onClick={handleLinkClick}
                  >
                    <Button
                      title="Wiadomości"
                      type={ButtonTypes.BUTTON}
                      image="/images/envelope.png"
                      variant={ButtonVariants.IMAGE}
                    />
                  </Link>
                  <Button
                    variant={ButtonVariants.IMAGE}
                    image="/images/log-out.png"
                    title="Wyloguj się"
                    type={ButtonTypes.BUTTON}
                    onClick={() => {
                      handleLinkClick();
                      signOutUser();
                    }}
                  />
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className={styles.hamburger_menu}>
          <div>
            <Image src={Logo} width={76} height={50} alt="Logo Pupil" />
          </div>
          <div className={styles.bar_container} onClick={toggleMobileMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={toggleMobileMenu}></div>
      )}
    </>
  );
}
