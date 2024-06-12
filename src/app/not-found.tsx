"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "@/app/types/Forms";
import styles from "./page.module.scss";

import { useAuthContext } from "@/app/providers";

export default function NotFound() {
  const { currentUser } = useAuthContext();

  return (
    <div className={styles.notFound_container}>
      <Image src={"/images/404.png"} width={500} height={500} alt="404" />
      <h1>Strona nie została znaleziona.</h1>
      <Link href={currentUser ? "/noticeboard/" : "/"}>
        <Button type={ButtonTypes.BUTTON} title="Powrót" label="Powrót" />
      </Link>
    </div>
  );
}
