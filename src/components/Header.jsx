import { NavLink } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import "./Header.css"

export default function Header() {
  const {setSearchValue, searchType, setSearchType} = useItems();

  const searchTypeHandler = (e, type) => {
    setSearchType(type);
    console.log(type)
};



  return (
    <div className="header">
      <NavLink to="/" style={{fontSize: "30px", color: "red", textDecoration: "none"}}>Recipes</NavLink>
      <input type="search" placeholder="Search" onChange={e=>setSearchValue(e.target.value)}/>
      <div>
      <label>
        <input
          type="radio"
          value="cuisine"
          name="searchType"
          onChange={(e)=>searchTypeHandler(e, "cuisineType")}
          checked={searchType === "cuisineType"}
        />
        Cuisine
      </label>
      <label>
        <input
          type="radio"
          value="name"
          name="searchType"
          onChange={(e)=>searchTypeHandler(e, "name")}
          checked={searchType === "name"}
        />
        Dish Name
      </label>
      <label>
        <input
          type="radio"
          value="ingredients"
          name="searchType"
          onChange={(e)=>searchTypeHandler(e,"ingredients")}
          checked={searchType === "ingredients"}
        />
        Ingredients
      </label></div>
    </div>
  );
}

