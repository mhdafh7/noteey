import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { messages } from "@/constants/messages";

export const unauthorizedResponse = () => {
  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: messages.auth.errors.unauthorized,
    }),
    { status: httpStatus.UNAUTHORIZED }
  );
};

export const badRequestResponse = (message: string) => {
  return new NextResponse(
    JSON.stringify({
      status: "error",
      message,
    }),
    { status: httpStatus.BAD_REQUEST }
  );
};
