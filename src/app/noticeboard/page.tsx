"use client";

import Link from "next/link";

import { useAuthContext } from "@/app/providers";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "../types/Forms";
import { UserType } from "@/app/types/User";

export default function Page() {
  const { currentUser } = useAuthContext();
  const { type } = currentUser || {};

  return (
    <section>
      <h1>Strona główna</h1>
      {type === UserType.PETOWNER && (
        <article>
          <h3>Nowe ogłoszenie</h3>
          <p>Dodaj nowe zapytanie o opiekę</p>
          <Link href="/noticeboard/notices/add">
            <Button type={ButtonTypes.BUTTON} title="Dodaj" label="Dodaj" />
          </Link>
        </article>
      )}
      {type === UserType.ADMIN && (
        <article>
          <h3>Ogłoszenia do akceptacji</h3>
          <p>Zaakceptuj nowe ogłoszenie</p>
          <Link href="/noticeboard/admin">
            <Button type={ButtonTypes.BUTTON} title="Sprawdź" label="Sprawdź" />
          </Link>
        </article>
      )}
     
    </section>
  );
}
