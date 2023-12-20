"use client"
import { TransactionTypes } from "@/@types/transaction"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { DeleteButton } from "@/utils/crud-transactions"
import { EditTransaction } from "@/utils/edit-transaction"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown, Eye, PenBox, Trash2 } from "lucide-react"

export const columns: ColumnDef<TransactionTypes>[] = [
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
      const transactionWithRequiredFields = {
        ...transaction,
        entity: transaction.entity,
        updatedAt: new Date(),
        userId: transaction.userId,
        paymentMethod: transaction.paymentMethod || "defaultPaymentMethod",
      }

      return (
        <div className="flex items-center pr-4 justify-end space-x-4 h-10">
          <Dialog>
            <DialogTrigger>
              <Trash2 className="h-4 w-4 hover:text-zinc-900" />
            </DialogTrigger>
            <DialogOverlay style={{ backgroundColor: "#01010b" }} />
            <DialogContent
              className="relative bg-gradient-to-r to-pink-950 from-zinc-950 rounded-lg shadow-xl"
              aria-label="delete"
            >
              <DialogHeader>
                <DialogTitle>
                  <h2 className="text-xl font-bold text-white">
                    Tem certeza que deseja deletar a transação?
                  </h2>
                  <Separator className="mt-4" />
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <p className="text-white">
                    <strong>Nome:</strong> {transaction.name}
                  </p>
                  <p className="font-bold text-3xl text-cyan-400">
                    {new Intl.NumberFormat("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    }).format(Number(transaction.amount))}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white">
                    <strong>Tipo:</strong> {transaction.type}
                  </p>
                  <p className="text-white">
                    <strong>Data:</strong>{" "}
                    {dayjs(transaction.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-4 justify-between">
                  <DialogClose className="w-full">
                    <Button variant="outline" className="w-full text-white">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DeleteButton transaction={transactionWithRequiredFields} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <PenBox className="h-4 w-4 hover:text-zinc-900" />
            </DialogTrigger>
            <DialogOverlay style={{ backgroundColor: "#01010b" }} />
            <DialogContent
              className="bg-gradient-to-r to-pink-950 from-zinc-950 rounded-lg shadow-xl"
              aria-label="edit"
            >
              <EditTransaction transaction={transactionWithRequiredFields} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Eye className="h-4 w-4 hover:text-zinc-900" />
            </DialogTrigger>
            <DialogOverlay style={{ backgroundColor: "#01010b" }} />
            <DialogContent
              className="relative bg-gradient-to-r to-pink-950 from-zinc-950 rounded-lg shadow-xl"
              aria-label="delete"
            >
              <DialogHeader>
                <DialogTitle>
                  <h2 className="text-xl font-bold text-white">
                    Tem certeza que deseja deletar a transação?
                  </h2>
                  <Separator className="mt-4" />
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-col">
                <pre>
                  <code className="text-white">
                    {JSON.stringify(transaction, null, 2)}
                  </code>
                </pre>
                <Separator className="my-4" />
                <div className="flex items-center space-x-4 justify-between">
                  <DialogClose className="w-full">
                    <Button variant="outline" className="w-full text-white">
                      Fechar
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
