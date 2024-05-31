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
      <header className={styles.header}>
        <h1>Lista ogłoszeń do akceptacji</h1>
      </header>
      <aside className={styles.aside}>
        <Filters config={pageFilters} />
      </aside>
      <section>
        {data.length > 0 ? (
          <NoticeList elements={data} />
        ) : (
          <NoResults />
        )}
      </section>
    </div>
  );
}
