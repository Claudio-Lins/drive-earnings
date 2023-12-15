"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"

export type Transaction = {
  id: string
  name: string
  categoryId: string | null
  categoryName: string | null
  type: string
  paymentMethod: string | null
  amount: number
  createdAt: Date
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      const formattedDate = dayjs(date).format("DD/MM/YYYY")

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: "name",
    header: "Descritivo",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "paymentMethod",
    header: "Pagamento",
  },
  {
    accessorKey: "categoryName",
    header: "Categoria",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original

      async function handleDelete(id: string) {
        await fetch(`/api/transaction`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })
        window.location.reload()
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 flex items-center gap-1"
            >
              <span className="sr-only"></span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleDelete(transaction.id)}>
              <div className="flex items-center gap-2 cursor-pointer">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
