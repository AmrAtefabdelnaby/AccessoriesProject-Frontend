import React, { useContext, useEffect, useState } from "react";
import Header from "../header/Header";
import ProductCard from "../productCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { CategoryContext } from "../../suggestedProductBasedOnCategory/SuggestedProductContext";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import Loading from "../../pages/isLoading/Loading";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function SuggestedProducts() {
  const { categories , setCategories} = useContext(CategoryContext);

  // State for API endpoint
  const [categoriesUrl, setCategoriesUrl] = useState(
    "/api/categories?populate=products"
  );
const { t }=useTranslation();
  // Update endpoint dynamically based on category
  useEffect(() => {
   if (categories === "all" || categories === "") {
    setCategoriesUrl(
      `/api/categories?filters[name][$eq]=ALL&populate[products][populate]=image`
    );
   } else if (categories === "male") {
    setCategoriesUrl(
      "/api/categories?filters[name][$eq]=Male&populate[products][populate]=image"
    );
   } else if (categories === "female") {
    setCategoriesUrl(
      "/api/categories?filters[name][$eq]=Female&populate[products][populate]=image"
    );
   }
  }, [categories]);

  // Fetch products using React Query
  const { data, isError, isLoading} = useQuery({
    queryKey: ["suggestedProducts", categoriesUrl],
    queryFn: () => axiosConfig.get(categoriesUrl).then((res) => res.data),
    refetchOnWindowFocus: true,
    keepPreviousData: true,

    
});
console.log(data);

  // Render error or loading states
  if (isError) return <ErrorPage />;
  if (isLoading) return <Loading />;

  // Extract product data
  const baseURL = "http://localhost:1337/"; // Move to environment variables in production
  const products = data?.data?.[0]?.products || [];

  return (
    <div className="suggested-products-container">
      <Header headerTitle={t("suggestedProducts")} />
      <div className="suggested-products">
        {products.map((product , index) => {
          if (index < 4) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={baseURL + product?.image?.[0]?.formats?.small?.url}
                title={product.title}
                description={product.description}
                price={product.price}
                onImageLoad={()=>setIsImageLoaded(true)}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
