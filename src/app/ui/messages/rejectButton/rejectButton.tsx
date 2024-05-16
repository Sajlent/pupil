"use client";

import { FC } from "react";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes, ButtonVariants } from "@/app/types/Forms";
import { RejectHandler } from "@/app/types/Message";

interface IRejectButtonProps {
  messageId: string;
  rejectMessageHandler: RejectHandler;
}

const RejectButton: FC<IRejectButtonProps> = ({
  messageId,
  rejectMessageHandler,
}) => {
  return (
    <Button
      type={ButtonTypes.BUTTON}
      variant={ButtonVariants.TERTIARY}
      title="Odrzuć"
      label="Odrzuć"
      onClick={() => {
        rejectMessageHandler(messageId);
      }}
    />
  );
};

export default RejectButton;
