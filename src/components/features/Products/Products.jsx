import { useContext, useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { ProductsContext } from "../../context/ProductsContext";
import axios from "axios";
import Spinner from "../../ui/Spinner/Spinner";

function Products() {
  const { products, setProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  function handleChange(e) {
    const data = products.filter((el) => el.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredProducts(data);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (products.length > 0) return;
    getProducts();
  }, [setProducts, products.length]);

  return (
    <>
      <form className="container mt-5 mb-5">
        <div className="form-group">
          <label htmlFor="search" className="visually-hidden">
            Search for a product
          </label>
          <input
            type="search"
            className="form-control"
            id="search"
            placeholder="Search for a product"
            onChange={handleChange}
          />
        </div>
      </form>
      <section className="container">
        <ProductsList products={filteredProducts} />
        {error && <p className="text-danger mb-0">Couldn't fetch the data</p>}
        {loading && <Spinner />}
      </section>
    </>
  );
}

export default Products;
