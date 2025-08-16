"use client";

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DonationCard from "@/app/components/Donationcard";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

interface Donation {
  _id: string;
  foodType: string;
  title: string;
  quantity: string;
  pickupTime?: string;
  location?: string;
  deliveryType?: string;
  availableTime?: string;
}

export default function AvailableDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const acceptedIds = JSON.parse(localStorage.getItem("acceptedDonations") || "[]");

    fetch("http://localhost:5000/api/donation/available")
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const allDonations = data.donations || [];
        // Filter out already accepted IDs
        const filtered = allDonations.filter(
          (donation: Donation) => !acceptedIds.includes(donation._id)
        );
        setDonations(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setLoading(false);
      });
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donation/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      // Store in localStorage so it doesn't show after refresh
      const acceptedIds = JSON.parse(localStorage.getItem("acceptedDonations") || "[]");
      acceptedIds.push(id);
      localStorage.setItem("acceptedDonations", JSON.stringify(acceptedIds));

      // Remove from current UI
      setDonations((prev) => prev.filter((donation) => donation._id !== id));

      // Redirect
      router.push("ngo");
    } catch (err) {
      console.error("Error accepting donation:", err);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donation/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      setDonations((prev) => prev.filter((donation) => donation._id !== id));
    } catch (err) {
      console.error("Error cancelling donation:", err);
    }
  };

  if (loading) return <p>Loading donations...</p>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Available Donations
      </Typography>

      {donations.length === 0 ? (
        <Typography align="center">No donations available right now</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation._id}>
              <Box sx={{ height: "100%" }}>
                <DonationCard
                  _id={donation._id}
                  foodType={donation.foodType}
                  title={donation.title}
                  quantity={donation.quantity}
                  location={donation.location}
                  deliveryType={donation.deliveryType}
                  pickupTime={donation.pickupTime}
                  availableTime={donation.availableTime}
                  onAccept={handleAccept}
                  onCancel={handleCancel}
                  sx={{
                    height: "100%",
                    minHeight: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
