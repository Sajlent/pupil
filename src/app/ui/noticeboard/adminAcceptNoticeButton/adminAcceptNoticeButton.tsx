"use client";

import { FC } from "react";

import { useAuthContext } from "@/app/providers";
import { ButtonTypes } from "@/app/types/Forms";
import Button from "@/app/ui/forms/button/button";
import { UserType } from "@/app/types/User";

interface IadminAcceptNoticeButtonProps {
  noticeId: string;
  noticeTitle: string;
  receiverId: string;
  handleClick: any;
}

const AdminAcceptNoticeButton: FC<IadminAcceptNoticeButtonProps> = ({
  noticeId,
  handleClick,
}) => {
  const { currentUser } = useAuthContext();
  const { type: userType } = currentUser || {};

  if (userType !== UserType.ADMIN) return null;

  return (
    <Button
      type={ButtonTypes.BUTTON}
      title="Akceptuj"
      label="Akceptuj"
      onClick={() => handleClick(noticeId)}
    />
  );
};

export default AdminAcceptNoticeButton;
