import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Initialize localStorage with data.json if not already set
      let allRecipes = JSON.parse(localStorage.getItem("allRecipes"));
      if (!allRecipes) {
        localStorage.setItem("allRecipes", JSON.stringify(recipeData));
        allRecipes = recipeData;
      }
      setRecipes(allRecipes);
      setLoading(false);
    } catch (err) {
      setError("Failed to load recipes");
      setLoading(false);
    }
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Recipe Sharing Platform
          </h1>
          <div className="space-x-4">
            <Link
              to="/add-recipe"
              className="text-blue-600 hover:underline font-medium"
            >
              Add Recipe
            </Link>
            <Link
              to="/edit-recipe"
              className="text-green-600 hover:underline font-medium"
            >
              Edit Recipe
            </Link>
            <Link
              to="/delete-recipe"
              className="text-red-600 hover:underline font-medium"
            >
              Delete Recipe
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes by title..."
            className="w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="md:bg-white md:rounded-xl md:shadow-lg md:overflow-hidden md:hover:shadow-xl md:transform md:hover:-translate-y-1 md:transition-all md:duration-300 block mb-4"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="md:w-full md:h-56 md:object-cover w-full h-48 object-cover"
                />
                <div className="md:p-6 p-4">
                  <h2 className="md:text-2xl md:font-semibold md:text-gray-800 md:mb-2 md:line-clamp-1 text-xl font-semibold text-gray-800 mb-2">
                    {recipe.title}
                  </h2>
                  <p className="md:text-gray-600 md:line-clamp-2 text-gray-600">
                    {recipe.summary}
                  </p>
                  <span className="md:inline-block md:mt-4 md:text-blue-600 md:font-medium md:hover:underline inline-block mt-2 text-blue-600">
                    View Recipe →
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No recipes found matching your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
