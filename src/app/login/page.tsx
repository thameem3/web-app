"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Divider,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save JWT
        if (data.role === "donor") {
          router.push("/user/donor");
        } else {
          router.push("/user/donor");
        }
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#E6FDEC] p-8">
        <img src="/login.png" alt="Login Illustration" className="w-96" />
        <h2 className="text-3xl font-bold mt-6 text-gray-800">Welcome to FoodShare</h2>
        <p className="text-center text-gray-600 mt-2 max-w-sm">
          Join hands to reduce food waste and feed those in need. Login to donate or request food — every action counts!
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#F8FFFB] px-6 py-10">
        <div className="w-full max-w-md">
          <Typography variant="h4" align="center" gutterBottom>
            <strong>FOOD</strong> <span>HUB</span>
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4"
            />

            <div className="text-right mt-5">
              <MuiLink href="#" underline="hover" color="primary">
                Forgot password?
              </MuiLink>
            </div>

            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button variant="outlined" fullWidth>
            Sign in with Google
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 2 }}>
            Are you new?{" "}
            <Link href="/register" passHref legacyBehavior>
              <MuiLink underline="hover" color="primary">
                Create an Account
              </MuiLink>
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
