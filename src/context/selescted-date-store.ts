import dayjs from "dayjs"
import { create } from "zustand"

type SelectedDateStore = {
  daySelected: string
  setDaySelected: (daySelected: string) => void
  weekSelected: string
  setWeekSelected: (weekSelected: string) => void
  monthSelected: string
  setMonthSelected: (monthSelected: string) => void
  yearSelected: string
  setYearSelected: (yearSelected: string) => void
}

export const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  daySelected: dayjs().format("DD-MM-YYYY"),
  setDaySelected: (daySelected) => set({ daySelected }),
  weekSelected: dayjs().format("WW"),
  setWeekSelected: (weekSelected) => set({ weekSelected }),
  monthSelected: dayjs().format("MM-YYYY"),
  setMonthSelected: (monthSelected) => set({ monthSelected }),
  yearSelected: dayjs().format("YYYY"),
  setYearSelected: (yearSelected) => set({ yearSelected }),
}))
