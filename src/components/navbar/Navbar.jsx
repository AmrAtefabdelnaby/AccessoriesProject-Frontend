import React, { useEffect, useRef } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import SearchInput from "../searchSection/SearchInput";
import { useCart } from "../../Context/cartContext/CartContext";
import { FaUser, FaUserAstronaut, FaUserCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const { cart } = useCart();
  const { t } = useTranslation(); 
  const sideMenuRef = useRef(null);
  const sideMenuContainerRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      sideMenuRef.current &&
      sideMenuContainerRef.current &&
      !sideMenuContainerRef.current.contains(e.target)
    ) {
      sideMenuRef.current.style.display = "none";
    }
  };
  window.addEventListener("click", handleClickOutside);
  return () => window.removeEventListener("click", handleClickOutside);
}, []);

  const totalItems = cart.reduce((res, item) => res + item.quantity, 0);

  return (
    <div className="navbar px py">
      <NavLink className="logo" to={"/"}>
        <h1>LOGO</h1>
      </NavLink>

      <div className="cart-search-section">
        <SearchInput />
      </div>

      <ul className="main-menu-section">
        <li>
          <NavLink to={"/"}>{t("home")}</NavLink>
        </li> 

        <li>
          <NavLink to={"/aboutUs"}>{t("aboutUs")}</NavLink>
        </li>

        <li>
          <NavLink to={"/login"}>
            {sessionStorage.getItem("token") ? <FaUserCheck /> : <FaUser />}
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart" className="cart-icon">
            <IoCartOutline />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>

      <div className="side-menu-section" ref={sideMenuContainerRef}>
        <button className="side-menu" onClick={() => sideMenuRef.current.style.display = "flex"}>
          <RxHamburgerMenu />

        </button>

        <ul className="side-menu-body" ref={sideMenuRef}>
          <div className="top-section">
            <NavLink to={"/login"}>
              {sessionStorage.getItem("token") ? <FaUserCheck /> : <FaUser />}
            </NavLink>

            <NavLink to="/cart" className="cart-icon">
              <IoCartOutline />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </NavLink>

            <LanguageSwitcher />
          </div>
          <li>
            <div className="cart-search-section-side">
              <SearchInput />
            </div>
          </li>

          <li className="home-side-menu">
            <NavLink to={"/"}>{t("home")}</NavLink>
          </li>

          <li className="home-side-menu">
            <NavLink to={"/AboutUs"}>{t("aboutUs")}</NavLink>
          </li>

          <button className="close-side-menu" onClick={() => sideMenuRef.current.style.display = "none"}>
            <MdClose />
          </button>
        </ul>
      </div>
    </div>
  );
}
