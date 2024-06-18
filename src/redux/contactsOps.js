import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { selectContacts, selectFilter } from "./selectors";

axios.defaults.baseURL = "https://667067f30900b5f8724a884e.mockapi.io/";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", newContact);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const filterContacts = (contacts, filter) => {
    return contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.includes(filter)
    );
};

export const filteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => filterContacts(contacts, filter)
);