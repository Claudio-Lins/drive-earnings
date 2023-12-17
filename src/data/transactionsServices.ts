import { authOptions } from "@/lib/auth"
import "@/lib/dayjs"
import prisma from "@/lib/prisma"
import dayjs, { OpUnitType } from "dayjs"
import { getServerSession } from "next-auth"

async function getTransaction(
  userId: string,
  startOf: OpUnitType,
  endOf: OpUnitType
) {
  const transaction = await prisma?.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: dayjs().startOf(startOf).toDate(),
        lte: dayjs().endOf(endOf).toDate(),
      },
    },
  })
  return transaction.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
}

export const getTransactionToday = (userId: string) =>
  getTransaction(userId, "day", "day")
export const getTransactionWeek = (userId: string) =>
  getTransaction(userId, "week", "week")
export const getTransactionMonth = (userId: string) =>
  getTransaction(userId, "month", "month")
export const getTransactionYear = (userId: string) =>
  getTransaction(userId, "year", "year")

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

// // getTransactionToday
// export async function getTransactionToday(userId: string) {
//   const transaction = await prisma.transaction.findMany({
//     where: {
//       userId,
//       createdAt: {
//         gte: dayjs().startOf("day").toDate(),
//         lte: dayjs().endOf("day").toDate(),
//       },
//     },
//   })
//   return transaction.map((transaction) => ({
//     ...transaction,
//     amount: transaction.amount.toString(),
//   }))
// }

// // TransactionWeek
// export async function getTransactionWeek(userId: string) {
//   const transaction = await prisma?.transaction.findMany({
//     where: {
//       userId,
//       createdAt: {
//         gte: dayjs().startOf("week").toDate(),
//         lte: dayjs().endOf("week").toDate(),
//       },
//     },
//   })
//   return transaction.map((transaction) => ({
//     ...transaction,
//     amount: transaction.amount.toString(),
//   }))
// }

// export async function getTransactionMonth(userId: string) {
//   const transaction = await prisma?.transaction.findMany({
//     where: {
//       userId,
//       createdAt: {
//         gte: dayjs().startOf("month").toDate(),
//         lte: dayjs().endOf("month").toDate(),
//       },
//     },
//   })
//   return transaction.map((transaction) => ({
//     ...transaction,
//     amount: transaction.amount.toString(),
//   }))
// }

// export async function getTransactionYear(userId: string) {
//   const transaction = await prisma?.transaction.findMany({
//     where: {
//       userId,
//       createdAt: {
//         gte: dayjs().startOf("year").toDate(),
//         lte: dayjs().endOf("year").toDate(),
//       },
//     },
//   })
//   return transaction.map((transaction) => ({
//     ...transaction,
//     amount: transaction.amount.toString(),
//   }))
// }

// export async function getTotalDay(userId: string, selectedDay: Date) {
//   const transactions = await prisma?.transaction.findMany({
//     where: {
//       userId,
//       createdAt: {
//         gte: dayjs(selectedDay).startOf("day").toDate(),
//         lte: dayjs(selectedDay).endOf("day").toDate(),
//       },
//     },
//   })
//   const totalDay = transactions
//     .filter((transaction) => transaction.type === "INCOME")
//     .reduce((acc, transaction) => acc + Number(transaction.amount), 0)
//   return totalDay
// }
