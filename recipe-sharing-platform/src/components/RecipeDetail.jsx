import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import recipeData from "../data.json"; // Explicitly include data.json

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Load recipes from localStorage (allRecipes)
      const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
      // Combine with data.json as a fallback
      const combinedRecipes = [
        ...allRecipes,
        ...recipeData.filter((r) => !allRecipes.some((ar) => ar.id === r.id)), // Exclude duplicates
      ];
      const selectedRecipe = combinedRecipes.find((r) => r.id === parseInt(id));
      if (!selectedRecipe) {
        throw new Error("Recipe not found");
      }
      setRecipe(selectedRecipe);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full md:w-1/2 h-96 object-cover"
            />
            <div className="p-8 flex-1">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg mb-8">{recipe.summary}</p>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Instructions
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {recipe.instructions}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
