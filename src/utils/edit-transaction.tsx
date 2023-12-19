import { TransactionTypes } from "@/@types/transaction"
import { ToggleIncomeExpense } from "@/components/category/toggle-income-expense"
import { TogglePaymentMethod } from "@/components/transaction/toggle-payment-method"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const transactionEditFormSchema = z.object({
  amount: z.number().min(0.01, "O valor mínimo é de 0.01 €"),
  name: z
    .string()
    .min(3, "O nome da transação deve ter no mínimo 3 caracteres"),
  type: z.enum(["INCOME", "EXPENSE"]),
  paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  // entity: z.string(),
  // recurring: z.string(),
  // location: z.string(),
  // notes: z.string(),
  // receipt: z.string(),
  // bankAccount: z.string(),
  // categoryId: z.string().min(3).max(255),
  // userId: z.string(),
  // createdAt: z.coerce.date(),
})

type TransactionFormData = z.infer<typeof transactionEditFormSchema>

export function EditTransaction({
  transaction,
}: {
  transaction: TransactionTypes
}) {
  const [isEditting, setIsEditting] = useState(false)
  const [type, setType] = useState<"INCOME" | "EXPENSE">(
    transaction.type as "INCOME" | "EXPENSE"
  )
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CREDIT" | "DEBIT"
  >(transaction.paymentMethod as "CASH" | "CREDIT" | "DEBIT")
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionEditFormSchema),
    defaultValues: {
      name: transaction.name,
      amount: Number(transaction.amount),
      type: transaction.type as "INCOME" | "EXPENSE" | undefined,
      paymentMethod: transaction.paymentMethod as "CASH" | "CREDIT" | "DEBIT",
      // categoryId: transaction.categoryId || "",
      // recurring: transaction.recurring || "",
      // location: transaction.location || "",
      // notes: transaction.notes || "",
      // receipt: transaction.receipt || "",
      // bankAccount: transaction.bankAccount || "",
      // createdAt: transaction.createdAt,
      // userId: transaction.userId || "",
    },
  })

  async function handleEdit(formData: TransactionFormData) {
    setIsEditting(true)
    await fetch(`/api/transaction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        id: transaction.id,
        type,
        paymentMethod,
      }),
    })
    setIsEditting(false)
    window.location.reload()
  }

  return isEditting ? (
    <div className=" inset-0 flex-col items-center justify-center bg-zinc-950">
      <Loader className="text-white w-8 h-8 animate-spin" />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleEdit)}
      className="flex flex-col justify-between  mt-10"
    >
      <div className="flex flex-col space-y-6 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex flex-col flex-1 space-y-2">
            <Label className="text-white" htmlFor="name">
              Dexcrição
            </Label>
            <Input
              type="text"
              id="name"
              className={cn(
                "w-full font-bold text-blue-400",
                errors.name &&
                  "border-red-500 placeholder:text-red-500 font-bold"
              )}
              placeholder={errors.name ? "digite um nome" : "Nome"}
              {...register("name")}
            />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Label className="w-full text-white" htmlFor="amount">
              Amount
            </Label>
            <Input
              type="text"
              id="amount"
              className={cn(
                "w-full font-bold text-blue-400 after:content-['€'] after:font-bold after:text-2xl after:mt-[-0.5rem]",
                errors.amount &&
                  "border-red-500 placeholder:text-red-500 font-bold"
              )}
              placeholder={errors.amount ? "digite um valor" : "0.00 €"}
              {...register("amount", {
                setValueAs: (value) =>
                  typeof value === "string"
                    ? parseFloat(value.replace(",", "."))
                    : value,
              })}
            />
          </div>
        </div>
        <ToggleIncomeExpense
          setType={setType}
          type={transaction.type as "INCOME" | "EXPENSE"}
        />
        <TogglePaymentMethod
          setPaymentMethod={setPaymentMethod}
          paymentMethod={
            transaction.paymentMethod as "CASH" | "CREDIT" | "DEBIT"
          }
        />
      </div>
      <div className="mt-20">
        <Button
          type="submit"
          className="w-full bg-cyan-400 hover:bg-cyan-500"
          variant="default"
        >
          Editar
        </Button>
      </div>
    </form>
  )
}
