import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const NgoLogin: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/ngo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("ngoToken", data.token);
        alert("Login Successful");
        // Redirect to NGO Dashboard
        window.location.href = "/ngo/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>NGO Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default NgoLogin;
