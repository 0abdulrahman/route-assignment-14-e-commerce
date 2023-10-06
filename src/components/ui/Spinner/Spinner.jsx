import styles from "./Spinner.module.css";

function Spinner({ size = "full" }) {
  return (
    <div
      style={{
        width: size === "full" ? "100vw" : size,
        height: size === "full" ? "100vh" : size,
      }}
      className={styles.loaderContainer}
    >
      <span className={styles.loader}></span>
      <div className={styles.dotSpinner}>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
        <div className={styles.dotSpinner__dot}></div>
      </div>
    </div>
  );
}

export default Spinner;
