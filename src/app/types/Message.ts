export enum MessageStatus {
  ACCEPTED = "accepted",
  PENDING = "pending",
  REJECTED = "rejected",
}

export enum MessageType {
  RECEIVED,
  SENT,
}

export interface IMessageBaseMeta {
  authorId: string;
  noticeId?: string;
  receiverId: string;
  status: MessageStatus;
}

export interface IMessageData extends IMessageBaseMeta {
  authorDisplayName: string;
  authorEmail: string;
  id: string;
  noticeTitle?: string;
  message: string;
  receiverEmail: string;
  status: MessageStatus;
}

export type RejectHandler = (messageId: string) => void;
export type AcceptHandler = (messageId: string) => void;
