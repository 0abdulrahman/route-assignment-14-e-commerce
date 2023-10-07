import axios from "axios";
import { userContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const { createContext, useContext, useState, useEffect, useCallback } = require("react");

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(userContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const addToCart = useCallback(
    async (productId) => {
      if (!user?.token) {
        toast.error("Please login first");
        return;
      }
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
        toast.success("Product has been added to your cart");
        setCart(res);
      } catch (error) {
        toast.error("Something went wrong");
        return error;
      } finally {
        setLoading(false);
      }
    },
    [user?.token]
  );

  async function removeFromCart(productId) {
    try {
      setLoading(true);
      const res = await axios.delete(`${BASE_URL}/${productId}`, {
        headers: {
          token: user?.token,
        },
      });
      toast.success("Product removed successfully");
      setCart(res);
    } catch (error) {
      toast.error("Something went wrong");
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
      toast.success("Cart cleared successfully");
      setCart(null);
    } catch (error) {
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function checkout(formData) {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data?.data._id}?url=${window.location.origin}${window.location.pathname}#}`,
        { shippingAddress: formData },
        {
          headers: {
            token: user?.token,
          },
        }
      );
      if (res.statusText === "OK") window.location.replace(res.data.session.url);
    } catch (error) {
      toast.error("Something went wrong");
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
      toast.success("Order successfully made");
      if (res.statusText === "Created") navigate("/allorders");
    } catch (error) {
      toast.error("Something went wrong");
      return error;
    } finally {
      setLoading(false);
    }
  }

  const getUserCart = useCallback(async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const res = await axios(BASE_URL, {
        headers: {
          token: user?.token,
        },
      });
      setCart(res);
      localStorage.setItem("cartOwner", res?.data?.data.cartOwner);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cartOwner")}`,
        {
          headers: {
            token: user?.token,
          },
        }
      );
      setOrders(res);
    } catch (error) {
      return error;
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
