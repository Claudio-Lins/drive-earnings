import { create } from "zustand"
import dayjs from "dayjs"

type SelectedDateStore = {
  daySelected: string
  setDaySelected: (daySelected: string) => void
  monthSelected: string
  setMonthSelected: (monthSelected: string) => void
  yearSelected: string
  setYearSelected: (yearSelected: string) => void
}

export const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  daySelected: dayjs().format("DD"),
  setDaySelected: (daySelected) => set({ daySelected }),
  monthSelected: dayjs().format("MM"),
  setMonthSelected: (monthSelected) => set({ monthSelected }),
  yearSelected: dayjs().format("YYYY"),
  setYearSelected: (yearSelected) => set({ yearSelected }),
}))
