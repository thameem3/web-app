"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

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
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/user/profile/${userId}`
        );
        const data = await res.json();
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
      const res = await fetch(
        `http://localhost:5000/api/user/profile/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const updated = await res.json();
      setFormData(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-50">
      <Paper elevation={3} className="p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Donor Profile</Typography>
          {!isEditing ? (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
            >
              Save
            </Button>
          )}
        </div>

        {!isEditing ? (
          // TABLE VIEW
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Full Name</strong></TableCell>
                <TableCell>{formData.fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell>{formData.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell>{formData.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell>{formData.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Donor Type</strong></TableCell>
                <TableCell>{formData.donorType}</TableCell>
              </TableRow>
              {formData.donorType === "organization" && (
                <TableRow>
                  <TableCell><strong>Organization Name</strong></TableCell>
                  <TableCell>{formData.organizationName}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          // EDIT FORM
          <div className="space-y-4">
            {Object.keys(formData).map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field}
                name={field}
                value={(formData as any)[field] || ""}
                onChange={handleChange}
              />
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default DonorProfile;
