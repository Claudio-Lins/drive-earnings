import "@/lib/dayjs"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { create } from "zustand"
dayjs.extend(weekOfYear)

type TransactionsStore = {
  totalAmountDay: number
  totalAmountWeek: number
  totalAmountMonth: number
  totalAmountYear: number
  setTotalAmountDay: (totalAmountDay: number) => void
  setTotalAmountWeek: (totalAmountWeek: number) => void
  setTotalAmountMonth: (totalAmountMonth: number) => void
  setTotalAmountYear: (totalAmountYear: number) => void
}

export const useTransactinsStore = create<TransactionsStore>((set) => ({
  totalAmountDay: 0,
  totalAmountWeek: 0,
  totalAmountMonth: 0,
  totalAmountYear: 0,
  setTotalAmountDay: (totalAmountDay) => set({ totalAmountDay }),
  setTotalAmountWeek: (totalAmountWeek) => set({ totalAmountWeek }),
  setTotalAmountMonth: (totalAmountMonth) => set({ totalAmountMonth }),
  setTotalAmountYear: (totalAmountYear) => set({ totalAmountYear }),
}))
