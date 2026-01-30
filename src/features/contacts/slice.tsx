import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../../types/contact";
import * as api from "../../api/contacts-api";

interface ContactsState {
  items: Contact[];
  loading: boolean;
}

const initialState: ContactsState = {
  items: [],
  loading: false,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetch",
  async () => await api.getContacts()
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact: Omit<Contact, "id">, { dispatch }) => {
    await api.createContact(contact);
    dispatch(fetchContacts());
  }
);

export const editContact = createAsyncThunk(
  "contacts/edit",
  async (contact: Contact, { dispatch }) => {
    await api.updateContact(contact);
    dispatch(fetchContacts()); 
  }
);

export const removeContact = createAsyncThunk(
  "contacts/delete",
  async (id: number, { dispatch }) => {
    await api.deleteContact(id);
    dispatch(fetchContacts()); 
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default contactsSlice.reducer;
