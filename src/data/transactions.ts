import prisma from "@/lib/prisma"
import dayjs from "dayjs"

export async function transactions() {
  await prisma?.transaction.findMany()
}

export async function transactionDay() {
  await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("day").toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
    },
  })
}
