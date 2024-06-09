"use client";

import { FC, ReactElement, useCallback, useEffect } from "react";

import { useAuthContext, useModalContext } from "@/app/providers";
import { ButtonTypes } from "@/app/types/Forms";
import Button from "@/app/ui/forms/button/button";
import SendMessageForm from "@/app/ui/noticeboard/sendMessageForm/sendMessageForm";
import { UserType } from "@/app/types/User";
import { acceptNotice } from "@/app/lib/actions";

interface IadminAcceptNoticeButtonProps {
  noticeId: string;
  noticeTitle: string;
  receiverId: string;
  handleClick: any;
}

const adminAcceptNoticeButton: FC<IadminAcceptNoticeButtonProps> = ({
  noticeId,
  handleClick
}) => {
  const { currentUser } = useAuthContext();
  const { type: userType, offerHistory } = currentUser || {};
  
  if (userType !== UserType.ADMIN) return null;
 
  return (
    <Button
      type={ButtonTypes.BUTTON}
      title="Akceptuj"
      label="Akceptuj"
      onClick={() =>handleClick(noticeId)}
    />
  );
};

export default adminAcceptNoticeButton;
