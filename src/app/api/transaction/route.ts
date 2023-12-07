import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request) {
  const transactions = await prisma.transaction.findMany({
    include: {
      categories: true,
    },
  })

  return NextResponse.json(transactions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const transaction = await prisma.transaction.create({
      data: {
        ...body,
        categoryId: body.categoryId,
      },
    })
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error details:", error)
    return NextResponse.json({ message: "Erro ao criar transação" })
  }
}
