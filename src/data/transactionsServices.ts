import { authOptions } from "@/lib/auth"
import "@/lib/dayjs"
import prisma from "@/lib/prisma"
import dayjs from "dayjs"
import { getServerSession } from "next-auth"

export async function getTrasactionByUserId(userId: string) {
  const session = await getServerSession(authOptions)
  const transaction = await prisma.transaction.findMany({
    where: {
      userId,
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

// getTransactionToday
export async function getTransactionToday(userId: string) {
  const transaction = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs().startOf("day").toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

// TransactionWeek
export async function getTransactionWeek(
  userId: string,
  start: Date,
  end: Date
) {
  const transaction = await prisma?.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
        lte: dayjs().endOf("week").toDate(),
      },
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

export async function getTransactionMonth(userId: string) {
  const transaction = await prisma?.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs().startOf("month").toDate(),
        lte: dayjs().endOf("month").toDate(),
      },
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

export async function getTransactionYear(userId: string) {
  const transaction = await prisma?.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs().startOf("year").toDate(),
        lte: dayjs().endOf("year").toDate(),
      },
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

export async function getTotalDay(userId: string, selectedDay: Date) {
  const transactions = await prisma?.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs(selectedDay).startOf("day").toDate(),
        lte: dayjs(selectedDay).endOf("day").toDate(),
      },
    },
  })
  const totalDay = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0)
  return totalDay
}
