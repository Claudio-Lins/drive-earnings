import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useState } from "react"

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

export function DeleteButton({ transaction }: { transaction: Transaction }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete(id: string) {
    setIsDeleting(true)
    await fetch(`/api/transaction`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    setIsDeleting(false)
    window.location.reload()
  }

  return isDeleting ? (
    <div className=" inset-0 flex-col items-center justify-center bg-zinc-950">
      <Loader className="text-white w-8 h-8 animate-spin" />
    </div>
  ) : (
    <Button
      className="w-full"
      variant="destructive"
      onClick={() => handleDelete(transaction.id)}
    >
      Delete
    </Button>
  )
}

export function EditTransaction({ transaction }: { transaction: Transaction }) {
  const [isEditting, setIsEditting] = useState(false)

  async function handleEdit(id: string) {
    setIsEditting(true)
    await fetch(`/api/transaction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    setIsEditting(false)
    window.location.reload()
  }

  return isEditting ? (
    <div className=" inset-0 flex-col items-center justify-center bg-zinc-950">
      <Loader className="text-white w-8 h-8 animate-spin" />
    </div>
  ) : (
    <Button
      className="w-full bg-cyan-400 hover:bg-cyan-500"
      variant="default"
      onClick={() => handleEdit(transaction.id)}
    >
      Editar
    </Button>
  )
}
