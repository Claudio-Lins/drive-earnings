"use client"

import { TransactionTypes } from "@/@types/transaction"
import { useDateStore } from "@/context/dates-store"
import { useSelectedDateStore } from "@/context/selescted-date-store"
import { useTransactinsStore } from "@/context/transactions-store"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import { DayCard } from "../dates/DayCard"
import { Progress } from "../ui/progress"

dayjs.extend(weekOfYear)

interface ResumeProps {
  transactionToday: TransactionTypes[]
  transactionWeek: TransactionTypes[]
  transactionMonth: TransactionTypes[]
  transaction: TransactionTypes[]
  startOfWeek: Date
  endOfWeek: Date
  // totalAmountWeek: number
  // totalAmountMonth: number
}

export function Resume({
  transaction,
  transactionToday,
  transactionWeek,
  transactionMonth,
  startOfWeek,
  endOfWeek,
}: ResumeProps) {
  const { data: session } = useSession()
  const daylyGoal = Number(session?.user?.daylyGoal)
  const weeklyGoal = Number(session?.user?.weeklyGoal)
  const monthlyGoal = Number(session?.user?.monthlyGoal)

  const [totalDay, setTotalDay] = useState(0)
  const {
    currentDate,
    currentWeekNumber,
    setCurrentDate,
    setCurrentWeekNumber,
    currentMonth,
    currentYear,
    setCurrentMonth,
  } = useDateStore()
  const {
    daySelected,
    setDaySelected,
    weekSelected,
    setWeekSelected,
    monthSelected,
    setMonthSelected,
  } = useSelectedDateStore()
  const {
    setTotalAmountDay,
    totalAmountDay,
    totalAmountWeek,
    setTotalAmountMonth,
    totalAmountMonth,
  } = useTransactinsStore()

  const calendarWeeksOfYear = useMemo(() => {
    const firstDayOfYear = currentDate.startOf("year")
    const firstDayOfCalendar = firstDayOfYear.startOf("week")
    const lastDayOfYear = currentDate.endOf("year")
    const lastDayOfCalendar = lastDayOfYear.endOf("week")
    const calendar = []

    let currentDay = firstDayOfCalendar
    while (currentDay.isBefore(lastDayOfCalendar)) {
      const week = []
      for (let i = 0; i < 7; i++) {
        week.push(currentDay)
        currentDay = currentDay.add(1, "day")
      }
      calendar.push(week)
    }
    return calendar
  }, [currentDate])

  useEffect(() => {
    setCurrentMonth(calendarWeeksOfYear[currentWeekNumber][0].format("MMMM"))
    if (currentWeekNumber === 53) setCurrentWeekNumber(0)
    if (currentWeekNumber === -1) setCurrentWeekNumber(52)
  }, [
    calendarWeeksOfYear,
    currentDate,
    setCurrentMonth,
    setCurrentWeekNumber,
    currentWeekNumber,
  ])

  function handlePreviousWeek() {
    const previousWeekNumber = currentWeekNumber - 1
    setCurrentWeekNumber(previousWeekNumber)
  }

  function handleNextWeek() {
    const nextWeekNumber = currentWeekNumber + 1
    setCurrentWeekNumber(nextWeekNumber)
  }

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, "month")
    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, "month")
    setCurrentDate(nextMonth)
  }

  function getSelectedDate(dia: string, mes: string) {
    setDaySelected(dia)
    setMonthSelected(mes)
  }

  // Today
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

  // totalAmountMonth
  useEffect(() => {
    console.log("useEffect triggered")
    const startOfMonth = currentDate.startOf("month")
    const endOfMonth = currentDate.endOf("month")
    console.log("startOfMonth:", startOfMonth)
    console.log("endOfMonth:", endOfMonth)
    const transactionsInMonth = transaction.filter((transaction) => {
      const transactionDate = dayjs(transaction.createdAt)
      return (
        transactionDate.isSameOrAfter(startOfMonth, "day") &&
        transactionDate.isSameOrBefore(endOfMonth, "day")
      )
    })

    const total = transactionsInMonth.reduce((acc, transaction) => {
      if (transaction.type === "INCOME") {
        return acc + Number(transaction.amount)
      } else {
        return acc - Number(transaction.amount)
      }
    }, 0)
    console.log("total:", total)
    setTotalAmountMonth(total)
  }, [currentDate, transaction, setTotalAmountMonth, monthSelected])

  useEffect(() => {
    console.log("currentDate:", currentDate)
  }, [currentDate])

  //
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
  useEffect(() => {
    setTotalAmountDay(todayIncome - todayExpense)
  }, [
    setTotalAmountDay,
    totalAmount.todayExpense,
    totalAmount.todayIncome,
    daySelected,
    transaction,
    todayIncome,
    todayExpense,
  ])

  const totalDaily = todayIncome - todayExpense
  // const totalDailyWeek = totalAmount.weekIncome - totalAmount.weekExpense
  const totalDailyMonth = totalAmount.monthIncome - totalAmount.monthExpense

  // PROGRESS BAR
  const [progressDayly, setProgressDayly] = useState(
    (totalAmountDay / daylyGoal) * 100 || 0
  )
  const [progressWeek, setProgressWeek] = useState(
    (totalAmountWeek / weeklyGoal) * 100 || 0
  )
  const [progressMonth, setProgressMonth] = useState(
    (totalDailyMonth / monthlyGoal) * 100 || 0
  )
  useEffect(() => {
    const newProgressDayly = (totalAmountDay / daylyGoal) * 100
    setProgressDayly(Math.max(0, Math.min(newProgressDayly, 100)))
    const newProgressWeek = (totalAmountWeek / weeklyGoal) * 100
    setProgressWeek(Math.max(0, Math.min(newProgressWeek, 100)))
    const newProgressMonth = (totalAmountMonth / monthlyGoal) * 100
    setProgressMonth(Math.max(0, Math.min(newProgressMonth, 100)))
  }, [
    totalAmountDay,
    daylyGoal,
    totalAmountWeek,
    weeklyGoal,
    totalAmountMonth,
    monthlyGoal,
  ])

  return (
    <div className="flex flex-col space-y-8">
      <div className="mx-auto w-full flex flex-col space-y-4 items-center mt-4  bg-transparent text-white">
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-2 w-56"
        >
          <div className=" ">
            <span className="capitalize font-semibold text-xl text-zinc-100">
              {currentMonth}
            </span>
            <span className="text-zinc-400"> {currentYear}</span>
          </div>
        </motion.div>
        <div className="flex md:flex-row items-center justify-center gap-2 md:gap-6">
          {calendarWeeksOfYear[currentWeekNumber].map((week, index) => {
            return (
              <motion.button
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                key={index}
                onClick={() =>
                  getSelectedDate(week.format("DD"), week.format("MMM"))
                }
              >
                <DayCard
                  className={cn(
                    daySelected === week.format("DD") &&
                      "border-2 border-red-500"
                  )}
                  active={
                    week.isSame(dayjs(), "day") &&
                    week.isSame(dayjs(), "month") &&
                    week.isSame(dayjs(), "year")
                  }
                  day={week.format("DD")}
                  weekDay={week.format("ddd")}
                />
              </motion.button>
            )
          })}
        </div>
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="flex items-center justify-between gap-4"
        >
          <button className="" onClick={handlePreviousWeek}>
            <ChevronLeft className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
          </button>
          {/* <p>{currentWeekNumber}</p> */}
          <button onClick={handleNextWeek}>
            <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
          </button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        className="flex text-white max-h-40 w-full items-center justify-evenly gap-2 lg:px-32"
      >
        <div className="w-36 flex flex-col items-center justify-between space-y-4">
          <small>
            {daySelected === dayjs(currentDate).format("D")
              ? "Hoje"
              : `${daySelected}/${monthSelected}`}
          </small>
          <span
            className={cn(
              "text-2xl lg:text-3xl font-bold",
              totalDaily >= 0
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text "
                : "text-red-500"
            )}
          >
            {new Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
            }).format(totalAmountDay)}
          </span>
          <Progress
            value={100 - progressDayly}
            className="rotate-180 bg-gradient-to-l border border-zinc-600 from-purple-600 to-pink-500"
          />
        </div>
        <div className="w-36 flex flex-col items-center justify-between space-y-4">
          <small>Semana {currentWeekNumber}</small>
          <span className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            {new Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
            }).format(totalAmountWeek)}
          </span>
          <Progress
            value={100 - progressWeek}
            className="rotate-180 bg-gradient-to-l border border-zinc-600 from-purple-600 to-pink-500"
          />
        </div>
        <div className="w-36 flex flex-col items-center justify-between space-y-4">
          <div className="flex items-center justify-center gap-2">
            <button onClick={handlePreviousMonth}>
              <ChevronLeft className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
            </button>
            <small className="capitalize">
              {dayjs(currentDate).format("MMMM")}
            </small>
            <button onClick={handleNextMonth}>
              <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
            </button>
          </div>
          <span className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            {new Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
            }).format(totalAmountMonth)}
          </span>
          <Progress
            value={100 - progressMonth}
            className="rotate-180 bg-gradient-to-l border border-zinc-600 from-purple-600 to-pink-500"
          />
        </div>
      </motion.div>
    </div>
  )
}
