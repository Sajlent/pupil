export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  ICON = "icon",
  IMAGE = "image",
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
