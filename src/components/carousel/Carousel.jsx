import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";  // Importing effect-fade CSS
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axiosCongif from "../../axios/axiosConfig/AxiosConfig";

export default function Carousel({onButtonClick}) {
  const{data, isError, isLoading} = useQuery({
    queryKey: ["carousel"],
    queryFn: ()=> axiosCongif.get("/api/slider-images?populate=*").then((res) => res.data.data),
  })


  if (isError) {
    return <p>Error loading carousel data</p>; // Handle errors
  }

  return (
    <>
      {data && (
        <Swiper
          effect="fade" // Enables fade effect
          fadeEffect={{ crossFade: true }} // Smooth transition between slides
          spaceBetween={40}
          centeredSlides={true}
          autoplay={{
            delay: 4500, // Time delay for autoplay
            disableOnInteraction: false, // Allow autoplay to continue after user interactions
          }}
          pagination={{
            clickable: true, // Make pagination clickable
          }}
          loop={true} // Enable infinite looping
          modules={[Autoplay, Pagination, Navigation, EffectFade]} // Use necessary modules
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={`http://localhost:1337${item?.image?.formats?.large?.url}`}
                alt={item?.title}
              />
              <div className="content">
                <h1>{item?.title}</h1>
                <p>{item?.description}</p>
                <button onClick={onButtonClick}>Shop Now</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}