import { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartContext";
import Spinner from "../../ui/Spinner/Spinner";

function Cart() {
  const { cart, getUserCart, loading } = useContext(CartContext);

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
    </section>
  );
}

export default Cart;
