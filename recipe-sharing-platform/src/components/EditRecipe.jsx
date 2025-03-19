import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    setRecipes(allRecipes);
  }, []);

  const handleRecipeChange = (e) => {
    const id = e.target.value;
    setSelectedRecipeId(id);
    setErrors({});
    setPreview(null);

    if (id) {
      const selectedRecipe = recipes.find((r) => r.id === parseInt(id));
      setFormData({
        title: selectedRecipe.title,
        ingredients: selectedRecipe.ingredients.join("\n"),
        steps: selectedRecipe.instructions,
        image: null,
      });
      setPreview(selectedRecipe.image);
    } else {
      setFormData({ title: "", ingredients: "", steps: "", image: null });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedRecipeId)
      newErrors.selection = "Please select a recipe to edit";
    if (!formData.title.trim()) newErrors.title = "Recipe title is required";
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientList = formData.ingredients
        .split("\n")
        .filter((item) => item.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please provide at least two ingredients";
      }
    }
    if (!formData.steps.trim())
      newErrors.steps = "Preparation steps are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const confirmEdit = window.confirm(
      "Are you sure you want to save changes to this recipe?"
    );
    if (!confirmEdit) return;

    const updateRecipe = (imageData) => {
      const updatedRecipe = {
        id: parseInt(selectedRecipeId),
        title: formData.title,
        summary: formData.steps.substring(0, 50) + "...",
        image: imageData || preview,
        ingredients: formData.ingredients
          .split("\n")
          .filter((item) => item.trim()),
        instructions: formData.steps,
      };

      const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
      const updatedRecipes = allRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      localStorage.setItem("allRecipes", JSON.stringify(updatedRecipes));

      setSelectedRecipeId("");
      setFormData({ title: "", ingredients: "", steps: "", image: null });
      setPreview(null);
      setErrors({});
      navigate("/");
    };

    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => updateRecipe(reader.result);
      reader.readAsDataURL(formData.image);
    } else {
      updateRecipe();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Edit a Recipe
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white md:rounded-xl md:shadow-lg md:p-8 p-4 max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <label
              htmlFor="recipe"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Select Recipe to Edit
            </label>
            <select
              id="recipe"
              value={selectedRecipeId}
              onChange={handleRecipeChange}
              className="w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            >
              <option value="">-- Select a recipe --</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
            </select>
            {errors.selection && (
              <p className="mt-1 text-sm text-red-600">{errors.selection}</p>
            )}
            {recipes.length === 0 && (
              <p className="mt-1 text-sm text-gray-600">
                No recipes available to edit.
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter recipe title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="ingredients"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="5"
              className={`w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 200g spaghetti\n100g pancetta"
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="steps"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Preparation Steps
            </label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="5"
              className={`w-full md:p-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y ${
                errors.steps ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe how to prepare the recipe"
            />
            {errors.steps && (
              <p className="mt-1 text-sm text-red-600">{errors.steps}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block md:text-lg font-medium text-gray-700 mb-2"
            >
              Recipe Image (optional - upload to replace)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full md:p-3 p-2 border rounded-lg ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full max-w-xs h-auto rounded-lg"
              />
            )}
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="md:px-6 md:py-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={recipes.length === 0}
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditRecipe;
