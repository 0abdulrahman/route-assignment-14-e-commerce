import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import ProductItem from "./ProductItem";
import Spinner from "./../../ui/Spinner/Spinner";

function ProductsList({ products }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, getWishlist, wishlist, loading } = useContext(WishlistContext);

  function handleAddToCart(e, productId) {
    e.preventDefault();
    addToCart(productId);
  }

  function handleAddToWish(e, productId) {
    e.preventDefault();
    addToWishlist(productId);
  }

  function handleRemoveFromWishlist(e, productId) {
    e.preventDefault();
    removeFromWishlist(productId);
  }

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return (
    <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-6 g-4 list-unstyled">
      {loading && <Spinner />}
      {products?.map((product) => (
        <ProductItem
          product={product}
          key={product._id}
          handleAddToCart={handleAddToCart}
          handleAddToWish={handleAddToWish}
          handleRemoveFromWishlist={handleRemoveFromWishlist}
          wishlist={wishlist}
        />
      ))}
    </ul>
  );
}

export default ProductsList;
