"use client";

import { FC, useState } from "react";
import { rejectMessage } from "@/app/lib/actions";
import Message from "@/app/ui/messages/message/message";
import { IMessageData } from "@/app/types/Message";

interface IMessagesListProps {
  initialMessages: IMessageData[];
}

const MessagesList: FC<IMessagesListProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  function rejectMessageHandler(messageId: string) {
    // TODO: check if revalidation is needed
    rejectMessage(messageId);

    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  }

  return messages.map((message) => (
    <Message
      key={message.id}
      data={message}
      rejectMessageHandler={rejectMessageHandler}
    />
  ));
};

export default MessagesList;
