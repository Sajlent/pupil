"use client";

import { FC } from "react";
import Link from "next/link";
import AcceptButton from "@/app/ui/messages/acceptButton/acceptButton";
import RejectButton from "@/app/ui/messages/rejectButton/rejectButton";
import { IMessageData, RejectHandler } from "@/app/types/Message";

import styles from "./message.module.scss";

interface IMessageProps {
  data: IMessageData;
  rejectMessageHandler: RejectHandler;
}

const Message: FC<IMessageProps> = ({ data, rejectMessageHandler }) => {
  const { authorId, authorDisplayName, id, noticeTitle, message } = data || {};

  return (
    <article className={styles.root}>
      {noticeTitle && (
        <>
          <h2>Odpowiedź na Twoje ogłoszenie</h2>
          <p role="doc-subtitle">{noticeTitle}</p>
        </>
      )}
      <p>
        od:{" "}
        <Link href={`/noticeboard/user/${authorId}`}>{authorDisplayName}</Link>
      </p>
      <p>{message}</p>
      {/* TODO: Handle accepting */}
      <AcceptButton messageId={id} />
      <RejectButton
        messageId={id}
        rejectMessageHandler={rejectMessageHandler}
      />
    </article>
  );
};

export default Message;
