import Link from "next/link";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "../types/Forms";

export default function Page() {
  return (
    <section>
      <h1>Strona główna</h1>
      {/* TODO: make visible only to owners */}
      <article>
        <h3>Nowe ogłoszenie</h3>
        <p>Dodaj nowe zapytanie o opiekę</p>
        <Link href="/noticeboard/notices/add">
          <Button type={ButtonTypes.BUTTON} title="Dodaj" label="Dodaj" />
        </Link>
      </article>
    </section>
  );
}
