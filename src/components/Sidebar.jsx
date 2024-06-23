import React from "react";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { categories } from "../assets/material";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slices/categorySlice";

const Sidebar = () => {
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const darkMode = useSelector((state) => state.darkMode.value); // Accessing the darkMode state
  const dispatch = useDispatch();

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "98%" },
        flexDirection: { md: "column" },
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => dispatch(setCategory(category.name))}
          style={{
            background:
              category.name === selectedCategory
                ? darkMode
                  ? "#555"
                  : "#D3D3D3"
                : "transparent",
            color:
              category.name === selectedCategory
                ? darkMode
                  ? "#fff"
                  : "#000"
                : darkMode
                ? "#bbb"
                : "#000",
          }}
          key={category.name}
        >
          <span
            style={{
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

Sidebar.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Sidebar;
