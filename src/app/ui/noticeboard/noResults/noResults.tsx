import styles from "./noResults.module.scss";
import Image from "next/image";

export default function NoResults() {
  return (
    <div className={styles.info}>
      {/* <i className="lnr lnr-question-circle" /> */}

      <Image
        src={"/images/No-Results.png"}
        className={styles.image}
        width={512}
        height={512}
        alt="No result"
      />
      <h1>Brak wyników, zmień filtry.</h1>
    </div>
  );
}
