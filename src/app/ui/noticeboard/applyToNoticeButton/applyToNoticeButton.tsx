"use client";

import { FC, ReactElement, useCallback, useEffect } from "react";

import { useAuthContext, useModalContext } from "@/app/providers";
import { ButtonTypes } from "@/app/types/Forms";
import Button from "@/app/ui/forms/button/button";
import SendMessageForm from "@/app/ui/noticeboard/sendMessageForm/sendMessageForm";
import { UserType } from "@/app/types/User";

interface IApplyToNoticeButtonProps {
  noticeId: string;
  noticeTitle: string;
  receiverId: string;
}

const ApplyToNoticeButton: FC<IApplyToNoticeButtonProps> = ({
  noticeId,
  noticeTitle,
  receiverId,
}) => {
  const { currentUser } = useAuthContext();
  const { setModal } = useModalContext();
  const { type: userType, offerHistory } = currentUser || {};
  const alreadySent =
    Array.isArray(offerHistory) && offerHistory.includes(noticeId);

  const setMessageModal = useCallback(
    (content: ReactElement) => {
      setModal({
        isOpen: true,
        content: content,
      });
    },
    [setModal]
  );

  if (userType !== UserType.PETSITTER) return null;

  return (
    <Button
      type={ButtonTypes.BUTTON}
      title="Zgłoś się"
      label="Zgłoś się"
      disabled={alreadySent}
      onClick={() =>
        setMessageModal(
          <SendMessageForm
            title={noticeTitle}
            receiverId={receiverId}
            noticeId={noticeId}
          />
        )
      }
    />
  );
};

export default ApplyToNoticeButton;
