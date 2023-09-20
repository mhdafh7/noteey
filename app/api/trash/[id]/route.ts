import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import httpStatus from "http-status";
import { authOptions } from "@/libs/authOptions";
import { unauthorizedResponse, badRequestResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";

type paramsType = {
  params: {
    id: string;
  };
};

// *** Restore a note from trash***
export async function PATCH({ params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    const note = await NoteService.restoreNoteFromTrash(id as string);

    return NextResponse.json(note, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
