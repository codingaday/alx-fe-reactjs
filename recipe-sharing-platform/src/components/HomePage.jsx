import { useState, useEffect } from "react";
import recipesData from "../data.json";
import Card from "./Card";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Recipe Sharing Platform
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            image={recipe.image}
            alt={recipe.title}
            title={recipe.title}
            summary={recipe.summary}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
