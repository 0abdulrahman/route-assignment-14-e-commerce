import styles from "./Cart.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import Button from "../../ui/Button/Button";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../../ui/Spinner/Spinner";

function Checkout() {
  const { checkout, cashPayment, loading } = useContext(CartContext);
  const [payWithCash, setPayWithCash] = useState(false);

  async function handleSubmit(values) {
    if (payWithCash) {
      await cashPayment(values);
      return;
    }
    await checkout(values);
  }

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Your phone is required"),
    city: Yup.string().required("Your city is required"),
    details: Yup.string().required("Your address is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className={`container ${styles.form}`} onSubmit={formik.handleSubmit}>
      {loading && <Spinner />}
      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <label htmlFor="phone">
            <BsFillTelephoneFill />
          </label>
          <input
            name="phone"
            type="tel"
            id="phone"
            placeholder="Phone number"
            aria-label="Phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.phone && formik.touched.phone && <small className="text-danger">{formik.errors.phone}</small>}
      </div>
      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <label htmlFor="city">
            <BiSolidCity />
          </label>
          <input
            name="city"
            id="city"
            placeholder="City"
            aria-label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.city && formik.touched.city && <small className="text-danger">{formik.errors.city}</small>}
      </div>
      <div>
        <div className={`input-group ${styles.inputGroup}`}>
          <textarea
            name="details"
            placeholder="Please provide your address"
            aria-label="Address"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        {formik.errors.details && formik.touched.details && (
          <small className="text-danger">{formik.errors.details}</small>
        )}
      </div>
      <div className="paymentMethod">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={false}
            id="payWithCash"
            onChange={(e) => setPayWithCash(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="payWithCash">
            Pay with cash
          </label>
        </div>
      </div>
      <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Continue
      </Button>
    </form>
  );
}

export default Checkout;
