import { FiTrash2 } from "react-icons/fi";
import styles from "./Cart.module.css";
import Button from "../../ui/Button/Button";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

function CartItem({ cartItem }) {
  return (
    <li className="row border-bottom border-1 py-2">
      <div className="col-10">
        <div className="d-flex gap-3">
          <div className={styles.img}>
            <img src={cartItem.product.imageCover} alt="" />
          </div>
          <div className="d-flex flex-column">
            <h3 className="h4">{cartItem.product.title}</h3>
            <p>
              <span className="fw-semibold">Price:</span> {cartItem.price} EGP
            </p>
            <button className="btn btn-danger mt-auto me-auto">
              <FiTrash2 /> Remove
            </button>
          </div>
        </div>
      </div>
      <div className="col-2 d-flex align-align-items-center justify-content-end">
        <div className="d-flex gap-2 gap-sm-3 align-items-center">
          <Button
            moreStyles={{
              "--color": "var(--main-color)",
              "--background-color": "#fff",
              width: "calc(30px + 0.5vw)",
              height: "calc(30px + 0.5vw)",
              padding: 0,
              flexShrink: 0,
            }}
            moreClasses="d-flex justify-content-center align-items-center"
          >
            <IoMdRemoveCircle className="fs-5" />
          </Button>
          <span className="h4">{cartItem.count}</span>
          <Button
            moreStyles={{
              "--color": "var(--main-color)",
              "--background-color": "#fff",
              width: "calc(30px + 0.5vw)",
              height: "calc(30px + 0.5vw)",
              padding: 0,
              flexShrink: 0,
            }}
            moreClasses="d-flex justify-content-center align-items-center"
          >
            <IoMdAddCircle className="fs-5" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
