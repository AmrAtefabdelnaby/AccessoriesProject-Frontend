import React from "react";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import ProductCard from "../productCard/ProductCard";
import Header from "../header/Header";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import Loading from "../../pages/isLoading/Loading";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

export default function NewArrivals() {
  const{data,isError,isLoading}=useQuery({
    queryKey:["newArrivals"],
    queryFn:()=>axiosConfig.get("/api/products?populate=image").then((res)=>res.data.data),
  })
  const { t } = useTranslation();

  const newArrivals=data?.sort((a,b)=>b.id-a.id).slice(0,4);
  console.log(newArrivals);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;
  const baseURL = "http://localhost:1337";
  return (
    <div className="new-arrivals py px">
      <Header headerTitle={t("newArrival")}/>

      <div className="new-arrivals-products">
        {newArrivals?.map((product) => (
          
          <ProductCard 
          key={product.id} 
          product={product}
          title={product.title}
          description={product.description}
          price={product.price}
          image={baseURL + product?.image[0]?.formats?.small?.url}
          id={product.id}
           />
        ))}
       
      </div>
    </div>
  );
}
