"use client";

import { FC, ReactElement, useCallback } from "react";

import { useModalContext } from "@/app/providers";
import { ButtonTypes } from "@/app/types/Forms";
import Button from "@/app/ui/forms/button/button";
import SendMessageForm from "@/app/ui/noticeboard/sendMessageForm/sendMessageForm";

interface RequestPetCareButtonProps {
  receiverDisplayName: string;
  receiverId: string;
}

const RequestPetCareButton: FC<RequestPetCareButtonProps> = ({
  receiverDisplayName,
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
      label="Zapytaj mnie o możliwość opieki"
      title="Zapytaj mnie o możliwość opieki"
      onClick={() =>
        setMessageModal(
          <SendMessageForm
            receiverId={receiverId}
            receiverDisplayName={receiverDisplayName}
          />
        )
      }
    />
  );
};

export default RequestPetCareButton;
