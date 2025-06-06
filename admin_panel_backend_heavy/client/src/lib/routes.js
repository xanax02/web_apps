import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Products from "pages/products";
import Customers from "pages/customers";
import Transactions from "pages/transactions";
import Geography from "pages/geography";
import Overview from "pages/overview";
import Daily from "pages/daily";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "geography",
        element: <Geography />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/daily",
        element: <Daily />,
      },
    ],
  },
]);
