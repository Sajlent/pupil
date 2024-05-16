"use client";

import { FC, ReactElement, useCallback } from "react";

import { useModalContext } from "@/app/providers";
import { ButtonTypes } from "@/app/types/Forms";
import Button from "@/app/ui/forms/button/button";
import SendMessageForm from "@/app/ui/noticeboard/sendMessageForm/sendMessageForm.";

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
  const { setModal } = useModalContext();

  const setMessageModal = useCallback(
    (content: ReactElement) => {
      setModal({
        isOpen: true,
        content: content,
      });
    },
    [setModal]
  );

  return (
    <Button
      type={ButtonTypes.BUTTON}
      title="Zgłoś się"
      label="Zgłoś się"
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
