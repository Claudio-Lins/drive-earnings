import "@/lib/dayjs"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { create } from "zustand"
dayjs.extend(weekOfYear)

type DateStore = {
  currentDate: dayjs.Dayjs
  weekNumber: number
  setWeekNumber: (weekNumber: number) => void
  currentWeekNumber: number
  currentMonth: string
  setCurrentWeekNumber: (weekNumber: number) => void
  setCurrentDate: (date: dayjs.Dayjs) => void
  setCurrentMonth: (month: string) => void
  currentYear: string

  handlePreviousMonth: () => void
  handleNextMonth: () => void
  handlePreviousWeekNumber: () => void
  handleNextWeekNumber: () => void
}

export const useDateStore = create<DateStore>((set) => ({
  currentDate: dayjs(),
  currentWeekNumber: dayjs().week(),
  weekNumber: dayjs().week(),
  setWeekNumber: (weekNumber) => set({ weekNumber }),
  currentMonth: dayjs().format("MMMM"),
  currentYear: dayjs().format("YYYY"),
  setCurrentDate: (date) => set({ currentDate: date }),
  setCurrentWeekNumber: (currentWeekNumber) => set({ currentWeekNumber }),
  setCurrentMonth: (month) => set({ currentMonth: month }),

  handlePreviousMonth: () => {
    const previousMonthDate = dayjs().subtract(1, "month")
    set({ currentDate: previousMonthDate })
  },
  handleNextMonth: () => {
    const nextMonthDate = dayjs().add(1, "month")
    set({ currentDate: nextMonthDate })
  },
  handlePreviousWeekNumber: (weeks: number = 1) => {
    const previousWeekNumber = dayjs().subtract(weeks, "weeks")
    set({ weekNumber: previousWeekNumber.week() })
  },
  handleNextWeekNumber: () => {
    const nextWeekNumber = dayjs().add(1, "weeks")
    set({ weekNumber: nextWeekNumber.week() })
  },
}))
