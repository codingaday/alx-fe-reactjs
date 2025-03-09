import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div>
      <h2>Using Controlled Components</h2>
      <RegistrationForm />
      <h2>Using Formik</h2>
      <FormikForm />
    </div>
  );
}

export default App;
