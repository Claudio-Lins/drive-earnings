"use client"

import { TransactionTypes } from "@/@types/transaction"
import { useSelectedDateStore } from "@/context/selescted-date-store"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// interface TransactionTypes {
//   id: string
//   type: TransactionType
//   entity: string
//   paymentMethod: string
//   recurring: string | null
//   name: string
//   amount: string
//   location: string | null
//   notes: string | null
//   receipt: string | null
//   bankAccount: string | null
//   userId: string | null
//   categoryId: string | null
//   createdAt: Date
// }

interface SummaryProps {
  transactionToday: TransactionTypes[]
  transaction: TransactionTypes[]
  totalAmountWeek: number
  totalAmountMonth: number
}

export function Summary({
  transaction,
  totalAmountWeek,
  totalAmountMonth,
}: SummaryProps) {
  const { daySelected, monthSelected } = useSelectedDateStore()
  const [todayIncome, setTodayIncome] = useState(0)
  const [todayExpense, setTodayExpense] = useState(0)

  useEffect(() => {
    const todayIncome = transaction
      .filter((transaction) => {
        return (
          transaction.createdAt.toLocaleDateString().slice(0, 2) === daySelected
        )
      })
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, transaction) => {
        return acc + Number(transaction.amount)
      }, 0)

    const todayExpense = transaction
      .filter((transaction) => {
        return (
          transaction.createdAt.toLocaleDateString().slice(0, 2) === daySelected
        )
      })
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, transaction) => {
        return acc + Number(transaction.amount)
      }, 0)

    setTodayExpense(todayExpense)
    setTodayIncome(todayIncome)
  }, [daySelected, transaction])

  const todalDaily = todayIncome - todayExpense

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 3.5 }}
      className="flex text-white max-h-40 w-full items-center justify-evenly gap-2 lg:px-32 fixed"
    >
      <div className="w-36 flex flex-col items-center justify-between space-y-4">
        <small>Taday</small>
        <span
          className={cn(
            "text-2xl lg:text-3xl font-bold",
            todalDaily > todayExpense
              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text "
              : "text-red-500"
          )}
        >
          {todalDaily} €
        </span>
      </div>
      <div className="w-36 flex flex-col items-center justify-between space-y-4">
        <small>Week</small>
        <span className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          {new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
          }).format(totalAmountWeek)}
        </span>
      </div>
      <div className="w-36 flex flex-col items-center justify-between space-y-4">
        <small>Month</small>
        <span className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          {new Intl.NumberFormat("pt-PT", {
            style: "currency",
            currency: "EUR",
          }).format(totalAmountMonth)}
        </span>
      </div>
    </motion.div>
  )
}
