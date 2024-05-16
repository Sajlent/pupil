"use client";

import { FC } from "react";
import Button from "@/app/ui/forms/button/button";
import { ButtonTypes } from "@/app/types/Forms";

interface IAcceptButtonProps {
  messageId: string;
}

const AcceptButton: FC<IAcceptButtonProps> = ({ messageId }) => {
  return <Button type={ButtonTypes.BUTTON} title="Akceptuj" label="Akceptuj" />;
};

export default AcceptButton;
