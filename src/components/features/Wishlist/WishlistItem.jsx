import { FiTrash2 } from "react-icons/fi";
import styles from "./Wishlist.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

function WishlistItem({ product }) {
  const { removeFromWishlist } = useContext(WishlistContext);

  function handleRemove(e) {
    e.preventDefault();
    removeFromWishlist(product._id);
  }

  return (
    <li className="col">
      <Link
        className="d-flex flex-column align-items-center gap-3 border rounded-2 p-2 h-100"
        to={`/products/${product._id}`}
      >
        <div className={`${styles.img} border overflow-hidden w-100`}>
          <img src={product.imageCover} alt="" style={{ scale: "1.1" }} />
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <h4 className="h6">
            {product.title.split(" ").length > 5
              ? `${product.title.split(" ").slice(0, 5).join(" ")}...`
              : product.title}
          </h4>
          <small style={{ lineHeight: "1" }} className="mb-2">
            {product.description.split(" ").length > 10
              ? `${product.description.split(" ").slice(0, 10).join(" ")}...`
              : product.description}
          </small>
          <button className="btn btn-danger mt-auto" onClick={handleRemove}>
            <FiTrash2 /> Remove
          </button>
        </div>
      </Link>
    </li>
  );
}

export default WishlistItem;
