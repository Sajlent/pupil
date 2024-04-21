import Image from "next/image";
import Link from "next/link";

import { getCities, getPetsittersList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";

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
      <header className={styles.header}>
        <h1>Lista opiekunów</h1>
      </header>
      <aside className={styles.aside}>
        <Filters config={pageFilters} />
      </aside>
      <section>
        {!!data.length ? (
          data.map((petsitter) => (
            <article key={petsitter.id} className={styles.petsitter}>
              <div>
                <Image
                  src={petsitter.photo || "/images/icons/user.png"}
                  width={128}
                  height={128}
                  alt="Avatar placeholder"
                  className={styles.petsitter__photo}
                />
              </div>
              <div>
                <h2 className={styles.petsitter__name}>
                  {petsitter.displayName}
                </h2>
                <p>
                  {petsitter.firstname} {petsitter.lastname}
                </p>
                <p className={styles.petsitter__summary}>{petsitter.summary}</p>
                {petsitter.city && (
                  <span className={styles.petsitter__city}>
                    <i className="lnr lnr-map-marker" />
                    {petsitter.city}
                  </span>
                )}
                <Link
                  href={`/noticeboard/user/${petsitter.id}`}
                  className={styles.petsitter__link}
                >
                  Zobacz pełny profil
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className={styles.info}>
            <i className="lnr lnr-question-circle" />
            Brak wyników, zmień filtry.
          </p>
        )}
      </section>
    </div>
  );
}
