// TODO: add nicer loading component

import styles from "./noticeboard.module.scss";
const Loading = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default Loading;
