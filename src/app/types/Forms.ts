export enum ButtonVariants {
  PRIMARY = "primary",
  ICON = "icon",
}

export enum ButtonTypes {
  BUTTON = "button",
  RESET = "reset",
  SUBMIT = "submit",
}

export interface FormSchema {
  [fieldName: string]: string | string[] | File;
}

export enum NotificationTypes {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}
