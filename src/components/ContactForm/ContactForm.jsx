import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'store/contactSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      dispatch(addContact({ name, phone }));
      setName('');
      setPhone('');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        className={css.input}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className={css.input}
      />
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
