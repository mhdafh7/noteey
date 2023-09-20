import { messages } from "@/constants/messages";
import { prisma } from "@/libs/db";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const requestBody = (await req.json()) as Prisma.UserCreateInput;
    const { name, email, password } = requestBody;

    console.log(requestBody);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
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

    const hashed_password = await hash(password as string, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
