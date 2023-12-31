import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface LoginRequestType {
  username: string;
  password: string;
}

const findUser = async (username: string) => {
  const data = await prisma.user.findFirst({
    where: {
      username
    }
  });

  return data;
};

const logIn = async (params: LoginRequestType) => {
  if (!params.username || !params.password) {
    throw new BadRequestException("Missing Input");
  }

  const user_data = await findUser(params.username);

  if (!user_data) {
    throw new BadRequestException("User Not Found");
  }

  if (params.password !== user_data.password) {
    throw new BadRequestException("Wrong Password");
  }

  return user_data;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user_params = (await req.json()) as LoginRequestType;

    const user_info = await logIn(user_params);

    return NextResponse.json(user_info);
  } catch (e) {
    const error = e as Error;

    if (error instanceof BadRequestException) {
      return NextResponse.json({
        error: {
          message: error.message
        }
      });
    } else {
      return NextResponse.json({
        error: {
          message: "Internal server error"
        }
      });
    }
  }
}
