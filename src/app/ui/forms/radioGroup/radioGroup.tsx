import { FC, Fragment } from "react";

import styles from "./radioGroup.module.scss";

interface IRadioGroupProps {
  fields: object;
  legend: string;
  name: string;
}

const RadioGroup: FC<IRadioGroupProps> = ({ legend, name, fields }) => {
  if (!Array.isArray(fields)) return null;

  return (
    <fieldset className={styles.radio}>
      <legend className={styles.radio__legend}>{legend}</legend>
      {fields.map((field) => (
        <div className={styles.radio__field} key={field.id}>
          <input
            className={styles.radio__input}
            type="radio"
            id={field.id}
            name={name}
            value={field.value}
          />
          <label className={styles.radio__label} htmlFor={field.id}>
            {field.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
