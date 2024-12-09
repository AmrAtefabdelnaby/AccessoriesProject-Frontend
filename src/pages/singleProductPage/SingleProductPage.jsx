import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosCongif from "../../axios/axiosConfig/AxiosConfig";
import ErrorPage from "../errorPage/ErrorPage";
import Loading from "../isLoading/Loading";
import { useCart } from "../../Context/cartContext/CartContext";
import { CategoryContext } from "../../suggestedProductBasedOnCategory/SuggestedProductContext";
import SuggestedProducts from "../../components/suggestedProducts/SuggestedProducts";

export default function SingleProductPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();

  const baseUrl = "http://localhost:1337";
  const [imgSrc, setImgSrc] = useState("");

  // Fetch main product data
  const { data: mainData, isError, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () =>
      axiosCongif
        .get(`/api/products?filters[id][$eq]=${id}&populate=image`)
        .then((res) => res.data.data[0]),
  });

  // Fetch side images
  const { data: sideData, isLoading: isLoadingSideData, isError: isErrorSideData } = useQuery({
    queryKey: ["sideImages", id],
    queryFn: () =>
      axiosCongif
        .get(`/api/products?filters[id][$eq]=${id}&populate=sideImages`)
        .then((res) => res.data),
  });

  const sideImagesData = sideData?.data?.[0]?.sideImages;

  // Update main image source
  useEffect(() => {
    if (mainData?.image?.[0]?.formats?.large?.url) {
      setImgSrc(baseUrl + mainData.image[0].formats.large.url);
    } else {
      setImgSrc("/path/to/fallback-image.jpg"); // Fallback image
    }
  }, [mainData]);

  // Handle loading and error states
  if (isLoading || isLoadingSideData) return <Loading />;
  if (isError || isErrorSideData) return <ErrorPage />;

  // Add to cart handler
  const handleAddToCart = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      addToCart({
        id,
        title: mainData?.title,
        description: mainData?.description,
        price: mainData?.price,
        image: imgSrc,
      });
    }
  };

  return (
    <div className="single-product-page-container px py">
      <div className="single-product-page py">
        <div className="image-container">
          <img className="main-img" src={imgSrc} alt={mainData?.title || "Product"} />
          <div className="side-imgs">
            {sideImagesData?.map((product, index) => (
              <div
                key={index}
                onClick={() => setImgSrc(baseUrl + product.formats?.small?.url)}
                className="img-container"
              >
                <div className="layout"></div>
                <img src={baseUrl + product.formats?.small?.url} alt={`Side Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-container px">
          <h3 className="title">{mainData?.title}</h3>
          <p className="description">{mainData?.description}</p>
          <div className="price-container">
            <h4>${mainData?.price}</h4>
          </div>
          <button className="btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
      {sideImagesData?.length > 0 && <SuggestedProducts />}
    </div>
  );
}
