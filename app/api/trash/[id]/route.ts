import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import httpStatus from "http-status";
import { authOptions } from "@/libs/authOptions";
import { unauthorizedResponse, badRequestResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";
import { messages } from "@/constants/messages";

type paramsType = {
  params: {
    id: string;
  };
};

// *** Restore a note from trash***
export async function PATCH(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }
    console.log({ params });

    const { id } = params;

    const note = await NoteService.restoreNoteFromTrash(id as string);

    return NextResponse.json(note, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}

// *** Delete a note from trash permanently ***
export async function DELETE(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    await NoteService.deleteNoteFromTrash(id as string);

    return NextResponse.json(
      {
        status: "success",
        message: messages.notes.success.delete_note,
      },
      {
        status: httpStatus.OK,
      }
    );
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
