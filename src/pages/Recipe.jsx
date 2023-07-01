import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useItems } from "../context/ItemContext";

export default function RecipeDetail(){
    const { recipeData } = useItems()
    const { id } = useParams();
    const [thisRecipe, setThisRecipe] = useState({});

    useEffect(()=>{
        setThisRecipe(recipeData.find(item=>+item.id === +id))
        // console.log(recipeData.filter(item=>item.id === id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    return <div>
        <img src={thisRecipe?.imageUrl ? thisRecipe.imageUrl : "https://picsum.photos/250/250"} alt="..." />
        {/* <h1>{id}</h1> */}
        <h1>{thisRecipe?.name}</h1>
        <p>{thisRecipe?.cuisineType}</p>
        <ul>{thisRecipe?.ingredients?.map(item=><li>{item}</li>)}</ul>
        <p>{thisRecipe?.instruction}</p>
    </div>
}