import Button from "../../../ui/Button/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../context/UserContext";
import styles from "./Register.module.css";
import SmallSpinner from "../../../ui/SmallSpinner/SmallSpinner";

function Register() {
  const [error, setError] = useState("");
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string("Your name must be a string")
      .min(3, "Your name must be at least 3 characters")
      .max(30, "Your name can't exceed 30 characters")
      .required("Your name is required"),
    email: Yup.string("Your Email must be a string").email("Invalid Email").required("Your Email is required"),
    phone: Yup.string("Your phone must be a string")
      .matches(/^(\+2)?0(10|11|12|15)[0-9]{8}$/, "Invalid phone number, only egyptian numbers are allowed")
      .required("Your phone number is required"),
    password: Yup.string("Your password must be a string")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#^!%*?&]{8,}$/,
        "Your password must at least contain 1 uppercase letter, 1 lowercase letter and 1 number, and must be 8 characters at least"
      )
      .required("A password is required"),
    rePassword: Yup.string("Password confirmation must be a string")
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    onReset: handleReset,
  });

  function handleReset() {
    formik.setValues(initialValues);
    formik.setErrors(initialValues);
    formik.setTouched({
      name: false,
      email: false,
      phone: false,
      password: false,
      rePassword: false,
    });
    setError("");
  }

  async function handleSubmit(values) {
    try {
      setLoading(true);
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.errors?.msg) {
        setError(error.response.data.errors.msg);
      } else if (error?.response?.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mt-5">
      <form
        method="POST"
        className={`d-flex flex-column gap-3 ${styles.form}`}
        style={{ maxWidth: "50rem" }}
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-center border-bottom border-bottom-1 pb-4">Create an account</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid" : ""}`}
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="invalid-feedback mb-0">{formik.errors.name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="invalid-feedback mb-0">{formik.errors.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            className={`form-control ${formik.errors.phone && formik.touched.phone ? "is-invalid" : ""}`}
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="invalid-feedback mb-0">{formik.errors.phone}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="invalid-feedback mb-0">{formik.errors.password}</p>
        </div>
        <div className="form-group">
          <label htmlFor="rePassword">Password confirmation:</label>
          <input
            type="password"
            className={`form-control ${formik.errors.rePassword && formik.touched.rePassword ? "is-invalid" : ""}`}
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="invalid-feedback mb-0">{formik.errors.rePassword}</p>
        </div>
        {error && <p className="alert alert-danger py-1 text-center mb-0">{error}</p>}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button moreClasses="px-4" type="submit" disabled={!formik.isValid || !formik.dirty || loading}>
            {loading ? <SmallSpinner /> : "Create"}
          </Button>
          <Button
            moreStyles={{ "--color": "var(--main-color)", "--background-color": "#fff" }}
            type="reset"
            handleClick={handleReset}
          >
            Clear
          </Button>
        </div>
        <p className="small text-center mt-4 mb-0">
          Already have an account?{" "}
          <Link style={{ color: "var(--main-color)", fontWeight: "500" }} to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
