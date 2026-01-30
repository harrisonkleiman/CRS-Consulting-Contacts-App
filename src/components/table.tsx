import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contact } from "../types/contact";

interface Props { contacts: Contact[]; onEdit: (contact: Contact) => void; onDelete: (id: number) => void; }

export default function ContactsTable({ contacts, onEdit, onDelete }: Props) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(contact)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(contact.id)}><DeleteIcon color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
