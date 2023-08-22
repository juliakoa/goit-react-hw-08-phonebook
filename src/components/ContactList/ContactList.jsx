import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'store/contactSlice';
import css from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.listItem} key={contact.id}>
          {contact.name} - {contact.phone}
          <button
            className={css.deleteButton}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
