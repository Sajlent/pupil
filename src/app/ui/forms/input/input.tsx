import { FC } from "react";

import styles from "./input.module.scss";

interface IInputProps {
  defaultValue?: string;
  id: string;
  label: string;
  name: string;
  minLength?: number;
  placeholder?: string;
  required?: boolean;
  type: string;
}

const Input: FC<IInputProps> = ({
  defaultValue = "",
  id,
  label,
  name,
  minLength = 0,
  placeholder,
  required = false,
  type,
}) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className={styles.input}
          id={id}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={10}
        />
      ) : (
        <input
          className={styles.input}
          type={type}
          id={id}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />
      )}
    </>
  );
};

export default Input;
