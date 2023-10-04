import axios from "axios";
import { userContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect, useCallback } = require("react");

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(userContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [cartOwner, setCartOwner] = useState(null);
  const navigate = useNavigate();

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
      setCart(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCart(productId) {
    try {
      setLoading(true);
      const res = await axios.delete(`${BASE_URL}/${productId}`, {
        headers: {
          token: user?.token,
        },
      });
      setCart(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    try {
      setLoading(true);
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: user?.token,
        },
      });
      setCart(null);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function changeQuantity(productId, count) {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/${productId}`,
        {
          count,
        },
        {
          headers: {
            token: user?.token,
          },
        }
      );
      setCart(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function checkout(formData) {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data?.data._id}?url=http://localhost:3000/route-assignment-14-e-commerce`,
        { shippingAddress: formData },
        {
          headers: {
            token: user?.token,
          },
        }
      );
      if (res.statusText === "OK") window.location.replace(res.data.session.url);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function cashPayment(formData) {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart?.data?.data._id}`,
        { shippingAddress: formData },
        {
          headers: {
            token: user?.token,
          },
        }
      );
      setCart(null);
      if (res.statusText === "Created") navigate("/allorders");
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  const getUserCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios(BASE_URL, {
        headers: {
          token: user?.token,
        },
      });
      setCart(res);
      setCartOwner(res.data.data.cartOwner);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`, {
        headers: {
          token: user?.token,
        },
      });
      setOrders(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [user?.token, cartOwner]);

  useEffect(() => {
    (async () => {
      await getUserCart();
    })();
  }, [getUserCart]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        changeQuantity,
        getUserCart,
        clearCart,
        checkout,
        getOrders,
        cashPayment,
        orders,
        loading,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
