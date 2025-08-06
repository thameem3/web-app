"use client";

import { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

const DonorProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    donorType: "",
    organizationName: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  console.log("Fetching userId:", userId);
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/profile/${userId}`);
        const data = await res.json();
         console.log("Fetched profile data:", data);  
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setFormData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      <Paper elevation={3} className="p-8 w-full max-w-xl space-y-4">
        <Typography variant="h5">Donor Profile</Typography>
        {["fullName", "email", "phone", "address", "donorType", "organizationName"].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field}
            name={field}
            value={(formData as any)[field] || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        ))}
        {!isEditing ? (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default DonorProfile;
