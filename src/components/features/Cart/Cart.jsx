import { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartContext";
import Spinner from "../../ui/Spinner/Spinner";
import Button from "../../ui/Button/Button";
import { FiTrash2 } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";

function Cart() {
  const { cart, getUserCart, clearCart, loading } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      await getUserCart();
    })();
  }, [getUserCart]);

  return (
    <section className={`container ${styles.cart}`}>
      {loading && <Spinner />}
      <h2 className="fw-semibold">Shopping Cart</h2>
      <p className={styles.price}>
        Total cart price: <span>{cart?.data?.data.totalCartPrice} EGP</span>
      </p>
      <ul className="d-flex flex-column">
        {cart?.data?.data?.products.map((product) => (
          <CartItem cartItem={product} key={product._id} />
        ))}
      </ul>
      {cart?.data?.numOfCartItems > 0 && (
        <div className="d-flex justify-content-between">
          <button className="btn btn-danger" onClick={clearCart}>
            <FiTrash2 /> Clear cart
          </button>
          <Button type="link" to="checkout">
            <IoBagCheckOutline /> Checkout
          </Button>
        </div>
      )}
    </section>
  );
}

export default Cart;
