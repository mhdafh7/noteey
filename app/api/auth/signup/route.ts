import { messages } from "@/constants/messages";
import { prisma } from "@/libs/db";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: (await req.json()).email.toLowerCase(),
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: messages.auth.errors.user_already_exists,
        }),
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const { firstName, lastName, email, password } =
      (await req.json()) as Prisma.UserCreateInput;
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
