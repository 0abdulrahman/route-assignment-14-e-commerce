import { useContext, useEffect } from "react";
import styles from "./Brands.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { BrandsContext } from "../../context/BrandsContext";
import Button from "../../ui/Button/Button";
import { TbArrowNarrowLeft } from "react-icons/tb";
import Spinner from "../../ui/Spinner/Spinner";
import ProductsList from "../Products/ProductsList";

function Brand() {
  const { filteredProducts, getFilteredProducts, loading, error } = useContext(BrandsContext);
  const query = useSearchParams();
  const id = query[0].get("id");

  useEffect(() => {
    getFilteredProducts(id);
  }, [getFilteredProducts, id]);

  return (
    <section className={`container overflow-hidden py-2 ${styles.brands}`}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/brands">Brands</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {filteredProducts?.length > 0 && filteredProducts[0].brand.name}
          </li>
        </ol>
      </nav>
      <Button type="link" to=".." moreStyles={{ width: "fit-content" }} moreClasses="mb-3">
        <TbArrowNarrowLeft /> Go Back
      </Button>
      {loading && <Spinner />}
      {filteredProducts?.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : error ? (
        <p className="text-center text-danger my-5">Couldn't get the brands, please refresh the page.</p>
      ) : (
        <p className="fw-semibold text-center my-5">No products found for this brand.</p>
      )}
    </section>
  );
}

export default Brand;
