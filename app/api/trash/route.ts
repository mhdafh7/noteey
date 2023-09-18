import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import httpStatus from "http-status";
import { authOptions } from "@/libs/authOptions";
import { unauthorizedResponse, badRequestResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const notesInTrash = await NoteService.getNotesInTrash(session.user.id);

    return NextResponse.json(notesInTrash, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
