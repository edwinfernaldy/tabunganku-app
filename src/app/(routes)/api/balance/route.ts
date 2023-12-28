import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const getBalance = async (user_id: string) => {
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

export async function GET(req: NextRequest) {
  try {
    const data = await req.json();

    const balance = await getBalance(data.user_id);

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
