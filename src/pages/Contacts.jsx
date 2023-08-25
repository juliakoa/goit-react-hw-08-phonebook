// pages/Contacts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Pobierz listę kontaktów po zalogowaniu użytkownika
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          'https://connections-api.herokuapp.com/contacts'
        );
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
