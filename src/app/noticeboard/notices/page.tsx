export const dynamic = "force-dynamic";

import { getCities, getNoticesList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";
import calcutatePassedDays from "@/app/lib/calculatePassedDays";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "../../types/Forms";

import styles from "./notices.module.scss";
import NoResults from "@/app/ui/noticeboard/noResults/noResults";
import ApplicateButton from "@/app/ui/noticeboard/applyToNoticeButton/applyToNoticeButton";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getNoticesList(searchParams, false);

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
          <h1>Lista ogłoszeń</h1>
          <p className={styles.subtitle}>
            Witaj w naszej aplikacji, która łączy właścicieli zwierząt z
            opiekunami. Jeśli chcesz zaoferować swoją pomoc w opiece nad
            zwierzętami, jesteś we właściwym miejscu. Przeglądaj ogłoszenia,
            zgłaszaj swoją gotowość do opieki i pomóż właścicielom zwierząt,
            zapewniając ich pupilom najlepszą opiekę.
          </p>
          <Link href="#ogloszenia">
            <Button
              type={ButtonTypes.BUTTON}
              title="Zobacz ogłoszenia"
              label="Zobacz ogłoszenia"
            />
          </Link>
        </div>

        <Image
          src={"/images/ogłoszenia.jpg"}
          width={400}
          height={200}
          alt="Notice"
        />
      </section>

      <section id="ogloszenia" className={styles.notices__section}>
        <h1>Ogłoszenia</h1>
        <div className={styles.aside}>
          <h2 className={styles.noticeCount}>Liczba ogłoszeń: {data.length}</h2>
          <Filters config={pageFilters} />
        </div>

        {!!data.length ? (
          <div className={styles.notices__container}>
            {data.map((notice) => (
              <article key={notice.id} className={styles.notice}>
                <h2>{notice.title}</h2>
                <div className={styles.notice__info}>
                  <span className={styles.notice__detail}>
                    <Image
                      src={"/images/time.png"}
                      className={styles.notice__icon}
                      width={18}
                      height={18}
                      alt="clock"
                    />
                    Dodano {calcutatePassedDays(notice.createdAt)} dni temu
                  </span>
                  <span className={styles.notice__detail}>
                    <Image
                      src={"/images/location.png"}
                      className={styles.notice__icon}
                      width={24}
                      height={24}
                      alt="location"
                    />
                    {notice.city}
                  </span>
                  <span className={styles.notice__detail}>
                    <Image
                      src={"/images/calendar.png"}
                      className={styles.notice__icon}
                      width={24}
                      height={24}
                      alt="Calendar"
                    />
                    W dniach:{""}
                    {notice.startDate} - {notice.endDate}
                  </span>
                </div>
                <p className={styles.notice__description}>
                  {notice.description}
                </p>
                <div className={styles.notice__actions}>
                  <ApplicateButton
                    noticeId={notice.id}
                    noticeTitle={notice.title}
                    receiverId={notice.ownerId}
                  />
                </div>
                <Image
                  src={"/images/advert.png"}
                  width={54}
                  height={54}
                  alt="Advert icon"
                  className={styles.notice__advert_icon}
                />
              </article>
            ))}{" "}
          </div>
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}
