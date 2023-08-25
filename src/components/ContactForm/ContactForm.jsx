import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'store/contactSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() && number.trim()) {
      dispatch(addContact({ name, number })); // Use "number" instead of "phone"
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={css['form']} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        className={css['input']}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={number} // Use "number" instead of "phone"
        onChange={e => setNumber(e.target.value)} // Use "number" instead of "phone"
        className={css.input}
      />
      <button className={css['add-contact-button']} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
