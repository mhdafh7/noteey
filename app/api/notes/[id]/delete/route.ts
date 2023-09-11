import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import httpStatus from "http-status";

import { authOptions } from "@/libs/authOptions";
import { badRequestResponse, unauthorizedResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";
import { messages } from "@/constants/messages";

type paramsType = {
  params: {
    id: string;
  };
};

// *** Flag delete note ***
export async function PATCH(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    const deletedNote = await NoteService.flagDeleteNoteById(id);

    if (!deletedNote) {
      return badRequestResponse(messages.notes.errors.delete_note);
    }

    return NextResponse.json({
      status: httpStatus.OK,
      statusText: messages.notes.success.delete_note,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}

// *** Delete note ***
export async function DELETE(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    const deletedNote = await NoteService.deleteNoteById(id);

    if (!deletedNote) {
      return badRequestResponse(messages.notes.errors.delete_note);
    }

    return NextResponse.json({
      status: httpStatus.OK,
      statusText: messages.notes.success.delete_note,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
