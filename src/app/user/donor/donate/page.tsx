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
  const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
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
      alert("Donation saved successfully!");
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
    <div className="min-h-screen flex justify-center items-center bg-[#F9FFFB] p-6">
  <Paper elevation={6} className="w-full max-w-2xl p-8">
    <Typography variant="h5" gutterBottom>
      Donate Food
    </Typography>

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TextField
        fullWidth
        label="Food Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <FormControl fullWidth>
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
      />

      <TextField
        fullWidth
        label="Expiry Time"
        name="expiryTime"
        type="datetime-local"
        value={formData.expiryTime}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        fullWidth
        label="Pickup Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Contact Number"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Available Time for Pickup"
        name="availableTime"
        type="time"
        value={formData.availableTime}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl fullWidth>
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

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Donation
      </Button>
    </form>
  </Paper>
</div>

  );
}
