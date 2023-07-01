import { useItems } from "../context/ItemContext";
import { Link, useNavigate } from "react-router-dom";
import "./Homepage.css"

export default function HomePage() {
    const { searchFilter, removeItemHandler } = useItems();
    const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>All Recipes</h1>
      <div className="box-layout">{searchFilter?.map(items => <div class="q5Card">
      <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/90/filled-trash.png" alt="filled-trash" className="delete-btn" onClick={()=>removeItemHandler(items?.id)}/>
        <img src={items?.imageUrl ? items.imageUrl : "https://picsum.photos/250/250"} alt="..." className="img-recipe"/>
        <div>
          <p className="catq5">{items.cuisineType}</p>
          <h3>{items.name}</h3>
            <span className="recipe-inst" style={{ color: "#666666", marginBottom: "0" }}>
              <p>ingredients</p>
              <Link to={`/recipe/${items.id}`}>Show more</Link>
            </span>
            <span className="recipe-inst" style={{ color: "#666666", marginTop: "0" }}>
              <p>instructions</p>
              <Link to={`/recipe/${items.id}`}>Show more</Link>
            </span>
        </div>
      </div> )
        }
        <div className="q5Card">
        <button onClick={()=> navigate("/new-recipe")} style={{width: "100px", height: "100px",position: "absolute", backgroundColor: "white", color: "#323232", borderRadius: "25px", top: "40%", fontSize: "20px", left: "30%"}}>
            +
        </button></div>
        </div>
    </div>
  );
}
