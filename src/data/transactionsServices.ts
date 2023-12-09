import "@/lib/dayjs"
import prisma from "@/lib/prisma"
import dayjs from "dayjs"

export async function getTransactionToday() {
  return await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("day").toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
    },
  })
}

export async function getTransactionWeek() {
  return await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
        lte: dayjs().endOf("week").toDate(),
      },
    },
  })
}

export async function getTransactionMonth() {
  return await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("month").toDate(),
        lte: dayjs().endOf("month").toDate(),
      },
    },
  })
}
