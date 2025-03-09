import RegistrationForm from "./components/RegistrationForm";
import formikForm from "./components/FormikForm";

function App() {
  return (
    <div>
      <h2>Using Controlled Components</h2>
      <RegistrationForm />
      <h2>Using Formik</h2>
      <formikForm />
    </div>
  );
}

export default App;
