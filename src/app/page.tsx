import { Summary } from "@/components/transaction/summary"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import dayjs from "dayjs"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")

  const transaction = await prisma.transaction.findMany()

  const transactionToday = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("day").toDate(),
        lte: dayjs().endOf("day").toDate(),
      },
    },
  })
  const transactionWeek = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
        lte: dayjs().endOf("week").toDate(),
      },
    },
  })

  const transactionMonth = await prisma?.transaction.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("month").toDate(),
        lte: dayjs().endOf("month").toDate(),
      },
    },
  })

  const totalAmount = {
    todayIncome: transactionToday
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    todayExpense: transactionToday
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    weekIncome: transactionWeek
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    weekExpense: transactionWeek
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    monthIncome: transactionMonth
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    monthExpense: transactionMonth
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
  }

  return (
    <main className="pt-56 lg:pt-64 flex min-h-screen flex-col items-center justify-between p-4 lg:p-24 bg-zinc-950 text-white">
      <div className="w-full">
        <Summary
          transactionToday={transactionToday}
          transaction={transaction}
          totalAmountWeek={totalAmount.weekIncome - totalAmount.weekExpense}
          totalAmountMonth={totalAmount.monthIncome - totalAmount.monthExpense}
        />
      </div>
    </main>
  )
}
