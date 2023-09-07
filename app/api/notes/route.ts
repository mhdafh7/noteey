import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import httpStatus from "http-status";

import { Prisma } from "@prisma/client";
import { authOptions } from "@/libs/authOptions";
import { badRequestResponse, unauthorizedResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";
import NoteValidation from "@/libs/api/validations/note.validation";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const notes = NoteService.getNotes(session.user.id);

    return NextResponse.json(notes, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const response = NoteValidation.createNote.safeParse(req.body);

    if (!response.success) {
      return badRequestResponse(response.error.message);
    }
    const { title, description, isPinned } =
      req.body as unknown as Prisma.NoteCreateInput;

    const note = NoteService.createNote(
      {
        title,
        description,
        isPinned,
      },
      session.user.id
    );

    return NextResponse.json(note, {
      status: httpStatus.CREATED,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
