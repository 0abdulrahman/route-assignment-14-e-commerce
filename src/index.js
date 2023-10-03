import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Home from "./components/pages/Home/Home";
import ProductsLayout from "./components/pages/Products/ProductsLayout";
import Register from "./components/features/Authentication/Register/Register";
import Login, { action as loginAction } from "./components/features/Authentication/Login/Login";
import Products from "./components/features/Products/Products";
import Product, { loader as productLoader } from "./components/features/Products/Product";
import Cart from "./components/features/Cart/Cart";

const router = createBrowserRouter(
  [
    {
      element: <App />,
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
        { path: "cart", element: <Cart /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login />, action: loginAction },
      ],
    },
  ],
  { basename: "/route-assignment-14-e-commerce" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
