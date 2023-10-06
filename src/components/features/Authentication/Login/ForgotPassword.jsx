import { useContext, useState } from "react";
import Button from "../../../ui/Button/Button";
import styles from "./Login.module.css";
import { userContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";

function ForgotPassword() {
  const { forgotPassword, confirmResetCode, resetPassword, loading } = useContext(userContext);
  const [response, setResponse] = useState(null);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res =
      response?.status === "success"
        ? response?.data?.data?.status === "Success"
          ? await resetPassword(Object.fromEntries(formData))
          : await confirmResetCode(Object.fromEntries(formData).resetCode)
        : response?.data?.response?.data.message === "Reset code is invalid or has expired"
        ? await confirmResetCode(Object.fromEntries(formData).resetCode)
        : await forgotPassword(Object.fromEntries(formData).email);
    setResponse(res);
  }

  return (
    <section className="container mt-4">
      <div className={`${styles.form} mx-auto`}>
        <h2 className="text-center border-bottom border-bottom-1 pb-4">Forgot password</h2>
        <form onSubmit={handleSubmit}>
          {response?.status !== "success" &&
            response?.data?.response?.data.message !== "Reset code is invalid or has expired" && (
              <div className={`input-group mb-3 ${styles.inputGroup} ${styles.forgotInputGroup}`}>
                <label htmlFor="email" className="align-self-start mb-2">
                  Please enter your email:
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
          {response && response?.data?.data?.status !== "Success" && (
            <p className={`alert py-2 text-center ${response?.status === "error" ? "alert-danger" : "alert-success"}`}>
              {response?.status === "error"
                ? response?.data?.response?.data.message
                  ? response?.data?.response?.data.message
                  : "Something went wrong"
                : response?.data?.data?.message
                ? response?.data?.data.message
                : `Your password has been reset successfully!`}
              {response?.data?.data?.token && (
                <>
                  <Link to="/login" className="fw-semibold my-2 d-block">
                    Login now <BiLogInCircle style={{ fontSize: "1.25rem" }} />
                  </Link>
                </>
              )}
            </p>
          )}
          {((response?.status === "success" && response?.data?.data?.message === "Reset code sent to your email") ||
            response?.data?.response?.data.message === "Reset code is invalid or has expired") && (
            <div className={`input-group border-top pt-2 ${styles.inputGroup} ${styles.forgotInputGroup}`}>
              <label htmlFor="email" className="align-self-start mb-2">
                Please enter the code you've received:
              </label>
              <input name="resetCode" type="number" id="resetCode" placeholder="Reset Code" required />
            </div>
          )}
          {response?.status === "success" && response?.data?.data?.status === "Success" && (
            <div className={`input-group border-top pt-2 ${styles.inputGroup} ${styles.forgotInputGroup}`}>
              <label htmlFor="email" className="align-self-start mb-2">
                Enter your new password:
              </label>
              <input name="email" type="text" defaultValue={email} hidden />
              <input name="newPassword" type="password" id="newPassword" placeholder="New Password" className="mb-2" />
            </div>
          )}
          {!response?.data?.data?.token && (
            <Button type="submit" moreClasses="mx-auto px-4 mt-4" disabled={loading}>
              {loading ? "Loading..." : response?.data?.data?.status === "Success" ? "Reset password" : "Confirm"}
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
