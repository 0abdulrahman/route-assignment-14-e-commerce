import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductsList from "../Products/ProductsList";
import { CategoriesContext } from "../../context/CategoriesContext";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Categories.module.css";
import Button from "../../ui/Button/Button";
import { TbArrowNarrowLeft } from "react-icons/tb";

function Category() {
  const { filteredProducts, getFilteredProducts, loading, error } = useContext(CategoriesContext);
  const query = useSearchParams();
  const type = query[0].get("type");
  const id = query[0].get("id");

  useEffect(() => {
    if (type === "cat") {
      getFilteredProducts(`?category=${id}`);
    } else {
      getFilteredProducts(`?subcategory=${id}`);
    }
  }, [getFilteredProducts, id, type]);

  return (
    <section className={`container overflow-hidden py-2 ${styles.categoryProducts}`}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/categories">Categories</Link>
          </li>
          {type === "cat" ? (
            <li className="breadcrumb-item active" aria-current="page">
              {filteredProducts?.length > 0 && filteredProducts[0].category.name}
            </li>
          ) : (
            <>
              <li className="breadcrumb-item" aria-current="page">
                <Link
                  to={`/categories/${filteredProducts?.length > 0 && filteredProducts[0]?.category.slug}?type=cat&id=${
                    filteredProducts?.length > 0 && filteredProducts[0]?.category._id
                  }`}
                >
                  {filteredProducts?.length > 0 && filteredProducts[0]?.category.name}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {filteredProducts?.length > 0 && filteredProducts[0]?.subcategory[0].name}
              </li>
            </>
          )}
        </ol>
      </nav>
      <Button type="link" to=".." moreStyles={{ width: "fit-content" }} moreClasses="mb-3">
        <TbArrowNarrowLeft /> Go Back
      </Button>
      {loading && <Spinner />}
      {filteredProducts?.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : error ? (
        <p className="text-center text-danger my-5">Couldn't get the categories, please refresh the page.</p>
      ) : (
        <p className="fw-semibold text-center my-5">No products found for this category.</p>
      )}
    </section>
  );
}

export default Category;
