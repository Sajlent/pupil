import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import styles from './select.module.scss';

interface ISelectProps {
  defaultValue?: string | string[];
  id: string;
  label: string;
  name: string;
  multiple?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  // register: UseFormRegister<FieldValues>;
}

const Select: FC<ISelectProps> = ({
  defaultValue = '',
  id,
  label,
  name,
  multiple = false,
  options,
  required,
  // register,
}) => {
  if (!Array.isArray(options)) return null;

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={`${styles.select} ${multiple ? styles['select--multiple'] : ''}`}
        defaultValue={defaultValue}
        name={name}
        multiple={multiple}
        required={required}
      >
        {!multiple && (
          <option className={styles.option} value="">
            Wybierz...
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
