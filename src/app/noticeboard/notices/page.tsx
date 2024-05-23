import { getCities, getNoticesList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";
import calcutatePassedDays from "@/app/lib/calculatePassedDays";

import styles from "./notices.module.scss";
import NoResults from "@/app/ui/noticeboard/noResults/noResults";
import ApplicateButton from "@/app/ui/noticeboard/applyToNoticeButton/applyToNoticeButton";

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
              <div className={styles.notice__info}>
                <span className={styles.notice__detail}>
                  <i className="lnr lnr-clock" />
                  Dodano {calcutatePassedDays(notice.createdAt)} dni temu
                </span>
                <span className={styles.notice__detail}>
                  <i className="lnr lnr-map-marker" />
                  {notice.city}
                </span>
                <span className={styles.notice__detail}>
                  <i className="lnr lnr-calendar-full" />W dniach:{" "}
                  {notice.startDate} - {notice.endDate}
                </span>
              </div>
              <p className={styles.notice__description}>{notice.description}</p>
              <div className={styles.notice__actions}>
                <ApplicateButton
                  noticeId={notice.id}
                  noticeTitle={notice.title}
                  receiverId={notice.ownerId}
                />
              </div>
            </article>
          ))
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}
