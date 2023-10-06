import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const CategoriesContext = createContext();

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const getCategories = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios(`${BASE_URL}/categories`);
      setCategories(res.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubCategories = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios("https://route-ecommerce.onrender.com/api/v1/subcategories?limit=50");
      setSubCategories(res.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilteredProducts = useCallback(async (params) => {
    try {
      setError("");
      setLoading(true);
      const res = await axios(`https://ecommerce.routemisr.com/api/v1/products${params}`);
      setFilteredProducts(res.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        getCategories,
        getSubCategories,
        getFilteredProducts,
        filteredProducts,
        categories,
        subCategories,
        loading,
        error,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
