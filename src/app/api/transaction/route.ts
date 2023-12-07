import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request) {
  const transactions = await prisma.transaction.findMany()

  return NextResponse.json(transactions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const startOfDay = new Date(body.createdAt)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(body.createdAt)
    endOfDay.setHours(23, 59, 59, 999)

    const transactionsOfDay = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    const existingTransaction = transactionsOfDay.find(
      (transaction) => transaction.categoryId === body.categoryId
    )

    if (existingTransaction) {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: existingTransaction.id },
        data: {
          amount: Number(existingTransaction.amount) + Number(body.amount),
        },
      })

      return NextResponse.json(updatedTransaction)
    } else {
      const transaction = await prisma.transaction.create({
        data: {
          ...body,
          categoryId: body.categoryId,
        },
      })

      return NextResponse.json(transaction, { status: 201 })
    }
  } catch (error) {
    console.error("Error details:", error)
    return NextResponse.json({ message: "Erro ao criar/atualizar transação" })
  }
}
