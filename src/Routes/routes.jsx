import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import NewRecipe from "../pages/NewRecipe";
import RecipeDetail from "../pages/Recipe";

export default function AllRoutes(){
    return <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/new-recipe" element={<NewRecipe />}/>
        <Route path="/recipe/:id" element={<RecipeDetail />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/" element={<HomePage />}/>
    </Routes>
}