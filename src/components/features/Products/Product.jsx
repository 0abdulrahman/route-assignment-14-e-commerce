import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from "./Products.module.css";
import { AiFillStar } from "react-icons/ai";
import Button from "../../ui/Button/Button";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Spinner from "../../ui/Spinner/Spinner";
import { FaCartPlus } from "react-icons/fa6";
import ProductSlider from "./ProductSlider";
import { ProductsContext } from "./../../context/ProductsContext";
import ProductsList from "./ProductsList";

function Product() {
  const product = useLoaderData();
  const { addToCart, loading } = useContext(CartContext);
  const { products, getProducts, loading: productsLoading } = useContext(ProductsContext);
  const relatedProducts = products?.filter((el) => product.category.name === el.category.name);

  useEffect(() => {
    if (products?.length > 0) return;
    getProducts();
  }, [products?.length, getProducts]);

  return (
    <section className="container mt-5">
      {(loading || productsLoading) && <Spinner />}

      <div className="row g-3 g-md-5">
        <div className="col-12 col-lg-4">
          <ProductSlider images={product.images} title={product.title} />
        </div>
        <div className="col-12 col-lg-8 d-flex flex-column">
          <h3 className="fw-semibold">{product.title}</h3>
          <p className="text-secondary">{product.description}</p>
          <p className="mb-1">
            <span className="fw-semibold">Category:</span> {product.category.name}
          </p>
          <p className="mb-1">
            <span className="fw-semibold">Sub-Category:</span>{" "}
            {product.subcategory.reduce((acc, curr, i, arr) => {
              if (i < arr.length - 1) {
                return (acc += `${curr.name} - `);
              } else {
                return (acc += `${curr.name}`);
              }
            }, "")}
          </p>
          <div className={`d-flex justify-content-between align-items-center ${styles.footer} mt-auto`}>
            {product.priceAfterDiscount && product.priceAfterDiscount !== product.price ? (
              <p className="mb-0 fw-semibold fs-2">
                <del className="text-secondary me-2 fw-normal text-danger text-opacity-75">{product.price}</del>
                <ins className="text-decoration-none">{product.priceAfterDiscount}</ins>{" "}
                <span className="fs-5 text-secondary">EGP</span>
              </p>
            ) : (
              <p className="mb-0 fw-semibold fs-2">
                {product.price} <span className="fs-5 text-secondary">EGP</span>
              </p>
            )}
            <span className="fs-3 d-flex align-items-center gap-2">
              <AiFillStar /> {product.ratingsAverage}{" "}
              <span className="fs-5 text-secondary fw-semibold">({product.ratingsQuantity})</span>
            </span>
          </div>
          <Button handleClick={() => addToCart(product._id)} moreClasses="mt-3">
            <FaCartPlus />
            Add to cart
          </Button>
        </div>
      </div>
      <hr className="my-5" />
      <div className="mt-5">
        <h3 className="border-bottom pb-2 mb-3">Related products:</h3>
        <ProductsList products={relatedProducts} />
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
