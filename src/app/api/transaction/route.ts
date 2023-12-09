import prisma from "@/lib/prisma"
import dayjs from "dayjs"
import { IncomingMessage } from "http"
import { NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getSession({ req: req as unknown as IncomingMessage })

  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    })
  }

  const userId = session.user.id
  console.log(userId)

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
  })

  // Convert Decimal to string
  const transactionsWithConvertedAmount = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))

  return res.json(transactionsWithConvertedAmount)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const startOfDay = dayjs(body.createdAt).startOf("day").toDate()

    const endOfDay = dayjs(body.createdAt).endOf("day").toDate()

    const transactionsOfDay = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    const existingTransaction = transactionsOfDay.find(
      (transaction) =>
        transaction.categoryId === body.categoryId &&
        transaction.type === body.type
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
