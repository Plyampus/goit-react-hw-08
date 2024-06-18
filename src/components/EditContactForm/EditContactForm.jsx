import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { FeedbackSchema } from "../../validation";

import css from "./EditContactForm.module.css";
import {
  selectActiveContact,
  selectIsOpen,
} from "../../redux/contacts/selectors";
import { clearActiveContact } from "../../redux/contacts/slice";

const EditContactForm = () => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const activeContact = useSelector(selectActiveContact);
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    if (activeContact) {
      dispatch(
        editContact({
          id: activeContact.id,
          name: values.username,
          number: values.number,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Successfully updated!", { position: "top-center" });
          dispatch(clearActiveContact());
        })
        .catch(() => {
          toast.error("Error, input correct data", {
            position: "top-center",
          });
        });
      actions.resetForm();
    } else {
      toast.error("No active contact selected!", { position: "top-center" });
    }
  };

  return isOpen && activeContact ? (
    <Formik
      initialValues={{
        username: activeContact.name || "",
        number: activeContact.number || "",
      }}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formContainer}>
        <label htmlFor={nameFieldId} className={css.label}>
          Username
        </label>
        <div className={css.wrap}>
          <Field
            type="text"
            name="username"
            id={nameFieldId}
            className={css.inputField}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <label htmlFor={phoneFieldId} className={css.label}>
          Phone
        </label>
        <div className={css.wrap}>
          <Field
            type="text"
            pattern="\d*"
            name="number"
            id={phoneFieldId}
            className={css.inputField}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Edit
        </button>
      </Form>
    </Formik>
  ) : null;
};

export default EditContactForm;
