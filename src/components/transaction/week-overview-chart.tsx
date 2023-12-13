"use client"

import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

import { TransactionTypes } from "@/@types/transaction"
import { useDateStore } from "@/context/dates-store"
import { useSelectedDateStore } from "@/context/selescted-date-store"
import { useTransactinsStore } from "@/context/transactions-store"
import "@/lib/dayjs"
import "dayjs/locale/pt"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { useEffect, useMemo } from "react"
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

dayjs.locale("pt")
dayjs.extend(weekOfYear)

interface WeekOverviewChartProps {
  transaction: TransactionTypes[]
  data: DataTypes[]
}

interface DataTypes {
  name: string
  total: number
}

export function WeekOverviewChart({ transaction }: WeekOverviewChartProps) {
  const {
    currentDate,
    currentWeekNumber,
    setCurrentDate,
    setCurrentWeekNumber,
    currentMonth,
    currentYear,
    setCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useDateStore()
  const { daySelected, setDaySelected, monthSelected, setMonthSelected } =
    useSelectedDateStore()

  const {
    totalAmountDay,
    setTotalAmountWeek,
    totalAmountWeek,
    setTotalAmountMonth,
    totalAmountMonth,
  } = useTransactinsStore()

  // const currentYear = currentDate.format("YYYY")
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
    if (currentWeekNumber === -1) setCurrentWeekNumber(51)
  }, [
    calendarWeeksOfYear,
    currentDate,
    setCurrentMonth,
    setCurrentWeekNumber,
    currentWeekNumber,
  ])

  // totalAmountWeek
  useEffect(() => {
    const startOfWeek = calendarWeeksOfYear[currentWeekNumber][0]
    const endOfWeek = calendarWeeksOfYear[currentWeekNumber][6]
    const transactionsInWeek = transaction.filter((transaction) => {
      const transactionDate = dayjs(transaction.createdAt)
      return (
        transactionDate.isSameOrAfter(startOfWeek, "day") &&
        transactionDate.isSameOrBefore(endOfWeek, "day")
      )
    })

    const total = transactionsInWeek.reduce((acc, transaction) => {
      if (transaction.type === "INCOME") {
        return acc + Number(transaction.amount)
      } else {
        return acc - Number(transaction.amount)
      }
    }, 0)

    setTotalAmountWeek(total)
  }, [calendarWeeksOfYear, currentWeekNumber, transaction, setTotalAmountWeek])

  // totalAmountMonth
  useEffect(() => {
    const startOfMonth = currentDate.startOf("month")
    const endOfMonth = currentDate.endOf("month")
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
    setTotalAmountMonth(total)
  }, [currentDate, transaction, setTotalAmountMonth])

  const data = [] as DataTypes[]
  for (let i = 0; i < 7; i++) {
    const day = calendarWeeksOfYear[currentWeekNumber][i]
    const dayTransactions = transaction.filter((transaction) => {
      const transactionDate = dayjs(transaction.createdAt)
      return transactionDate.isSame(day, "day")
    })

    const total = dayTransactions.reduce((acc, transaction) => {
      if (transaction.type === "INCOME") {
        return acc + Number(transaction.amount)
      } else {
        return acc - Number(transaction.amount)
      }
    }, 0)

    data.push({
      name: day.format("ddd"),
      total,
    })
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            spacing={2}
            padding={{ top: 10 }}
          />
          <Bar
            dataKey="total"
            radius={[4, 4, 0, 0]}
            label={{
              position: "top",
              fill: "#6bbfec",
              fontSize: 12,
              fontWeight: "bold",
              formatter: (value: any) => `${value.toFixed(2)} €`,
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.total < 0 ? "red" : "#adfa1d"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
