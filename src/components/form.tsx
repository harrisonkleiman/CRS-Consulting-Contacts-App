import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Contact } from "../types/contact";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (contact: any) => void;
  contact?: Contact | null;
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
};

export default function ContactForm({
  open,
  onClose,
  onSave,
  contact,
}: Props) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    } else {
      setForm(emptyForm);
    }

    // Clear errors whenever dialog opens
    setErrors({
      name: false,
      email: false,
      phone: false,
    });
  }, [contact, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const hasEmail = form.email.trim() !== "";
    const hasPhone = form.phone.trim() !== "";

    const newErrors = {
      name: form.name.trim() === "",
      email: false,
      phone: false,
    };

    // Name is required
    if (!form.name.trim()) {
      newErrors.name = true;
    }

    // At least one contact method is required
    if (!hasEmail && !hasPhone) {
      newErrors.email = true;
      newErrors.phone = true;
    }

    // If email exists, validate format
    if (
      hasEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      ...form,
      id: contact?.id,
    });

    onClose();
  };

  const isSaveDisabled =
    form.name.trim() === "" ||
    (form.email.trim() === "" && form.phone.trim() === "");

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {contact ? "Edit Contact" : "Add Contact"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name && "Name is required"}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          helperText={
            errors.email
              ? "Provide a valid email or a phone number"
              : ""
          }
        />

        <TextField
          fullWidth
          margin="dense"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          helperText={
            errors.phone
              ? "Provide a phone number or an email"
              : ""
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
