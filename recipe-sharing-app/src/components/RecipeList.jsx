import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const { recipes, searchTerm, filteredRecipes } = useRecipeStore();
  const displayRecipes = searchTerm ? filteredRecipes : recipes;
  return (
    <div>
      <h2>Recipes</h2>
      {displayRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        displayRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
