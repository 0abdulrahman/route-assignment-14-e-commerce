import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Home, { loader as homeLoader } from "./components/pages/Home/Home";
import Products from "./components/pages/Products/Products";
import Register from "./components/pages/Register/Register";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home />, loader: homeLoader },
        { path: "/products", element: <Products /> },
        { path: "/register", element: <Register /> },
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
