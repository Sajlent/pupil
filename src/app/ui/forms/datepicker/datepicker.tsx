"use client";

import { FC, useState } from "react";

import styles from "./datepicker.module.scss";

interface IDatepickerProps {
  id: string;
  label: string;
  name: string;
  min?: string;
  max?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// const options = { year: "numeric", month: "2-digit", day: "2-digit" };
// const formatDate = (date: unknown) => {
//   if (!(date instanceof Date)) return "";

//   return new Intl.DateTimeFormat(
//     "fr-CA",
//     options as Intl.DateTimeFormatOptions
//   ).format(date);
// };

const Datepicker: FC<IDatepickerProps> = ({
  id,
  label,
  name,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className={styles.date__container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type="date"
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
