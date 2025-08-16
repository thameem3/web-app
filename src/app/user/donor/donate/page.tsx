"use client";

import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function DonateFoodPage() {
  const [formData, setFormData] = useState({
    title: "",
    foodType: "",
    quantity: "",
    expiryTime: "",
    address: "",
    contactNumber: "",
    availableTime: "",
    deliveryType: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setOpen(true); // show snackbar on success
      } else {
        alert(result.message || "Failed to submit donation.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Server error");
    }

    setFormData({
      title: "",
      foodType: "",
      quantity: "",
      expiryTime: "",
      address: "",
      contactNumber: "",
      availableTime: "",
      deliveryType: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F4FFF6] p-6">
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 6,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "#388e3c",
            mb: 4,
          }}
        >
          Donate Food
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Food Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Food Type</InputLabel>
            <Select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              label="Food Type"
            >
              <MenuItem value="Cooked">Cooked</MenuItem>
              <MenuItem value="Uncooked">Uncooked</MenuItem>
              <MenuItem value="Packed">Packed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Quantity (e.g., 5 packs, 2 kg)"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Expiry Time"
            name="expiryTime"
            type="datetime-local"
            value={formData.expiryTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Pickup Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Available Time for Pickup"
            name="availableTime"
            type="time"
            value={formData.availableTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Delivery Type</InputLabel>
            <Select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              label="Delivery Type"
            >
              <MenuItem value="I can deliver">I can deliver</MenuItem>
              <MenuItem value="NGO should collect">NGO should collect</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              backgroundColor: "#388e3c",
              "&:hover": { backgroundColor: "#2e7d32" },
            }}
          >
            Submit Donation
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%", fontWeight: 500 }}
        >
          Donation submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
