'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

type UserRole = 'donor' | 'ngo';

interface MenuItem {
  label: string;
  href: string;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

const donorMenu: MenuItem[] = [
  { label: 'Available Donations', href: '/donor/available' },
  { label: 'My Donations', href: '/donor/my-donations' },
  { label: 'History', href: '/donor/history' },
];

const ngoMenu: MenuItem[] = [
  { label: 'Available Requests', href: '/ngo/requests' },
  { label: 'Accepted Requests', href: '/ngo/accepted' },
  { label: 'History', href: '/ngo/history' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Detect role from pathname
  let userRole: UserRole | null = null;
  if (pathname.startsWith('/donor')) {
    userRole = 'donor';
  } else if (pathname.startsWith('/ngo')) {
    userRole = 'ngo';
  }

  const getSidebarMenu = (): MenuItem[] => {
    if (userRole === 'donor') return donorMenu;
    if (userRole === 'ngo') return ngoMenu;
    return [];
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2">
          {userRole && (
            <IconButton onClick={() => setOpen(true)} color="primary">
              <MenuIcon />
            </IconButton>
          )}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            FoodBridge
          </Link>
        </div>

        {/* Desktop Links (only for public pages) */}
        {!userRole && (
          <div className="hidden md:flex gap-6 text-blue-600">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Drawer (Sidebar) */}
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
            <List>
              {getSidebarMenu().map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton component={Link} href={item.href}>
                    <ListItemText primary={item.label} />
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
