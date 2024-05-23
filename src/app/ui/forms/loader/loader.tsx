"use client";

import { useFormStatus } from "react-dom";

import styles from "./loader.module.scss";

const Loader = () => {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className={styles.root}>
      <div aria-label="Ładowanie" className={styles.loader} />
    </div>
  );
};

export default Loader;
