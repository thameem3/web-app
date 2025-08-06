"use client";

import { useEffect, useState } from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function FoodHistoryPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donation");
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="p-8">
      <Typography variant="h5" gutterBottom>
        Donation History
      </Typography>

      <Paper elevation={4} className="mt-4 overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Food Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Pickup Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Delivery Type</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((donation: any) => (
              <TableRow key={donation._id}>
                <TableCell>{donation.title}</TableCell>
                <TableCell>{donation.foodType}</TableCell>
                <TableCell>{donation.quantity}</TableCell>
                <TableCell>{donation.address}</TableCell>
                <TableCell>{donation.contactNumber}</TableCell>
                <TableCell>{donation.deliveryType}</TableCell>
                <TableCell>{new Date(donation.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
