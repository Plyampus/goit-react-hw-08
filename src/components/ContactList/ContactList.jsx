import { useState } from "react";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import ModalDelete from "../ModalDelete/ModalDelete";
import css from "./ContactList.module.css";
import { selectError, selectIsLoading } from "../../redux/contacts/selectors";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import Loader from "../Loader/Loader";

const ContactList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectFilteredContacts);

  const openModalDelete = (id) => {
    setSelectedContactId(id);
    setModalOpen(true);
  };

  const closeModalDelete = () => {
    setSelectedContactId(null);
    setModalOpen(false);
  };

  return (
    <ul className={css.contactList}>
      {isLoading && !error && <Loader />}
      {contacts.map((contact) => {
        return (
          <li key={contact.id} className={css.contactItem}>
            <Contact contact={contact} modalOpenDelete={openModalDelete} />
          </li>
        );
      })}
      <ModalDelete
        open={modalOpen}
        close={closeModalDelete}
        id={selectedContactId}
      />
    </ul>
  );
};

export default ContactList;
