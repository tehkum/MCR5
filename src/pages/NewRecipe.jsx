import { useState } from "react";
import { useItems } from "../context/ItemContext";
import "./Newrecipe.css";

export default function NewRecipe() {

    const {newRecipe, setNewRecipe, handleSubmit} = useItems();
    const [ingredientList, setIngredientList ] = useState("");

    const imageHandler = async (e) => {
        try {
          const image = e.target.files[0];
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "Toemedia");
          data.append("cloud_name", "dbehxf29s");
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/dbehxf29s/image/upload`,
            {
              method: "POST",
              body: data,
            }
          );
          const uri = await res.json();
          setNewRecipe({ ...newRecipe, imageUrl: uri.url });
        } catch (error) {
          console.log(error);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(newRecipe);
      };

      const ingredientAdder = () => {
        setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, ingredientList]})
        setIngredientList("")
      }



    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px"}}>
    <div class="q1Form">
    <label htmlFor="q1Name">
        Display Image:
    </label>
    <input type="file" id="q1Name" name="name" placeholder="Dish name" onChange={imageHandler}/>

    <label htmlFor="q1Name">
        Dish Name:
    </label>
    <input type="text" id="q1Name" name="name" placeholder="Dish name" onChange={handleChange}/>

    <label htmlFor="q1Email">
        Cuisine Type:
    </label>
    <input type="text" id="q1Email" name="cuisineType" placeholder="Cuisine Type" onChange={handleChange}/>

    <label htmlFor="q1Email">
        Ingredients:
    </label>
    <input type="text" id="q1Email" name="ingredients" placeholder="Ingredients" value={ingredientList} onChange={(e)=>setIngredientList(e.target.value)}/><button style={{width: "80px", color: "#323232", backgroundColor: "white", border: "1px solid #323232"}} onClick={ingredientAdder}>Add this</button>
    <ul>
        {newRecipe?.ingredients?.map(item=><li>{item}</li>)}
    </ul>

    <label htmlFor="q1Message">
        Instructions:
    </label>
    <textarea type="text" id="q1Message" name="instruction" placeholder="Instructions" onChange={handleChange}></textarea>
    <button onClick={handleSubmit} type="submit">Add Recipe</button>

</div></div>
}