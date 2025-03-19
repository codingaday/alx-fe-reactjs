import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteRecipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load all recipes from localStorage
    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    setRecipes(allRecipes);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!selectedRecipeId) {
      setError("Please select a recipe to delete");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const updatedRecipes = allRecipes.filter(
      (recipe) => recipe.id !== parseInt(selectedRecipeId)
    );
    localStorage.setItem("allRecipes", JSON.stringify(updatedRecipes));

    setSelectedRecipeId("");
    setError("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Delete a Recipe
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <form
          onSubmit={handleDelete}
          className="bg-white md:rounded-xl md:shadow-lg md:p-8 p-4 max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label
              htmlFor="recipe"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Select Recipe to Delete
            </label>
            <select
              id="recipe"
              value={selectedRecipeId}
              onChange={(e) => {
                setSelectedRecipeId(e.target.value);
                setError("");
              }}
              className="w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            >
              <option value="">-- Select a recipe --</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {recipes.length === 0 && (
              <p className="mt-1 text-sm text-gray-600">
                No recipes available to delete.
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="md:px-6 md:py-3 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={recipes.length === 0}
            >
              Delete Recipe
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DeleteRecipe;
