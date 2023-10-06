import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(res.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ getProducts, products, loading, error }}>{children}</ProductsContext.Provider>
  );
}

export default ProductsProvider;
