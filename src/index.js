import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Home from "./components/pages/Home/Home";
import ProductsLayout from "./components/pages/ProductsLayout";
import Register from "./components/features/Authentication/Register/Register";
import Login, { action as loginAction } from "./components/features/Authentication/Login/Login";
import Products from "./components/features/Products/Products";
import Product, { loader as productLoader } from "./components/features/Products/Product";
import Cart from "./components/features/Cart/Cart";
import CartLayout from "./components/pages/CartLayout";
import Checkout from "./components/features/Cart/Checkout";
import Orders from "./components/features/Cart/Orders";
import Wishlist from "./components/features/Wishlist/Wishlist";
import ForgotPassword from "./components/features/Authentication/Login/ForgotPassword";
import NotFound from "./components/pages/NotFound";
import AuthGuard from "./components/features/Authentication/AuthGuard";
import CategoriesLayout from "./components/pages/CategoriesLayout";
import Categories from "./components/features/Categories/Categories";
import Category from "./components/features/Categories/Category";
import BrandsLayout from "./components/pages/BrandsLayout";
import Brands from "./components/features/Brands/Brands";
import Brand from "./components/features/Brands/Brand";
import Error from "./components/ui/Error";

const router = createHashRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: ":productId", element: <Product />, loader: productLoader },
        ],
      },
      {
        path: "categories",
        element: <CategoriesLayout />,
        children: [
          { index: true, element: <Categories /> },
          { path: ":categorySlug", element: <Category /> },
        ],
      },
      {
        path: "brands",
        element: <BrandsLayout />,
        children: [
          { index: true, element: <Brands /> },
          { path: ":brandId", element: <Brand /> },
        ],
      },
      {
        path: "cart",
        element: (
          <AuthGuard>
            <CartLayout />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
        ],
      },
      {
        path: "wishlist",
        element: (
          <AuthGuard>
            <Wishlist />
          </AuthGuard>
        ),
      },
      {
        path: "allorders",
        element: (
          <AuthGuard>
            <Orders />
          </AuthGuard>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login />, action: loginAction },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
