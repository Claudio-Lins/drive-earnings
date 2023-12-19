import { TransactionTypes } from "@/@types/transaction"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"

type Transaction = {
  id: string
  name: string
  categoryId: string | null
  categoryName: string | null
  type: string
  paymentMethod: string | null
  amount: number
  createdAt: Date
}

async function getTransaction(userId: string): Promise<TransactionTypes[]> {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  })
  return transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber().toString(),
    categoryName: transaction.category ? transaction.category.name : null,
  }))
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/signin")
  const transaction = await getTransaction(session.user.id)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transaction} />
    </div>
  )
}
