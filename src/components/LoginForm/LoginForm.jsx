import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { login } from "../../validation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();

  const mailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={login}
      onSubmit={(values, actions) => {
        const userData = {
          email: values.email,
          password: values.password,
        };
        dispatch(logIn(userData))
          .unwrap()
          .then(() => {
            toast.success("Success!", { position: "top-center" });
          })
          .catch(() => {
            toast.error("Error, input correct data", {
              position: "top-center",
            });
          });
        actions.resetForm();
      }}
    >
      <Form className={css.formContainer}>
        <label htmlFor={mailFieldId} className={css.label}>
          Email
        </label>
        <div className={css.wrap}>
          <Field
            type="email"
            name="email"
            id={mailFieldId}
            className={css.inputField}
          />
          <ErrorMessage
            name="email"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <label htmlFor={passwordFieldId} className={css.label}>
          Password
        </label>
        <div className={css.wrap}>
          <Field
            type="password"
            name="password"
            id={passwordFieldId}
            className={css.inputField}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
