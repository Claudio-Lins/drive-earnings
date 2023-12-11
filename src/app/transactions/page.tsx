"use client"

import { useDateStore } from "@/context/dates-store"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function TransactionsPage() {
  const [previousWeek, setPreviousWeek] = useState(0)
  const {
    currentDate,
    weekNumber,
    currentMonth,
    setCurrentWeekNumber,
    currentWeekNumber,
    currentYear,
    handlePreviousMonth,
    handleNextMonth,
    handleNextWeekNumber,
    handlePreviousWeekNumber,
  } = useDateStore()

  function handlePreviousWeek() {
    const previousWeekNumber = currentWeekNumber - 1
    setCurrentWeekNumber(previousWeekNumber)
  }

  return (
    <div className="text-white text-2xl mt-80 flex w-full items-center justify-center gap-10">
      <button className="" onClick={handlePreviousWeek}>
        <ChevronLeft className="w-8 h-8 hover:text-zinc-800 text-zinc-50" />
      </button>
      <div className=" ">
        <div className="capitalize flex flex-col font-semibold text-xl text-zinc-100">
          {currentWeekNumber}
        </div>
        <span className="text-zinc-400"> {}</span>
      </div>
      <button onClick={handleNextWeekNumber}>
        <ChevronRight className="w-8 h-8 hover:text-zinc-800 text-zinc-50" />
      </button>
    </div>
  )
}
