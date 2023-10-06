import { Form, Link, useActionData, useNavigate, useNavigation } from "react-router-dom";
import styles from "./Login.module.css";
import { MdAlternateEmail } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import Button from "../../../ui/Button/Button";
import axios from "axios";
import { useContext, useEffect } from "react";
import { userContext } from "../../../context/UserContext";
import SmallSpinner from "../../../ui/SmallSpinner/SmallSpinner";

function Login() {
  const { state } = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData();
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (actionData?.status === "success") {
      setUser(actionData.data);
      localStorage.setItem("userToken", actionData.data.token);
    }
  }, [actionData?.status, actionData?.data, setUser, navigate, user]);

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  return (
    <Form className={`container ${styles.form}`} method="POST">
      <h2 className="text-center border-bottom border-bottom-1 pb-4">Login</h2>

      <div className={`input-group ${styles.inputGroup}`}>
        <label htmlFor="email">
          <MdAlternateEmail />
        </label>
        <input name="email" type="email" id="email" placeholder="Email" aria-label="Email" required />
      </div>
      <div className={`input-group ${styles.inputGroup}`}>
        <label htmlFor="password">
          <BsShieldLockFill />
        </label>
        <input name="password" type="password" id="password" placeholder="Password" aria-label="Password" required />
      </div>
      {actionData?.status === "error" && <small className="alert alert-danger py-2 m-0">{actionData?.data}</small>}
      <Button type="submit" moreClasses="mx-auto px-4 mt-4" disabled={state === "submitting"}>
        {state === "submitting" ? <SmallSpinner /> : "Login"}
      </Button>
      <div>
        <p className="small text-center mt-2 mb-2">
          <Link style={{ color: "var(--main-color)", fontWeight: "500" }} to="/forgot-password">
            Forgot my password
          </Link>
        </p>
        <p className="small text-center mb-0">
          Don't have an account?{" "}
          <Link style={{ color: "var(--main-color)", fontWeight: "500" }} to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data);
    return { status: "success", data: res.data };
  } catch (err) {
    return { status: "error", data: err?.response?.data?.message };
  }
}

export default Login;
