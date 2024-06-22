import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Products from "pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);
