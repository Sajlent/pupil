export interface IMessageBaseMeta {
  authorId: string;
  noticeId?: string;
  receiverId: string;
}

export interface IMessageData extends IMessageBaseMeta {
  authorDisplayName: string;
  id: string;
  noticeTitle?: string;
  message: string;
}

export type RejectHandler = (messageId: string) => void;
