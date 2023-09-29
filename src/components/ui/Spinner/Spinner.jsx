import styles from "./Spinner.module.css";

function Spinner({ size = "full" }) {
  return (
    <div
      style={{
        width: size === "full" ? "100vw" : size,
        height: size === "full" ? "100vh" : size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className={styles.loader}>Load&nbsp;ng</span>
    </div>
  );
}

export default Spinner;
