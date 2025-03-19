import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";
import DeleteRecipe from "./components/DeleteRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipeForm />} />
        <Route path="/delete-recipe" element={<DeleteRecipe />} />
        <Route path="/edit-recipe" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
