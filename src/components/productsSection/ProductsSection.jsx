import React, { useContext, useEffect, useState } from "react";
import Header from "../header/Header";
import ProductCard from "../productCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import Loading from "../../pages/isLoading/Loading";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import { CategoryContext } from "../../suggestedProductBasedOnCategory/SuggestedProductContext";
import { GrNext, GrPrevious } from "react-icons/gr";
import axiosCongif from "../../axios/axiosConfig/AxiosConfig";

export default function ProductsSection() {
  const { categories, setCategories } = useContext(CategoryContext);
  const [categoriesUrl, setCategoriesUrl] = useState(
    "/api/categories?populate=products"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the category changes
  }, [categories]);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories", categoriesUrl],
    queryFn: () => axiosCongif.get(categoriesUrl).then((res) => res.data.data),
    keepPreviousData: true,
  });

  if (isLoadingCategories) return <Loading />;
  if (isErrorCategories) return <ErrorPage />;

  const baseURL = "http://localhost:1337";
  const products =
    categoriesData?.length > 0 ? categoriesData[0]?.products : [];

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <Header headerTitle="Products" />
      <div className="categories">
        <div className="categories-buttons">
          <button
            className={categories === "all" ? "active" : ""}
            onClick={() => setCategories("all")}
          >
            All
          </button>
          <button
            className={categories === "male" ? "active" : ""}
            onClick={() => setCategories("male")}
          >
            Men
          </button>
          <button
            className={categories === "female" ? "active" : ""}
            onClick={() => setCategories("female")}
          >
            Women
          </button>
        </div>
        <div className="products px">
          {currentProducts.map((product) => {
            const imageUrl =
              product.image?.length > 0 && product.image[0].formats?.small?.url
                ? `${baseURL}${product.image[0].formats.small.url}`
                : null;
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={imageUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </div>
        {/* pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="prev"
            style={currentPage === 1 ? { display: "none" } : {}}
          >
            <GrPrevious />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="next"
            style={currentPage === totalPages ? { display: "none" } : {}}
          >
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
}
