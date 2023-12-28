import { BadRequestException } from "@/server/http.errors";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user_id = (await req.json()) as string;

    const data = await prisma.transaction.groupBy({
      where: {
        user_id: user_id
      },
      by: ["month", "type"],
      _sum: { amount: true }
    });

    console.log(data);

    return NextResponse.json(data);
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
