import { TransactionTypes } from "@/@types/transaction"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useState } from "react"

export function DeleteButton({
  transaction,
}: {
  transaction: TransactionTypes
}) {
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
