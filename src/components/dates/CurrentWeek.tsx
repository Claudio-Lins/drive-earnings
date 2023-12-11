"use client"

import { useDateStore } from "@/context/dates-store"
import { useSelectedDateStore } from "@/context/selescted-date-store"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo } from "react"
import { DayCard } from "./DayCard"

dayjs.extend(weekOfYear)

export function CurrentWeek() {
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

  function getSelectedDate(dia: string, mes: string) {
    setDaySelected(dia)
    setMonthSelected(mes)
  }
  return (
    <div className="fixed mx-auto w-full flex flex-col space-y-4 items-center mt-4  bg-transparent text-white">
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
                getSelectedDate(week.format("DD"), week.format("MM"))
              }
            >
              <DayCard
                className={cn(
                  daySelected === week.format("DD") && "border-2 border-red-500"
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
        <p>{currentWeekNumber}</p>
        <button onClick={handleNextWeek}>
          <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-700" />
        </button>
      </motion.div>
    </div>
  )
}
