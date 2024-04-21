"use client";

import { FC, ChangeEvent } from "react";

import styles from "./select.module.scss";

interface ISelectProps {
  defaultValue?: string | string[];
  id: string;
  label: string;
  name: string;
  multiple?: boolean;
  onChange?: (event: ChangeEvent) => void;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  required?: boolean;
}

const Select: FC<ISelectProps> = ({
  defaultValue = "",
  id,
  label,
  name,
  multiple = false,
  onChange,
  options,
  placeholder = "Wybierz...",
  required,
}) => {
  if (!Array.isArray(options)) return null;

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={`${styles.select} ${multiple ? styles["select--multiple"] : ""}`}
        defaultValue={defaultValue}
        id={id}
        name={name}
        multiple={multiple}
        required={required}
        onChange={onChange}
      >
        {!multiple && (
          <option className={styles.option} value="">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            className={styles.option}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
