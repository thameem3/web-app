'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Mobile Hamburger Button (Left Side) */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <IconButton onClick={() => setOpen(true)} color="primary">
              <MenuIcon />
            </IconButton>
          </div>
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FoodBridge
          </Link>
        </div>

        {/* Desktop Links (Right Side) */}
        <div className="hidden md:flex gap-6 text-blue-600">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Drawer for Mobile - Left Side */}
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <List>
              {navLinks.map((link) => (
                <ListItem key={link.label} disablePadding>
                  <ListItemButton component={Link} href={link.href}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
