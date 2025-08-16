import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Grid } from "@mui/material";

interface DonationCardProps {
  _id: string;
  foodType: string;
  title: string;
  quantity: string;
  location?: string;
  deliveryType?: string;
  pickupTime?: string;
  availableTime?: string;
  onAccept: (id: string) => void;
  onCancel: (id: string) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({
  _id,
  foodType,
  title,
  quantity,
  location,
  deliveryType,
  pickupTime,
  availableTime,
  onAccept,
  onCancel
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        height: "100%",                // ✅ Same height as grid cell
        display: "flex",               // ✅ Flex layout
        flexDirection: "column"
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {foodType}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2">Title: {title}</Typography>
            <Typography variant="body2">Quantity: {quantity}</Typography>
            <Typography variant="body2">Location: {location || "Not specified"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Delivery: {deliveryType || "Not specified"}</Typography>
            <Typography variant="body2">Pickup: {pickupTime || "N/A"}</Typography>
            <Typography variant="body2">Available: {availableTime || "N/A"}</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => onAccept(_id)}
          color="primary"
          variant="contained"
          sx={{ marginRight: 1 }}
        >
          Accept
        </Button>
        <Button
          onClick={() => onCancel(_id)}
          color="error"
          variant="contained"
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonationCard;
