import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import styles from './input.module.scss';

interface IInputProps {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type: string;
  register: UseFormRegister<FieldValues>;
}

const Input: FC<IInputProps> = ({
  id,
  label,
  name,
  required = false,
  type,
  register,
}) => (
  <>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    <input
      className={styles.input}
      type={type}
      id={id}
      {...register(name, { required: 'dupa' })}
    />
  </>
);

export default Input;
