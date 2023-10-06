import { useContext, useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { ProductsContext } from "../../context/ProductsContext";
import Spinner from "../../ui/Spinner/Spinner";

function Products() {
  const { products, getProducts, loading, error } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState(products);

  function handleChange(e) {
    const data = products.filter((el) => el.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredProducts(data);
  }

  useEffect(() => {
    if (products?.length > 0) return;
    getProducts();
  }, [products?.length, getProducts]);

  return (
    <>
      <form className="container mt-5 mb-4">
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
        <ProductsList products={filteredProducts || products} />
        {error && <p className="text-danger mb-0">Couldn't get the products, please refresh the page</p>}
        {loading && <Spinner />}
      </section>
    </>
  );
}

export default Products;
