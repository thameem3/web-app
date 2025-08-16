"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "donor",
    donorType: "individual",
    orgName: "",
    contactPerson: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const numeric = value.replace(/\D/g, ""); 
      if (numeric.length <= 10) {
        setFormData({ ...formData, [name]: numeric });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
       setOpen(true);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      // ✅ Redirect based on role
    setTimeout(() => {
          if (data.role === "donor") {
            router.push("/user/donor");
          } else {
            router.push("/user/ngo");
          }
        }, 1000);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
 };


 return (
  <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
    <Paper elevation={8} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Mobile Number"
          name="mobile"
          margin="normal"
          value={formData.mobile}
          onChange={handleChange}
          inputProps={{ inputMode: "numeric", maxLength: 10 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          margin="normal"
          value={formData.address}
          onChange={handleChange}
        />

        <Box mt={2}>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <FormControlLabel value="donor" control={<Radio />} label="Donor" />
            <FormControlLabel value="ngo" control={<Radio />} label="NGO" />
          </RadioGroup>
        </Box>

        {formData.role === "donor" && (
          <Box mt={2}>
            <FormLabel>Donor Type</FormLabel>
            <RadioGroup
              row
              name="donorType"
              value={formData.donorType}
              onChange={handleChange}
            >
              <FormControlLabel value="individual" control={<Radio />} label="Individual" />
              <FormControlLabel value="organization" control={<Radio />} label="Organization" />
            </RadioGroup>
          </Box>
        )}

        {(formData.donorType === "organization" || formData.role === "ngo") && (
          <>
            <TextField
              fullWidth
              label="Organization Name"
              name="orgName"
              margin="normal"
              value={formData.orgName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Contact Person Name"
              name="contactPerson"
              margin="normal"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
        >
          Register
        </Button>
      </form>
    </Paper>

    {/* Snackbar for success message */}
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        Successfully Registered!
      </Alert>
    </Snackbar>
  </Container>
);

}
