import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import httpStatus from "http-status";

import { authOptions } from "@/libs/authOptions";
import { badRequestResponse, unauthorizedResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";
import NoteValidation from "@/libs/api/validations/note.validation";
import zodeError from "@/libs/api/validations/zodeError";

// *** Get all notes ***
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const notes = await NoteService.getNotes(session.user.id);

    return NextResponse.json(notes, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}

// *** Create a note ***
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const requestData = await req.json();

    const response = zodeError(NoteValidation.createNote, requestData);

    if (response) {
      return badRequestResponse(response);
    }

    const { title, description, isPinned } = requestData;

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
