import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Button,ListItemButton  } from "@mui/material";

export default function NGODashboard() {
  const [open, setOpen] = useState(false);

  return (
     <div>
      <Button onClick={() => setOpen(true)}>Open Sidebar</Button>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Available Donations" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Accepted Donations" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <h1>Welcome NGO</h1>
    </div>
  );
  
}
