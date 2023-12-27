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

const addTransaction = async (params: TransactionRequestType) => {
  await prisma.transaction.create({
    data: {
      type: params.type,
      desc: params.desc,
      amount: params.amount,
      date: params.date,
      user_id: params.user_id
    }
  });
};

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as TransactionRequestType;

    validate(data);

    addTransaction(data);

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
