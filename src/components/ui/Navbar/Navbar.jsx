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

function Navbar() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  function handleLogout() {
    setUser(null);
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
            </ul>
            <div className={`${styles.socials} d-flex align-items-center gap-4`}>
              <ul className="d-flex list-unstyled gap-3 fs-5 mb-0">
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
              <Link to="/cart" className={styles.cartButton} data-cart-items={cart?.data?.numOfCartItems}>
                <AiOutlineShoppingCart />
              </Link>
              {user ? (
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
