import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT = 'https://64e4d67cc55563802913d587.mockapi.io';

const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(`${API_ENDPOINT}/contacts`);
  return response.data;
});

const addContact = createAsyncThunk('contacts/addContact', async contact => {
  const response = await axios.post(`${API_ENDPOINT}/contacts`, contact);
  return response.data;
});

const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async contact => {
    const response = await axios.put(
      `${API_ENDPOINT}/contacts/${contact.id}`,
      contact
    );
    return response.data;
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await axios.delete(`${API_ENDPOINT}/contacts/${contactId}`);
    return contactId;
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        const index = state.findIndex(
          contact => contact.id === updatedContact.id
        );
        if (index !== -1) {
          state[index] = updatedContact;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const contactId = action.payload;
        return state.filter(contact => contact.id !== contactId);
      });
  },
});

export { fetchContacts, addContact, updateContact, deleteContact };

export default contactSlice.reducer;
