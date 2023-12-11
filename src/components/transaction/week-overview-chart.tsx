"use client"

import dayjs from "dayjs"

import { TransactionTypes } from "@/@types/transaction"
import { useSelectedDateStore } from "@/context/selescted-date-store"
import "@/lib/dayjs"
import "dayjs/locale/pt"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { useEffect, useMemo, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

dayjs.locale("pt")
dayjs.extend(weekOfYear)

interface WeekOverviewChartProps {
  transaction: TransactionTypes[]
}

export function WeekOverviewChart({ transaction }: WeekOverviewChartProps) {
  const { daySelected, setDaySelected, monthSelected, setMonthSelected } =
    useSelectedDateStore()
  const [currentDate, setCureentDate] = useState(() => {
    return dayjs()
  })

  const [weekNumber, setWeekNumber] = useState(() => {
    return currentDate.week()
  })

  const [currentMonth, setCurrentMonth] = useState(() => {
    return currentDate.format("MMMM")
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month")
    setCureentDate(previousMonthDate)
  }
  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month")
    setCureentDate(nextMonthDate)
  }

  function handlePreviousWeek() {
    const previousWeekNumber = weekNumber - 1
    setWeekNumber(previousWeekNumber)
  }

  function handleNextWeek() {
    const nextWeekNumber = weekNumber + 1
    setWeekNumber(nextWeekNumber)
  }

  const currentYear = currentDate.format("YYYY")
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
    setCurrentMonth(calendarWeeksOfYear[weekNumber][0].format("MMMM"))
    if (weekNumber === 52) setWeekNumber(0)
    if (weekNumber === -1) setWeekNumber(51)
  }, [calendarWeeksOfYear, currentDate, weekNumber])

  function getSelectedDate(dia: string, mes: string) {
    setDaySelected(dia)
    setMonthSelected(mes)
  }

  const data = []
  for (let i = 0; i < 7; i++) {
    const day = calendarWeeksOfYear[weekNumber][i]
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
  console.log(data)

  return (
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
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          label={{
            position: "top",
            fill: "#299edc",
            fontSize: 12,
            fontWeight: "bold",
            formatter: (value: any) => `${value.toFixed(2)} €`,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
