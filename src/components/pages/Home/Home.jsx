import MainSlider from "./MainSlider";
import img_1 from "../../../assets/images/photo-1546069901-ba9599a7e63c.jpg";
import img_2 from "../../../assets/images/parmesan-crumbed-chicken-schnitzel-fried-eggs-and-apple-cabbage-slaw-173352-2.jpg";
import styles from "./Home.module.css";
import CategoriesSlider from "./CategoriesSlider";
import ProductsList from "../../features/Products/ProductsList";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import axios from "axios";
import Spinner from "../../ui/Spinner/Spinner";

function Home() {
  const { products, setProducts } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(res.data.data);
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
      <section className={styles.mainSlider}>
        <MainSlider />
        <div className={styles.images}>
          <div style={{ width: "300px", height: "300px" }}>
            <img src={img_1} alt="Salad" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <img src={img_2} alt="Salad" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
          </div>
        </div>
      </section>
      <section className={`${styles.categoriesSlider} container`}>
        <CategoriesSlider />
      </section>
      <section className="container">
        {error && <p className="text-danger mb-0">Couldn't fetch the data</p>}
        {loading && <Spinner />}
        <ProductsList products={products} />
      </section>
    </>
  );
}

export default Home;
