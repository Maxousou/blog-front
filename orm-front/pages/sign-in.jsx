import { Formik } from "formik";
import { useCallback, useState, useContext } from "react";
import * as yup from "yup";
import { AppContext } from "../src/components/AppContext";
import Button from "../src/components/Button";
import FormField from "../src/components/FormFields";
import { makeClient } from "../src/services/makeClient";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().min(8).required().label("Password"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInPage = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(AppContext);
  const handleFormSubmit = useCallback(async ({ email, password }) => {
    setError(null);
    try {
      const {
        data: { jwt },
      } = await makeClient().post("/sign-in", { email, password });

      if (!jwt) {
        throw new Error("Missing JWT.");
      }

      login(jwt);
    } catch (err) {
      const { response: { data } = {} } = err;

      if (data.error) {
        setError(data.error);
        return;
      }
      setError("Oops, somethings went wrong");
    }
  }, []);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <form onSubmit={handleSubmit}>
          {error ? (
            <p className="bg-red-600 text-white font-bold px-4 py-2">{error}</p>
          ) : null}
          <FormField name="email" type="email" label="E-mail" />
          <FormField name="password" type="password" label="Password" />
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="block mt-4"
          >
            Sign In
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default SignInPage;
