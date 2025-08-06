"use client";
import React from "react";
import { Typography } from "@mui/material";
import DashboardCard from "@/app/components/Dashboardcard";
import { Favorite, HourglassBottom, CheckCircle, History, FoodBank } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";


const DonorDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Donor Panel</h2>
      <ul className="space-y-4 text-gray-700 font-medium">
        <li>
          <Link href="/user/donor" className="hover:text-green-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/user/donor/donation-history" className="hover:text-green-700">
            Donation History
          </Link>
        </li>
        <li>
          <Link href="/user/donor/profile" className="hover:text-green-700">
            Profile
          </Link>
        </li>
      </ul>
    </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h4" className="text-green-700 font-bold">
            Welcome to Your Dashboard
          </Typography>
          <Link href="/user/donor/donate">
           <Button variant="contained" color="success">
            Donate Food
          </Button>
          </Link>
        </div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard icon={Favorite} title="Total Donations" value="12 Donations" color="text-red-500" />
          <DashboardCard icon={HourglassBottom} title="Pending Pickups" value="3 in Progress" color="text-yellow-600" />
          <DashboardCard icon={CheckCircle} title="Completed" value="9 Completed" color="text-green-600" />
        </div>

        {/* Additional Section */}
        <Typography variant="h6" className="mb-4">
          Recent Activity
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard icon={History} title="Last Donation" value="30 July, 2025" color="text-blue-600" />
          <DashboardCard icon={FoodBank} title="Upcoming Donation Slot" value="02 August, 2025" color="text-purple-600" />
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
