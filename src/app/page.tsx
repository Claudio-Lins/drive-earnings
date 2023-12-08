import { Summary } from "@/components/transaction/summary"
import {
  getTransactionMonth,
  getTransactionToday,
  getTransactionWeek,
} from "@/data/transactionsServices"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")

  const transaction = (await prisma.transaction.findMany()).map(
    (transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    })
  )

  const transactionToday = (await getTransactionToday()).map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
  const transactionWeek = (await getTransactionWeek()).map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))
  const transactionMonth = (await getTransactionMonth()).map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toString(),
  }))

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
