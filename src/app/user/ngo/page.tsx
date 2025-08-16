"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import AvailableDonations from "../ngo/Availabledonation/Availabledonation";
import AcceptedDonations from "./acceptdonation/page";
import History from "../ngo/History/history";

const NGODashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("available");

    const router = useRouter();
   const handleLogout = () => {
    localStorage.removeItem("userId"); // clear stored user ID
    localStorage.removeItem("token"); // clear JWT token if stored
    router.push("/login"); // redirect to login page
  };

  const renderSection = () => {
    switch (activeSection) {
      case "available":
        return <AvailableDonations />;
      case "accepted":
        return <AcceptedDonations />;
      case "history":
        return <History />;
      default:
        return <AvailableDonations />;
    }
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
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
            NGO Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ border: "1px solid white", ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSection("available");
                setOpen(false);
              }}
            >
              <ListItemText primary="Available Donations" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSection("accepted");
                setOpen(false);
              }}
            >
              <ListItemText primary="Accepted Donations" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSection("history");
                setOpen(false);
              }}
            >
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Page Content */}
      <div style={{ padding: 20 }}>{renderSection()}</div>
    </div>
  );
};

export default NGODashboard;
