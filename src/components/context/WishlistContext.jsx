import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import { userContext } from "./UserContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

function WishlistProvider({ children }) {
  const { user } = useContext(userContext);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWishlist = useCallback(async () => {
    if (!user?.token) return;
    try {
      setLoading(true);
      const res = await axios(BASE_URL, {
        headers: {
          token: user?.token,
        },
      });
      setWishlist(res);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  const removeFromWishlist = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        await axios.delete(`${BASE_URL}/${productId}`, {
          headers: {
            token: user?.token,
          },
        });
        getWishlist();
        toast.success("Product has been removed from your wishlist");
      } catch (error) {
        toast.error("Something went wrong");
        return error;
      } finally {
        setLoading(false);
      }
    },
    [user?.token, getWishlist]
  );

  const addToWishlist = useCallback(
    async (productId) => {
      if (!user?.token) {
        toast.error("Please login first");
        return;
      }
      try {
        setLoading(true);
        await axios.post(
          BASE_URL,
          {
            productId,
          },
          {
            headers: {
              token: user?.token,
            },
          }
        );
        toast.success("Product has been added to your wishlist");
        getWishlist();
      } catch (error) {
        toast.error("Something went wrong");
        return error;
      } finally {
        setLoading(false);
      }
    },
    [user?.token, getWishlist]
  );

  return (
    <WishlistContext.Provider value={{ getWishlist, addToWishlist, removeFromWishlist, wishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
