import MainSlider from "./MainSlider";
import img_1 from "../../../assets/images/photo-1546069901-ba9599a7e63c.jpg";
import img_2 from "../../../assets/images/parmesan-crumbed-chicken-schnitzel-fried-eggs-and-apple-cabbage-slaw-173352-2.jpg";
import styles from "./Home.module.css";
import CategoriesSlider from "./CategoriesSlider";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import ProductsList from "../../features/Products/ProductsList";

function Home() {
  const products = useLoaderData();

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
        <ProductsList products={products} />
      </section>
    </>
  );
}

export async function loader() {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  const {
    data: { data },
  } = res;

  return data;
}

export default Home;
