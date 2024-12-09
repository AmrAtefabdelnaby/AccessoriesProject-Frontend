import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEarthAsia } from "react-icons/fa6";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="language-switcher" style={{ position: "relative" }}>
      <div
        className="earth-icon"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
        style={{ fontSize: "20px", cursor: "pointer" }}
      >
        <FaEarthAsia />
      </div>

      {showDropdown && (
        <div className="language-dropdown">
          <div
            className="dropdown-item"
            style={{ padding: "10px", cursor: "pointer", fontSize: "14px" }}
            onClick={() => changeLanguage("en")}
          >
            English
          </div>
          <div
            className="dropdown-item"
            style={{ padding: "10px", cursor: "pointer", fontSize: "14px" }}
            onClick={() => changeLanguage("ar")}
          >
            العربية
          </div>
        </div>
      )}
    </div>
  );
}
