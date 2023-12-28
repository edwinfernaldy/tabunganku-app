import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as string;

    if (!data) {
      throw new BadRequestException("Missing User Id");
    }

    const income = await prisma.transaction.findMany({
      where: {
        type: "INCOME",
        user_id: data
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
