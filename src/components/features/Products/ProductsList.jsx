import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProductsList({ products }) {
  const { addToCart } = useContext(CartContext);

  async function handleAddToCart(e, productId) {
    e.preventDefault();
    const res = await addToCart(productId);
    console.log(res);
  }

  function handleAddToWish(e) {
    e.preventDefault();
    console.log("clicked");
  }

  return (
    <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 list-unstyled">
      {products?.map((product) => (
        <li key={product._id} className={`${styles.product} col`}>
          <Link to={`/products/${product._id}`}>
            <div className={`${styles.productImg} mb-2`}>
              <img src={product.images[0]} alt={product.title} className="objectFit-cover" />
            </div>
            <div className={styles.text}>
              <small className="main-color">{product.subcategory[0].name}</small>
              <h4 className="h6 mb-3">
                {product.title.split(" ").length > 4
                  ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
                  : product.title}
              </h4>
              <div className={`d-flex justify-content-between align-items-center ${styles.footer}`}>
                <p className="mb-0 fw-semibold">{product.price} EGP</p>
                <span>
                  <AiFillStar /> {product.ratingsAverage}
                </span>
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.addToCart} onClick={(e) => handleAddToCart(e, product._id)}>
                <button>
                  <IoMdAdd />
                </button>{" "}
                <small>Add to cart</small>
              </div>
              <div className={styles.addToWish} onClick={handleAddToWish}>
                <button>
                  <FaHeartCirclePlus />
                </button>{" "}
                <small>Add to wishlist</small>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
