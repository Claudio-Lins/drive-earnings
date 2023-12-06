"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "../ui/use-toast"

const transactionIncomeFormSchema = z.object({
  // amount decimal
  amount: z.number().positive(),
  name: z.string(),
  type: z.enum(["INCOME"]),
  // entity: z.enum(["COMPANY", "PERSON"]),
  // paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  // recurring: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  // location: z.string(),
  // notes: z.string(),
  // receipt: z.string(),
  // bankAccount: z.string(),
  // categories: z.array(z.string()),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

interface TransactioFormProps {
  categories: Category[]
  user: User
}

type TransactionFormData = z.infer<typeof transactionIncomeFormSchema>

export default function FormTransactionExpense() {
  const { data } = useSession()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionIncomeFormSchema),
    defaultValues: {
      amount: undefined,
      name: "",
      type: "INCOME",
      userId: data?.user.id,
      createdAt: new Date(),
    },
  })

  async function handleIncomeForm(data: TransactionFormData) {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    toast({
      title: "Transação criada com sucesso",
    })
    reset()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleIncomeForm)}
        className="flex flex-col gap-2 mt-10"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Label className="w-full text-center text-white" htmlFor="amount">
            Amount
          </Label>
          <Input
            type="text"
            id="amount"
            className="w-full text-center text-4xl font-bold h-20 border-none text-blue-400 after:content-['€'] after:font-bold after:text-2xl after:m"
            placeholder="00,00 €"
            {...register("amount", {
              setValueAs: (value) =>
                typeof value === "string"
                  ? parseFloat(value.replace(",", "."))
                  : value,
            })}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 mt-4">
          <Label className="w-full  text-white" htmlFor="name">
            Descrição
          </Label>
          <Input
            type="text"
            id="name"
            className="w-full text-white"
            placeholder="Descrição da transação"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 mt-4"></div>
        {/* <div>
        <label htmlFor="categories">Categories</label>
        <select
          id="categories"
          {...register("categories")}
        >
          <option value="">Select a category</option>
          {data?.user.categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}
        <div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
