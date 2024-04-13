import Image from "next/image";

import { getPetsittersList } from "@/app/lib/actions";

import styles from "./petsitters.module.scss";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getPetsittersList(searchParams);

  // TODO: server data fetching - add loading.js page
  return (
    <section className={styles.root}>
      <h1>Lista opiekunów</h1>
      {data.map((petsitter) => (
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
            <h2 className={styles.petsitter__name}>{petsitter.displayName}</h2>
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
      ))}
    </section>
  );
}
