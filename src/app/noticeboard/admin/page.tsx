import { getCities, getNoticesList } from "@/app/lib/actions";
import { animalsOptionsSchema } from "@/app/lib/constans";
import Filters from "@/app/ui/noticeboard/filters/filters";

import styles from "./admin.module.scss";
import NoResults from "@/app/ui/noticeboard/noResults/noResults";
import ApplicateButton from "@/app/ui/noticeboard/adminAcceptNoticeButton/adminAcceptNoticeButton";
import NoticeList from "./noticelist";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getNoticesList(searchParams, true);
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
      <section className={styles.notices__section}>
        <h1>Lista ogłoszeń do akceptacji</h1>
        <div className={styles.aside}>
          <h2 className={styles.noticeCount}>
            Liczba ogłoszeń do akceptacji: {data.length}
          </h2>
          <Filters config={pageFilters} />
        </div>

        {data.length > 0 ? (
          <div className={styles.notices__container}>
            {" "}
            <NoticeList elements={data} />{" "}
          </div>
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}
