"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DonorDashboard = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome 
          </Typography>
           <Link href="/user/donor/donate">
            <Button variant="contained" color="error">
              Donate Food
            </Button>
          </Link>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
         
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/user/donor" onClick={() => setOpen(false)}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/user/donor/donation-history"
              onClick={() => setOpen(false)}
            >
              <ListItemText primary="Donation History" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} href="/user/donor/profile" onClick={() => setOpen(false)}>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Cards Section */}
       
      </main>
    </div>
  );
};

export default DonorDashboard;
