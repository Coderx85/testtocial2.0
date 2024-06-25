import createCustomHash from '@/hooks/customHash';
import { existingObjectId } from '../../../../build/existingObjectID';
import { connectDB } from '@/lib/connectdb';
import User from '@/models/User.modal';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectDB();
    const sessionID = req.url.split('=')[1];
    const userId = createCustomHash(sessionID);
    // console.log(userId);
    
    const user = await User.findById(userId);
      
    if (!user) {
      return new NextResponse(`User with ID ${userId} not found`, { status: 404 })
    }
    
    console.log(user);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err :any) {
    console.error(err);
    return new NextResponse(null, { status: 500 });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const sessionID = req.url.split('=')[1];
    const userID = existingObjectId(sessionID);
    console.log(userID);

    const user = await User.findById(userID).lean();

    if (!user) {
      return new NextResponse(null, { status: 404 });
    }
    console.log(user);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err :any) {
    console.error(err);
    return new NextResponse(null, { status: 500 });
  }
}