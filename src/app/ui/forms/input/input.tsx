import { FC } from "react";

import styles from "./input.module.scss";

interface IInputProps {
  defaultValue?: string;
  id: string;
  label: string;
  name: string;
  minLength?: number;
  required?: boolean;
  type: string;
}

const Input: FC<IInputProps> = ({
  defaultValue = "",
  id,
  label,
  name,
  minLength = 0,
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
          required={required}
          minLength={minLength}
        />
      )}
    </>
  );
};

export default Input;
