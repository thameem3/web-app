"use client"
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Donate Food" />
          </ListItemButton>
        </ListItem>
        {/* Add role-based or page-based menu items here */}
      </List>
    </Drawer>
  );
}
