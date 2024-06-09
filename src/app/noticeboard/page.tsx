"use client";

import Link from "next/link";
import { useAuthContext } from "@/app/providers";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "../types/Forms";
import { UserType } from "@/app/types/User";
import Image from "next/image";
import styles from "./noticeboard.module.scss";

export default function Page() {
  const { currentUser } = useAuthContext();
  const { type } = currentUser || {};

  return (
    <section>
      <div className={styles.home_page_container}>
        <div className={styles.text_container}>
          <h1>
            Witaj na naszej platformie skupiającej się na opiece nad
            zwierzętami!
          </h1>

          {type === UserType.PETOWNER && (
            <article>
              <h3>Poszukujesz opiekuna dla swojego zwierzaka?</h3>
              <p>
                Znajdź idealną osobę, która zadba o Twojego pupila, gdy będzie
                to konieczne.
              </p>
              <Link href="/noticeboard/notices/add">
                <Button
                  type={ButtonTypes.BUTTON}
                  title="Dodaj ogłoszenie"
                  label="Dodaj ogłoszenie"
                />
              </Link>
            </article>
          )}
          {type === UserType.PETSITTER && (
            <article>
              <h3>Szukasz możliwości zarobku opiekując się zwierzętami?</h3>
              <p>
                Przejrzyj dostępne ogłoszenia i znajdź zwierzaka, którym możesz
                zaopiekować się w czasie nieobecności opiekuna.
              </p>
              <Link href="/noticeboard/notices">
                <Button
                  type={ButtonTypes.BUTTON}
                  title="Przeglądaj ogłoszenia"
                  label="Przeglądaj ogłoszenia"
                />
              </Link>
            </article>
          )}
          {type === UserType.ADMIN && (
            <article>
              <h3>Przeglądaj ogłoszenia do akceptacji</h3>
              <p>
                Sprawdź nowe ogłoszenia i zaakceptuj je, aby zostały
                opublikowane na stronie.
              </p>
              <Link href="/noticeboard/admin">
                <Button
                  type={ButtonTypes.BUTTON}
                  title="Sprawdź ogłoszenia"
                  label="Sprawdź ogłoszenia"
                />
              </Link>
            </article>
          )}
        </div>
        <div className={styles.image_container}>
          <Image
            src="/images/Strona główna 1.png"
            width={700}
            height={360}
            alt="Cat"
          />
        </div>
      </div>
    </section>
  );
}
