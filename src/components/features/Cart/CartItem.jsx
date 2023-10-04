import { FiTrash2 } from "react-icons/fi";
import styles from "./Cart.module.css";
import Button from "../../ui/Button/Button";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartItem({ cartItem }) {
  const { removeFromCart, changeQuantity } = useContext(CartContext);

  return (
    <li className="row border-bottom border-1 py-2">
      <div className="col-10">
        <div className="d-flex gap-3">
          <div className={styles.img}>
            <img src={cartItem.product.imageCover} alt="" />
          </div>
          <div className="d-flex flex-column">
            <h3 className="h5">{cartItem.product.title}</h3>
            <p>
              <span className="fw-semibold">Price:</span> {cartItem.price} EGP
            </p>
            <button className="btn btn-danger mt-auto me-auto" onClick={() => removeFromCart(cartItem.product._id)}>
              <FiTrash2 /> Remove
            </button>
          </div>
        </div>
      </div>
      <div className="col-2 d-flex  align-align-items-center justify-content-end">
        <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 align-items-center">
          <Button
            moreStyles={{
              "--color": "#fff",
              "--background-color": "var(--main-color)",
              width: "calc(30px + 0.5vw)",
              height: "calc(30px + 0.5vw)",
              padding: 0,
              flexShrink: 0,
            }}
            moreClasses="d-flex justify-content-center align-items-center"
            handleClick={() => changeQuantity(cartItem.product._id, cartItem.count + 1)}
          >
            <IoMdAddCircle className="fs-5" />
          </Button>
          <span className="h4 mb-0">{cartItem.count}</span>
          <Button
            moreStyles={{
              "--color": "#fff",
              "--background-color": "var(--main-color)",
              width: "calc(30px + 0.5vw)",
              height: "calc(30px + 0.5vw)",
              padding: 0,
              flexShrink: 0,
            }}
            moreClasses="d-flex justify-content-center align-items-center"
            handleClick={() => {
              if (cartItem.count === 1) {
                removeFromCart(cartItem.product._id);
                return;
              }
              changeQuantity(cartItem.product._id, cartItem.count - 1);
            }}
          >
            <IoMdRemoveCircle className="fs-5" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
