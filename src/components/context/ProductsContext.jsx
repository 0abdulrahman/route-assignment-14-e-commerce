import { createContext, useState } from "react";

export const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
}

export default ProductsProvider;
