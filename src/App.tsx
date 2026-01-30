import { Container, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import { fetchContacts, addContact, editContact, removeContact } from "./features/contacts/slice";
import ContactsTable from "./components/table";
import ContactForm from "./components/form";
import { Contact } from "./types/contact";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.items);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => { dispatch(fetchContacts()); }, [dispatch]);

  const handleSave = (contact: any) => { contact.id ? dispatch(editContact(contact)) : dispatch(addContact(contact)); };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>CRS Consulting Contacts App</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setSelected(null); setOpen(true); }}>Add Contact</Button>
      <ContactsTable contacts={contacts} onEdit={c => { setSelected(c); setOpen(true); }} onDelete={id => dispatch(removeContact(id))} />
      <ContactForm open={open} contact={selected} onClose={() => setOpen(false)} onSave={handleSave} />
    </Container>
  );
}
