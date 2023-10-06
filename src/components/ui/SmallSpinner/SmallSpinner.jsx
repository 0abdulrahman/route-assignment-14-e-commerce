import styles from "./SmallSpinner.module.css";

function SmallSpinner({ fontSize = "1.5rem" }) {
  return (
    <div className={styles.spinner} style={{ fontSize }}>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
      <div className={styles.spinnerBlade}></div>
    </div>
  );
}

export default SmallSpinner;
