// src/app/api/donation/my/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/config/db';
import Donation from '@/models/donationmodel';
import * as jwt from 'jsonwebtoken';

export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get auth header
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Get token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Fetch donations for this user
    const donations = await Donation.find({ userId: decoded.userId });

    return NextResponse.json({ donations });
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
