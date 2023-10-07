import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metaData, setMetaData] = useState(null);

  const getProducts = useCallback(async (page = 1) => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
      setProducts(res.data.data);
      setMetaData(res.data.metadata);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ getProducts, products, metaData, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
