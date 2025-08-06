// components/DashboardCard.tsx
"use client";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SvgIconComponent } from "@mui/icons-material";

interface DashboardCardProps {
  icon: SvgIconComponent;
  title: string;
  value: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, value, color }) => {
  return (
    <Card className="shadow-lg">
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Icon className={color} fontSize="large" />
          <div>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {value}
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
