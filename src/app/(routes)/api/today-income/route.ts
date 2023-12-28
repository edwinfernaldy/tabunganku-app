import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as { user_id: string };

    if (!data.user_id) {
      throw new BadRequestException("Missing User Id");
    }

    const income = await prisma.transaction.findMany({
      where: {
        type: "INCOME",
        date: new Date().toISOString(),
        user_id: data.user_id
      }
    });

    return NextResponse.json(income);
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
