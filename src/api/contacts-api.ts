import axios from "axios";
import { Contact } from "../types/contact";

const API_BASE = "https://tester.crs-consulting.com/api";

export const getContacts = async (): Promise<Contact[]> => {
  const res = await axios.get(`${API_BASE}/entries`);
  return res.data;
};

export const createContact = async (contact: Omit<Contact, "id">) => {
  const res = await axios.post(`${API_BASE}/entry`, contact);
  return res.data;
};

export const updateContact = async (contact: Contact) => {
  const res = await axios.put(`${API_BASE}/entry`, contact);
  return res.data;
};

export const deleteContact = async (id: number) => {
  await axios.delete(`${API_BASE}/entry?id=${id}`);
};
