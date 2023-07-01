import { createContext, useContext, useEffect, useState } from "react";
import { recipe } from "../Data";
import { useNavigate } from "react-router";

export const manageItem = createContext();

export function ItemContext({ children }) {
  const [recipeData, setRecipeData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    cuisineType: "",
    ingredients: [],
    instruction: "",
  });
  const [dataChanged, setDataChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipeData = JSON.parse(localStorage.getItem("recipeItems"));
    setRecipeData(storedRecipeData || recipe);
  }, [dataChanged]);

  const handleSubmit = () => {
    setNewRecipe({
      ...newRecipe,
      id:
        +recipeData.length + 1,
    });
    const updatedRecipeData = [...recipeData, newRecipe];
    // setRecipeData(updatedRecipeData);
    localStorage.setItem("recipeItems", JSON.stringify(updatedRecipeData));
    setNewRecipe({
      name: "",
      cuisineType: "",
      ingredients: [],
      instruction: "",
    });
    setDataChanged(!dataChanged);
    navigate("/");
  };

  const searchFilter = recipeData.filter((item) => {
    if (searchType === "cuisineType") {
      return item.cuisineType.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchType === "ingredients") {
      return item.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  //   const removeItemHandler = (id) => {
  //     const updatedRecipeData = recipeData.filter((item) => item.id !== id);
  //     setRecipeData(updatedRecipeData);
  //     setDataChanged(!dataChanged)
  //   };

  const removeItemHandler = (id) => {
    const updatedRecipeData = JSON.parse(
      localStorage.getItem("recipeItems")
    ).filter((item) => item.id !== id);
    // setRecipeData(updatedRecipeData);
    localStorage.setItem("recipeItems", JSON.stringify(updatedRecipeData));
    setDataChanged(!dataChanged);
  };

  return (
    <manageItem.Provider
      value={{
        searchFilter,
        recipeData,
        setRecipeData,
        newRecipe,
        setNewRecipe,
        handleSubmit,
        setSearchValue,
        searchType,
        setSearchType,
        searchValue,
        removeItemHandler,
      }}
    >
      {children}
    </manageItem.Provider>
  );
}

export const useItems = () => useContext(manageItem);
