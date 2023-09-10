import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import httpStatus from "http-status";

import { authOptions } from "@/libs/authOptions";
import { badRequestResponse, unauthorizedResponse } from "@/libs/apiHelpers";
import NoteService from "@/libs/api/services/note.service";
import NoteValidation from "@/libs/api/validations/note.validation";
import zodeError from "@/libs/api/validations/zodeError";

type paramsType = {
  params: {
    id: string;
  };
};

// *** Get note ***
export async function GET(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    const note = await NoteService.getNoteById(id as string);

    return NextResponse.json(note, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}

// *** Update note ***
export async function PATCH(req: NextRequest, { params }: paramsType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const requestData = await req.json();

    const response = zodeError(NoteValidation.updateNote, requestData);

    if (response) {
      return badRequestResponse(response);
    }

    const { id } = params;
    const { note } = requestData;
    console.info({ requestData });

    const updatedNote = await NoteService.updateNoteById(
      id,
      note?.title,
      note?.description,
      note?.isPinned
    );

    return NextResponse.json(updatedNote, {
      status: httpStatus.OK,
    });
  } catch (error: any) {
    return badRequestResponse(error.message);
  }
}
