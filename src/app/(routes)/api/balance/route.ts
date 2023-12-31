import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

const getBalance = async (user_id: string) => {
  return await prisma.balance.findMany({
    where: {
      user_id
    },
    orderBy: {
      id: "desc"
    },
    take: 1
  });
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as string;

    if (!data) {
      throw new BadRequestException("Missing User Id");
    }

    const balance = await getBalance(data);

    return NextResponse.json(JSON.stringify(balance[0]));
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
