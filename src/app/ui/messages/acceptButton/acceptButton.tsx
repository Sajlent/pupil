"use client";

import { FC } from "react";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "@/app/types/Forms";
import { AcceptHandler } from "@/app/types/Message";

interface IAcceptButtonProps {
  messageId: string;
  acceptMessageHandler: AcceptHandler;
}

const AcceptButton: FC<IAcceptButtonProps> = ({
  messageId,
  acceptMessageHandler,
}) => {
  return (
    <Button
      type={ButtonTypes.BUTTON}
      title="Akceptuj"
      label="Akceptuj"
      onClick={() => acceptMessageHandler(messageId)}
    />
  );
};

export default AcceptButton;
