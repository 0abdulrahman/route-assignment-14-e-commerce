import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const BrandsContext = createContext();

function BrandsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getBrands = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios("https://route-ecommerce.onrender.com/api/v1/brands?limit=50");
      setBrands(res.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilteredProducts = useCallback(async (id) => {
    try {
      setError("");
      setLoading(true);
      const res = await axios(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
      setFilteredProducts(res.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BrandsContext.Provider value={{ getBrands, getFilteredProducts, filteredProducts, brands, loading, error }}>
      {children}
    </BrandsContext.Provider>
  );
}

export default BrandsProvider;
