import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

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
    if (!formData.image) newErrors.image = "Please upload a recipe image";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newRecipe = {
        id: Date.now(),
        title: formData.title,
        summary: formData.steps.substring(0, 50) + "...",
        image: reader.result,
        ingredients: formData.ingredients
          .split("\n")
          .filter((item) => item.trim()),
        instructions: formData.steps,
      };

      // Add to allRecipes in localStorage
      const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
      const updatedRecipes = [...allRecipes, newRecipe];
      localStorage.setItem("allRecipes", JSON.stringify(updatedRecipes));

      setFormData({ title: "", ingredients: "", steps: "", image: null });
      setPreview(null);
      setErrors({});
      navigate("/");
    };
    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Add a New Recipe
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
              Recipe Image
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
              className="md:px-6 md:py-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddRecipeForm;
