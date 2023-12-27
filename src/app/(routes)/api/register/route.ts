import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface RegisterRequestType {
  username: string;
  password: string;
  confirm_password: string;
}

const hasSigned = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username
    }
  });
};

const register = async (params: RegisterRequestType) => {
  if (await hasSigned(params.username)) {
    throw new BadRequestException("Already signed up");
  }

  if (!params.username || !params.confirm_password || !params.password) {
    throw new BadRequestException("Missing Input");
  }

  if (params.username.length < 3 || params.username.length >= 20) {
    throw new BadRequestException("Invalid Username");
  }

  if (params.password !== params.confirm_password) {
    throw new BadRequestException("Password Not Match");
  }

  await prisma.user.create({
    data: {
      username: params.username,
      password: params.password
    }
  });
};

export async function POST(req: NextRequest) {
  try {
    const user = (await req.json()) as RegisterRequestType;

    await register(user);

    const user_info = await prisma.user.findFirst({
      where: { username: user.username }
    });

    return NextResponse.json(JSON.stringify(user_info));
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
