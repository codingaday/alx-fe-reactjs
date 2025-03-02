import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm";
import DeleteRecipeButton from "./components/DeleteRecipeButton";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>
            Home
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

// Wrapper to pass recipeId and render edit/delete
const RecipeDetailsWrapper = () => {
  const { recipeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Link to="/">Back to Home</Link>
      {isEditing ? (
        <EditRecipeForm
          recipeId={recipeId}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <>
          <RecipeDetails recipeId={recipeId} />
          <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
          <DeleteRecipeButton recipeId={recipeId} />
        </>
      )}
    </>
  );
};

export default App;
