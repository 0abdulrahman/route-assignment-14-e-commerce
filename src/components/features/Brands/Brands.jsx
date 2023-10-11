import { useContext, useEffect } from "react";
import { BrandsContext } from "../../context/BrandsContext";
import styles from "./Brands.module.css";
import Spinner from "../../ui/Spinner/Spinner";
import { Link } from "react-router-dom";

function Brands() {
  const { brands, getBrands, loading, error } = useContext(BrandsContext);

  useEffect(() => {
    if (brands?.length > 0) return;
    getBrands();
  }, [getBrands, brands?.length]);

  return (
    <section className={`container ${styles.brands} `}>
      {loading && <Spinner />}
      <div>
        <h2 className="py-3 border-bottom pb-2 m-2">Brands</h2>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-6 g-2 py-2">
          {brands?.map((brand) => (
            <div className="col" key={brand._id}>
              <Link
                className={`bg-white d-flex flex-column h-100 border rounded-2 overflow-hidden ${styles.brand}`}
                to={`${brand.slug}?id=${brand._id}`}
              >
                <div className={styles.img} role="img">
                  <img src={brand.image} alt={brand.name} className="w-100" />
                </div>
                <h3 className="h6 d-flex justify-content-center align-items-center border-top m-0 py-2">
                  {brand.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
        {error && <p className="text-center text-danger my-5">Couldn't get the categories, please refresh the page.</p>}
      </div>
    </section>
  );
}

export default Brands;
