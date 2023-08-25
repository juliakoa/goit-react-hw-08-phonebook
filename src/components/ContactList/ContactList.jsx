import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'store/contactSlice';
import css from '../ContactsComponent/ContactsComponent.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css['contact-list']}>
      {contacts.map(contact => (
        <li className={css['contact-item']} key={contact.id}>
          <p className={css['contact-name']}>{contact.name}</p>-{' '}
          <p className={css['contact-number']}>{contact.number}</p>
          {/* Użyj "number" zamiast "phone" */}
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
