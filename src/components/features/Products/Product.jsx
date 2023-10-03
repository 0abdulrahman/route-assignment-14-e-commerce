import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from "./Products.module.css";
import { AiFillStar } from "react-icons/ai";

function Product() {
  const product = useLoaderData();

  return (
    <section className="container mt-5">
      <div className="row g-3 g-md-5">
        <div className="col-12 col-md-4">
          <div className="overflow-hidden rounded-2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="img-fluid"
              style={{ transform: "scale(1.2)" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-8 d-flex flex-column">
          <h3 className="fw-semibold">{product.title}</h3>
          <p className="text-secondary">{product.description}</p>
          <p className="mb-1">
            <span className="fw-semibold">Category:</span> {product.category.name}
          </p>
          <div className={`d-flex justify-content-between align-items-center ${styles.footer} mt-auto`}>
            <p className="mb-0 fw-semibold fs-2">{product.price} EGP</p>
            <span className="fs-3">
              <AiFillStar /> {product.ratingsAverage}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function loader({ params }) {
  const res = await axios(`https://ecommerce.routemisr.com/api/v1/products/${params.productId}`);
  if (res.statusText === "OK") return res.data.data;
  return null;
}

export default Product;
