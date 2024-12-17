import React from "react";
import "../../style/_aboutUs.scss";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";

export default function AboutUs() {
  const { data } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: () => axiosConfig.get("/api/team-members?populate=*").then((res) => res.data),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  console.log(data);
  return (
    <div className="about-us">
      <div className="header">
        <h1>About Us</h1>
        <p>Your trusted partner in exceptional products and services.</p>
      </div>
      <div className="content">
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            At our core, we are dedicated to delivering high-quality products
            that enhance the lives of our customers. We believe in innovation,
            sustainability, and putting people first.
          </p>
        </div>
        <div className="section">
            <h2>Our Vision</h2>
          <p>
            To be a globally recognized brand known for its commitment to
            excellence, creativity, and customer satisfaction.
          </p>
        </div>
        <div className="team">
          <h2>Meet Our Team</h2>
          <div className="team-list">
            {data?.data?.map((member) => (
              
            <div className="team-member">
              <img
                src={"http://localhost:1337"+member?.image?.formats?.thumbnail?.url}
                alt="Team Member 1"
                className="team-member__image"
              />
              <h3 className="team-member__name">{member?.Name}</h3>
              <p className="team-member__role">{member?.title}</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
