export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

import { getCities, getPetsittersList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";
import NoResults from "@/app/ui/noticeboard/noResults/noResults";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "../../types/Forms";

import styles from "./petsitters.module.scss";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getPetsittersList(searchParams);
  const citiesOptions = await getCities();

  const pageFilters = [
    {
      id: "city",
      label: "Wybierz miasto",
      options: citiesOptions,
    },
    {
      id: "animal",
      label: "Wybierz zwierzę",
      options: animalsOptionsSchema,
    },
  ];

  return (
    <div className={styles.root}>
      <section className={styles.hero}>
        <div className={styles.hero__left}>
          <h1>Lista opiekunów</h1>
          <p className={styles.subtitle}>
            Przeglądaj profile opiekunów, dowiedz się więcej o nich i ich
            doświadczeniu oraz zgłaszaj swoją gotowość do opieki. Pomóż
            właścicielom zwierząt znaleźć najlepszą opiekę dla swoich pupilów.
          </p>
          <Link href="#opiekunowie">
            <Button
              type={ButtonTypes.BUTTON}
              title="Zobacz opiekunów"
              label="Zobacz opiekunów"
            />
          </Link>
        </div>

        <Image
          src={"/images/petsitter.jpg"}
          width={400}
          height={200}
          alt="Notice"
        />
      </section>
      <section id="opiekunowie" className={styles.petsitter__section}>
        <h1>Opiekunowie</h1>

        <div className={styles.aside}>
          <h2 className={styles.petsitterCount}>
            Liczba opiekunów: {data.length}
          </h2>
          <Filters config={pageFilters} />
        </div>
        {!!data.length ? (
          <div className={styles.petsitter__container}>
            {data.map((petsitter) => (
              <article key={petsitter.id} className={styles.petsitter}>
                <div>
                  <Image
                    src={petsitter.photo || "/images/icons/user.png"}
                    width={164}
                    height={164}
                    alt="Avatar placeholder"
                    className={styles.petsitter__photo}
                  />
                </div>
                <div className={styles.petsitter__info}>
                  <h2 className={styles.petsitter__info__name}>
                    {petsitter.displayName}
                  </h2>
                  <p>
                    {petsitter.firstname} {petsitter.lastname}
                  </p>
                  <p className={styles.petsitter__info__summary}>
                    {petsitter.summary}
                  </p>
                  {petsitter.city && (
                    <span className={styles.petsitter__info__city}>
                      <Image
                        src={"/images/location.png"}
                        className={styles.petsitter__info__city__icon}
                        width={24}
                        height={24}
                        alt="location"
                      />
                      {petsitter.city}
                    </span>
                  )}
                  <Link
                    href={`/noticeboard/user/${petsitter.id}`}
                    className={styles.petsitter__info__link}
                  >
                    Zobacz pełny profil
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}
