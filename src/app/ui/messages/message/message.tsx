"use client";

import { FC } from "react";
import Link from "next/link";

import { useAuthContext } from "@/app/providers";
import getAcceptedOfferText from "@/app/lib/getAcceptedOfferText";
import AcceptButton from "@/app/ui/messages/acceptButton/acceptButton";
import RejectButton from "@/app/ui/messages/rejectButton/rejectButton";
import {
  AcceptHandler,
  IMessageData,
  MessageStatus,
  MessageType,
  RejectHandler,
} from "@/app/types/Message";

import styles from "./message.module.scss";
import { UserType } from "@/app/types/User";

interface IMessageProps {
  data: IMessageData;
  acceptMessageHandler: AcceptHandler;
  rejectMessageHandler: RejectHandler;
}

const Message: FC<IMessageProps> = ({
  data,
  acceptMessageHandler,
  rejectMessageHandler,
}) => {
  const { currentUser } = useAuthContext();
  const {
    authorId,
    authorDisplayName,
    authorEmail,
    id,
    noticeTitle,
    message,
    status,
  } = data || {};
  const messageType =
    authorId === currentUser?.uid ? MessageType.SENT : MessageType.RECEIVED;

  if (!currentUser) return null;

  return (
    <article className={styles.root}>
      <div className={styles.message__box}>
        {noticeTitle && (
          <>
            <h2>Odpowiedź na ogłoszenie</h2>
            <p role="doc-subtitle">Temat: {noticeTitle}</p>
          </>
        )}
        {messageType === MessageType.RECEIVED && (
          <p>
            od:{" "}
            {currentUser.type === UserType.PETOWNER ? (
              <Link href={`/noticeboard/user/${authorId}`}>
                {authorDisplayName}
              </Link>
            ) : (
              <>{authorDisplayName}</>
            )}
          </p>
        )}
        <p>Wiadomość: {message}</p>
      </div>
      <div className={styles.actions}>
        {/* TODO: cleanup this ternary hell */}
        {status === MessageStatus.ACCEPTED ? (
          <p>
            {getAcceptedOfferText(currentUser.type, messageType, authorEmail)}
          </p>
        ) : messageType === MessageType.SENT ? (
          <p>Oferta oczekuje na akceptację.</p>
        ) : (
          <>
            <AcceptButton
              messageId={id}
              acceptMessageHandler={acceptMessageHandler}
            />
            <RejectButton
              messageId={id}
              rejectMessageHandler={rejectMessageHandler}
            />
          </>
        )}
      </div>
    </article>
  );
};

export default Message;
