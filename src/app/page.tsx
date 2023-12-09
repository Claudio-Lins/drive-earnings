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

async function getTrasactionByUserId(userId: string) {
  return await prisma.transaction.findMany({
    where: {
      userId,
    },
  })
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")

  const transaction = (await getTrasactionByUserId(session.user.id)).map(
    (transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    })
  )

  // const transaction = (
  //   await prisma.transaction.findMany({
  //     where: {
  //       userId: session.user.id,
  //     },
  //   })
  // ).map((transaction) => ({
  //   ...transaction,
  //   amount: transaction.amount.toString(),
  // }))

  const transactionToday = (await getTransactionToday())
    .filter((transaction) => transaction.userId === session.user.id)
    .map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    }))
  const transactionWeek = (await getTransactionWeek())
    .filter((transaction) => transaction.userId === session.user.id)
    .map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
    }))
  const transactionMonth = (await getTransactionMonth())
    .filter((transaction) => transaction.userId === session.user.id)
    .map((transaction) => ({
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
    <main className="pt-48 lg:pt-56">
      <Summary
        transactionToday={transactionToday}
        transaction={transaction}
        totalAmountWeek={totalAmount.weekIncome - totalAmount.weekExpense}
        totalAmountMonth={totalAmount.monthIncome - totalAmount.monthExpense}
      />
    </main>
  )
}
