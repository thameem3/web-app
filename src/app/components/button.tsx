'use client';
import { Button as MuiButton } from '@mui/material';
import Link from 'next/link';

interface CustomButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export default function Button({
  label,
  href,
  onClick,
  variant = 'contained',
  color = 'primary',
}: CustomButtonProps) {
  if (href) {
    return (
      <Link href={href} passHref>
        <MuiButton variant={variant} color={color}>
          {label}
        </MuiButton>
      </Link>
    );
  }

  return (
    <MuiButton onClick={onClick} variant={variant} color={color}>
      {label}
    </MuiButton>
  );
}
