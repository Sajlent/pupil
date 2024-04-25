import { getCities, getNoticesList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";

import styles from "./notices.module.scss";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getNoticesList(searchParams);
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
        <h1>Lista ogłoszeń</h1>
      </header>
      <aside className={styles.aside}>
        <Filters config={pageFilters} />
      </aside>
      <section>
        {!!data.length ? (
          data.map((notice) => (
            <article key={notice.id} className={styles.notice}>
              <h2>{notice.title}</h2>
              <p>
                {/* TODO: calculate days passed from date */}
                {Math.floor(
                  (new Date() - new Date(notice.createdAt)) /
                    1000 /
                    60 /
                    60 /
                    24
                ) + " day(s) ago"}
              </p>
              <p className={styles.notice__description}>{notice.description}</p>
              <p>
                W dniach: {notice.startDate} - {notice.endDate}
                <span className={styles.notice__city}>
                  <i className="lnr lnr-map-marker" />
                  {notice.city}
                </span>
              </p>
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
