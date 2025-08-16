import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const NgoRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    ngoName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/ngo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.message || "Registered successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>NGO Register</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth label="NGO Name" name="ngoName"
          value={formData.ngoName} onChange={handleChange} margin="normal"
        />
        <TextField
          fullWidth label="Email" name="email"
          type="email" value={formData.email}
          onChange={handleChange} margin="normal"
        />
        <TextField
          fullWidth label="Password" name="password"
          type="password" value={formData.password}
          onChange={handleChange} margin="normal"
        />
        <TextField
          fullWidth label="Address" name="address"
          value={formData.address} onChange={handleChange} margin="normal"
        />
        <TextField
          fullWidth label="Contact Number" name="contactNumber"
          value={formData.contactNumber} onChange={handleChange} margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default NgoRegister;
