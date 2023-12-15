import { useRouter } from "next/navigation"

export function useDeleteTransaction() {
  const router = useRouter()

  async function handleDelete(id: string) {
    await fetch(`/api/transaction`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return handleDelete
}
