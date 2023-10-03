import axios from "axios";
import { userContext } from "./UserContext";

const { createContext, useContext, useState, useEffect, useCallback } = require("react");

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(userContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  async function addToCart(productId) {
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL,
        { productId },
        {
          headers: {
            token: user?.token,
          },
        }
      );
      console.log(res);
      setCart(res.data.data);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart() {}

  async function changeQuantity() {}

  const getUserCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios(BASE_URL, {
        headers: {
          token: user?.token,
        },
      });
      console.log(res);
      setCart(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    (async () => {
      await getUserCart();
    })();
  }, [getUserCart]);

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, changeQuantity, getUserCart, loading, cart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
