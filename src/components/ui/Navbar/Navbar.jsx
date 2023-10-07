import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/freshcart-logo.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import Button from "../Button/Button";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

function Navbar() {
  const user = useContext(userContext);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  function handleLogout() {
    user?.setUser(null);
    toast.success("Logged out successfully");
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <header className="fixed-top bg-body-tertiary">
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              {user?.user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/wishlist">
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/allorders">
                      Orders
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className={`${styles.socials} mt-5 mt-lg-0 d-flex align-items-center gap-4 flex-wrap`}>
              <ul className="d-flex list-unstyled gap-3 fs-5 mb-0 me-auto me-lg-0">
                <li>
                  <a href="https://www.instagram.com">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com">
                    <FaLinkedin />
                  </a>
                </li>
              </ul>
              {user?.user && (
                <Link
                  to="/cart"
                  className={styles.cartButton}
                  data-cart-items={cart?.cart?.data?.numOfCartItems ? cart?.cart?.data?.numOfCartItems : ""}
                >
                  <AiOutlineShoppingCart />
                </Link>
              )}
              {user?.user ? (
                <Button
                  handleClick={handleLogout}
                  moreStyles={{
                    "--color": "var(--main-color)",
                    "--background-color": "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <BiLogOutCircle style={{ fontSize: "1.25rem" }} /> Logout
                </Button>
              ) : (
                <Button
                  moreStyles={{
                    "--color": "var(--main-color)",
                    "--background-color": "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                  type="link"
                  to="/login"
                >
                  <BiLogInCircle style={{ fontSize: "1.25rem" }} />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
