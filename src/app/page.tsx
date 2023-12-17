import { Resume } from "@/components/transaction/resume"
import { WeekOverviewChart } from "@/components/transaction/week-overview-chart"
import {
  getTransactionMonth,
  getTransactionToday,
  getTransactionWeek,
  getTrasactionByUserId,
} from "@/data/transactionsServices"
import { authOptions } from "@/lib/auth"
import dayjs from "dayjs"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const startOfWeek = dayjs().startOf("week").toDate()
  const endOfWeek = dayjs().endOf("week").toDate()
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")
  const transaction = await getTrasactionByUserId(session.user.id)
  const transactionToday = await getTransactionToday(session.user.id)
  const transactionWeek = await getTransactionWeek(session.user.id)
  const transactionMonth = await getTransactionMonth(session.user.id)

  return (
    <main className="">
      <Resume
        transaction={transaction}
        transactionToday={transactionToday}
        transactionWeek={transactionWeek}
        transactionMonth={transactionMonth}
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
      />
      <div className="mt-10 lg:px-80">
        <WeekOverviewChart transaction={transaction} />
      </div>
    </main>
  )
}
