import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { UserRegisterType } from "@/schema/user";

export async function POST(
  request: Request, 
) {
  const body : UserRegisterType = await request.json();
  const { 
    email,
    password,
    name,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}