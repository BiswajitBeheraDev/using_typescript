import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server.js';

const prisma = new PrismaClient();

// GET: Fetch all users
export async function GET(): Promise<Response> {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// POST: Create a new user
export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();

  const newUser = await prisma.user.create({
    data: body,
  });

  return Response.json(newUser);
}
