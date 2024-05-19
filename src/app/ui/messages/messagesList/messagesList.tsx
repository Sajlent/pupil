"use client";

import { FC, useState } from "react";
import { acceptOffer, rejectOffer } from "@/app/lib/actions";
import Message from "@/app/ui/messages/message/message";
import { IMessageData, MessageStatus } from "@/app/types/Message";

interface IMessagesListProps {
  initialMessages: IMessageData[];
}

const MessagesList: FC<IMessagesListProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);

  function rejectMessageHandler(messageId: string) {
    rejectOffer(messageId);

    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  }

  function acceptMessageHandler(messageId: string) {
    acceptOffer(messageId);

    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            status: MessageStatus.ACCEPTED,
          };
        } else {
          return message;
        }
      });
    });
  }

  return messages.map((message) => (
    <Message
      key={message.id}
      data={message}
      acceptMessageHandler={acceptMessageHandler}
      rejectMessageHandler={rejectMessageHandler}
    />
  ));
};

export default MessagesList;
