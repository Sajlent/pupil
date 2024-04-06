"use client";

import { useEffect } from "react";

import { useNotificationContext } from "@/app/providers";
import { NotificationTypes } from "@/app/types/Forms";

import styles from "./toast.module.scss";

const icons = {
  [NotificationTypes.ERROR]: "cross-circle",
  [NotificationTypes.INFO]: "question-circle",
  [NotificationTypes.SUCCESS]: "checkmark-circle",
  [NotificationTypes.WARNING]: "warning",
};

const Toast = () => {
  const { notification, setNotification } = useNotificationContext();

  // TODO: add notification hide after a time
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setNotification(null);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  if (!notification) return null;

  return (
    <div
      className={`${styles.root} ${styles[`toast--${notification.type}`]}`}
      onClick={() => {
        setNotification(null);
      }}
    >
      <i className={`${styles.icon} lnr lnr-${icons[notification.type]}`}></i>
      <span>{notification.text}</span>
    </div>
  );
};

export default Toast;
