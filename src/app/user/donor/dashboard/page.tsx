"use client";

import React, { useState, useEffect } from "react";
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
  Button,
  Card,
  CardContent,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DonationData {
  month: string;
  count: number;
}

const DonorDashboard = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DonationData[]>([]);
  const [trend, setTrend] = useState<number>(0);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donations/monthly");
        const json = await res.json();
        setData(json.data);
        setTrend(json.trend);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2 ,color:"black"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color:"blue" }}>
            Welcome
          </Typography>
          <Link href="/user/donor/donate">
            <Button variant="contained" color="error" sx={{ mr: 2}}>
              Donate Food
            </Button>
          </Link>
          <Button color="inherit" onClick={handleLogout}  sx={{ color: "white",backgroundColor:"blue" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250}}>
          <ListItem disablePadding>
            <ListItemButton
            sx={{color:"black"}}
              component={Link}
              href="/user/donor"
              onClick={() => setOpen(false)}
              
            >
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
            <ListItemButton
              component={Link}
              href="/user/donor/profile"
              onClick={() => setOpen(false)}
            >
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
        <Container
          maxWidth={false}
          sx={{
            bgcolor: "white",
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            borderRadius: 3,
          }}
        >
          <Card
            sx={{
              bgcolor: "#0f0f0f",
              color: "white",
              borderRadius: 3,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Donations Chart
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Monthly Donations
              </Typography>

              <Box sx={{ height: "400px", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="month" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f1f1f",
                        border: "none",
                        color: "white",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#64b5f6"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: trend >= 0 ? "#4caf50" : "#f44336",
                  fontWeight: "bold",
                }}
              >
                Trending {trend >= 0 ? "up" : "down"} by {trend}% this month
              </Typography>
              <Typography variant="caption" sx={{ color: "#aaa" }}>
                Showing total donations for the last few months
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default DonorDashboard;
