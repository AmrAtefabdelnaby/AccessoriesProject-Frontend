import React, { useRef, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../../axios/axiosConfig/AxiosConfig";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SearchInput() {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: () =>
      axiosConfig
        .get(
          `/api/products?filters[title][$contains]=${debouncedSearchValue}&populate=image`
        )
        .then((res) => res.data.data),
  });

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleClick = () => {
    setShowResults(true);
  };

  const resetSearchForm = () => {
    inputRef.current.placeholder = "";
    setSearchValue("");
    setShowResults(false);
  };
  const handleClickOutside = (e) => {
    if (
      formRef.current &&
      inputRef.current &&
      resultRef.current &&
      !formRef.current.contains(e.target) &&
      e.target !== inputRef.current &&
      !resultRef.current.contains(e.target)
    ) {
      resetSearchForm();
    }
  };

  const handleResultClick = () => {
    resetSearchForm();
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-section" onClick={handleClick}>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="text"
          placeholder={t("search")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IoSearchOutline />

        {showResults && searchValue && (
          <div className="search-results" ref={resultRef}>
            {data && data.length === 0 ? (
              <p
                className="no-results"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No results found for "{searchValue}"
              </p>
            ) : (
              data?.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="search-result-item"
                  onClick={handleResultClick}
                >
                  <div className="image-container">
                    <img
                      src={`http://localhost:1337${item.image[0]?.formats?.small?.url}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="text-container">
                    <h6 className="title">{item.title}</h6>
                    <p className="description">{item?.description}</p>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        )}
      </form>
    </div>
  );
}
