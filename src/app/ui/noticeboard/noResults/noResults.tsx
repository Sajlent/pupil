import styles from "./noResults.module.scss";

export default function NoResults() {
  return (
    <p className={styles.info}>
      <i className="lnr lnr-question-circle" />
      Brak wyników, zmień filtry.
    </p>
  );
}
