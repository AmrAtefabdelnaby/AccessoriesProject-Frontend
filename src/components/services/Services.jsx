import React from "react";
import { GrGift } from "react-icons/gr";
import Header from "../header/Header";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  return (
    <div className="py px services">
      <Header headerTitle={t("services")} />
      <div className="service-section">
        <div className="service">
          <GrGift />
          <div className="service-body">
            <h4>Gift Wrapping</h4>
            <p>
              We offer high-quality gift wrapping and packaging solutions for
              your special occasions.
            </p>
          </div>
        </div>

        <div className="service">
          <MdOutlineLocalShipping />
          <div className="service-body">
            <h4>Free Shipping</h4>
            <p>We offer free shipping on orders over $100.</p>
          </div>
        </div>

        <div className="service">
          <IoChatbubbleEllipsesOutline />
          <div className="service-body">
            <h4>Live Chat Support</h4>
            <p>
              Provide chat for customers who need help choosing accessories, customizing orders, or troubleshooting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
