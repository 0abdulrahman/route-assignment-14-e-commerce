import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  type = "button",
  handleClick = null,
  to = "/",
  disabled = false,
  moreStyles = null,
  moreClasses = "",
  children = "Submit",
}) {
  if (type === "link")
    return (
      <Link className={`${moreClasses} ${styles.button}`} to={to} style={moreStyles}>
        {children}
      </Link>
    );

  return (
    <button
      className={`${moreClasses} ${styles.button}`}
      type={type}
      onClick={handleClick}
      style={moreStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
