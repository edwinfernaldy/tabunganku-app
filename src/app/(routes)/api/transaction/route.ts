import { BadRequestException } from "@/server/http.errors";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface TransactionRequestType {
  user_id: string;
  date: string;
  type: "INCOME" | "EXPENSE";
  amount: Decimal;
  desc: string;
}

const validate = (params: TransactionRequestType) => {
  if (!params.amount || !params.date || !params.amount || !params.desc) {
    throw new BadRequestException("Missing Input");
  }
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as TransactionRequestType;

    validate(data);

    await prisma.transaction.create({
      data: {
        type: data.type,
        desc: data.desc,
        amount: data.amount,
        date: new Date(data.date).toISOString(),
        user_id: data.user_id
      }
    });

    return NextResponse.json(
      JSON.stringify({
        success: true
      })
    );
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

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.transaction.findMany();

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
