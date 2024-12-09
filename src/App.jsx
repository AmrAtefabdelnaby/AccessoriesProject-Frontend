import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import SingleProductPage from "./pages/singleProductPage/SingleProductPage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import "./style/main.scss";
import Cart from "./pages/cart/Cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CategoryContext,
  CategoryProvider,
} from "./suggestedProductBasedOnCategory/SuggestedProductContext";
import { CartProvider } from "./Context/cartContext/CartContext";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n/i18n";
import AboutUs from "./pages/aboutUs/AboutUs";
export default function App() {
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/product/:id", element: <SingleProductPage /> },
        { path: "/Register", element: <Register /> },
        { path: "/Login", element: <Login /> },
        { path: "/cart", element: <Cart /> },
        { path: "*", element: <ErrorPage /> },
        { path: "/AboutUS", element: <AboutUs /> },
      ],
    },
  ]);
  const queryClient = new QueryClient();



  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <CategoryProvider>
            <RouterProvider router={Routes} />
          </CategoryProvider>
        </CartProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
