import { useContext, useEffect } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import Spinner from "../../ui/Spinner/Spinner";

function Categories() {
  const { getCategories, getSubCategories, categories, subCategories, loading, error } = useContext(CategoriesContext);

  useEffect(() => {
    if (categories?.length > 0 && subCategories?.length > 0) return;
    getCategories();
    getSubCategories();
  }, [getCategories, getSubCategories, categories?.length, subCategories?.length]);

  return (
    <section className={`container ${styles.categories} `}>
      {loading && <Spinner />}
      <div>
        <h2 className="py-3 px-1 border-bottom pb-2 m-2">Categories</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-2 p-2">
          {categories?.map((category) => {
            const hasSubCategories = subCategories?.filter((subCat) => subCat.category === category._id).length > 0;
            if (category.name === "Music") return "";
            return (
              <div className="row g-3 m-0" key={category._id}>
                <div className="border rounded-2 overflow-hidden p-0 d-flex flex-column flex-md-row">
                  <div className={`${hasSubCategories ? "col-12 col-md-6" : "col-12"} mb-0`}>
                    <Link
                      className={`bg-white d-flex flex-column h-100 border-end ${styles.category}`}
                      to={`${category.slug}?type=cat&id=${category._id}`}
                    >
                      <div
                        className={styles.img}
                        style={{ backgroundImage: `url(${category.image})` }}
                        role="img"
                      ></div>
                      <h3 className="h6 d-flex justify-content-center align-items-center border-top m-0 py-2">
                        {category.name}
                      </h3>
                    </Link>
                  </div>
                  {hasSubCategories ? (
                    <ul className={`bg-white col-12 col-md-6 mb-0 ${styles.subCategories}`}>
                      {subCategories
                        ?.filter((subCat) => subCat.category === category._id)
                        ?.map((subCat) => (
                          <li key={subCat._id}>
                            <Link to={`${subCat.slug}?type=subCat&id=${subCat._id}`}>{subCat.name}</Link>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {error && <p className="text-center text-danger my-5">Couldn't get the categories, please refresh the page.</p>}
      </div>
    </section>
  );
}

export default Categories;
