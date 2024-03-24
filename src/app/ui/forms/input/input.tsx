import { FC } from 'react';

import styles from './input.module.scss';

interface IInputProps {
  defaultValue?: string;
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type: string;
}

const Input: FC<IInputProps> = ({
  defaultValue = '',
  id,
  label,
  name,
  required = false,
  type,
}) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {type === 'textarea' ? (
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
        />
      )}
    </>
  );
};

export default Input;
