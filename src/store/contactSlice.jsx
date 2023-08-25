import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://connections-api.herokuapp.com';

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(`${API_BASE_URL}/contacts`, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${API_BASE_URL}/contacts`, contact, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('Token not found');
      }

      await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, {
        headers: { Authorization: token },
      });
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ... (similarly, you can adjust updateContact if needed)

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
      .addCase(deleteContact.fulfilled, (state, action) => {
        return state.filter(contact => contact.id !== action.payload);
      });
  },
});

export { fetchContacts, addContact, deleteContact };

export default contactSlice.reducer;
