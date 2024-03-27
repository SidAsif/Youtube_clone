import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { categories } from "../assets/material";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "98%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#D3D3D3",
          color: "black",
        }}
        key={category.name}
      >
        <span
          style={{
            color: category.name === selectedCategory ? "black" : "black",
            marginRight: "15px",
          }}
        >
          {category.icon}
        </span>
        <span
          style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}
        >
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);
Categories.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};
export default Categories;
