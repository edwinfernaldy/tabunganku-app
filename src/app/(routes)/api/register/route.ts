import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface RegisterRequestType {
  username: string;
  password: string;
  confirm_password: string;
}

const hasSigned = (username: string) => {
  return prisma.user.findFirst({
    where: {
      username
    },
    select: { id: true }
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

    NextResponse.json(
      JSON.stringify({
        success: true
      })
    );

    return true;
  } catch (e) {
    const error = e as Error;
    if (error instanceof BadRequestException) {
      NextResponse.json({
        error: {
          message: error.message
        }
      });
    } else {
      console.log(error);
      NextResponse.json({
        error: {
          message: "Internal server error"
        }
      });
    }
  }
}
