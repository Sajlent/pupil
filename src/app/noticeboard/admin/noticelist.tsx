"use client";

import { INoticeData } from "@/app/types/Notice";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import calcutatePassedDays from "@/app/lib/calculatePassedDays";

import ApplicateButton from "@/app/ui/noticeboard/adminAcceptNoticeButton/adminAcceptNoticeButton";
import styles from "./admin.module.scss";
import { acceptNotice } from "@/app/lib/actions";
import Image from "next/image";

interface IPageNoticeList {
  elements: INoticeData[];
}

export default function NoticeList({ elements = [] }: IPageNoticeList) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleClick(id: string) {
    await acceptNotice(id);
    startTransition(() => {
      router.refresh();
    });
  }

  return elements.map((notice) => (
    <article key={notice.id} className={styles.notice}>
      <h2>{notice.title}</h2>
      <div className={styles.notice__info}>
        <span className={styles.notice__detail}>
          <i className="lnr lnr-clock" />
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
          W dniach: {notice.startDate} - {notice.endDate}
        </span>
      </div>
      <p className={styles.notice__description}>{notice.description}</p>
      <div className={styles.notice__actions}>
        <ApplicateButton
          noticeId={notice.id}
          noticeTitle={notice.title}
          receiverId={notice.ownerId}
          handleClick={handleClick}
        />
      </div>
    </article>
  ));
}
