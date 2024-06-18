import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import toast from "react-hot-toast";
import { regist } from "../../validation";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const mailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={regist}
      onSubmit={(values, actions) => {
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        dispatch(register(newUser))
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
        <label htmlFor={nameFieldId} className={css.label}>
          Name
        </label>
        <div className={css.wrap}>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.inputField}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errorMessage}
          />
        </div>
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
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
