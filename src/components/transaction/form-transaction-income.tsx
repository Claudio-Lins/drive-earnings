import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { CheckCheck, Tag } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { ToastAction } from "../ui/toast"
import { DatePicker } from "./date-picker"
import { TogglePaymentMethod } from "./toggle-payment-method"
import { TogglePersonalCompany } from "./toggle-personal-company"
import { ToggleRecurrency } from "./toggle-recurrency"
import { UploadRecive } from "./upload-recive"

const transactionIncomeFormSchema = z.object({
  amount: z.number().positive(),
  name: z.string().min(3).max(255),
  type: z.enum(["INCOME"]),
  entity: z.enum(["COMPANY", "PERSON"]),
  paymentMethod: z.enum(["CASH", "CREDIT", "DEBIT"]),
  recurring: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  location: z.string(),
  notes: z.string(),
  receipt: z.string(),
  bankAccount: z.string(),
  categoryId: z.string().min(3).max(255),
  userId: z.string(),
  createdAt: z.coerce.date(),
})

interface TransactioFormProps {
  categories: Category[]
  selectedCategory: Category | null
  setSelectedCategory: (category: Category | null) => void
  setIsFormOpen: (value: boolean) => void
  isFormOpen: boolean
}

type TransactionFormData = z.infer<typeof transactionIncomeFormSchema>

export default function FormTransactionExpense({
  categories,
  setSelectedCategory,
  selectedCategory,
  setIsFormOpen,
  isFormOpen,
}: TransactioFormProps) {
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [entity, setEntity] = useState<"PERSON" | "COMPANY">("PERSON")
  const [receiptUrl, setReceiptUrl] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CREDIT" | "DEBIT"
  >("CASH")
  const [recurring, setRecurring] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
  >("DAILY")

  const { toast } = useToast()
  const router = useRouter()
  const { data } = useSession()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionIncomeFormSchema),
    defaultValues: {
      type: "INCOME",
      userId: data?.user?.id,
      categoryId: "",
      createdAt: new Date(),
      entity: "COMPANY",
      paymentMethod: "CASH",
      recurring: "DAILY",
      location: "",
      notes: "",
      receipt: "",
      bankAccount: "",
    },
  })

  async function handleIncomeForm(data: TransactionFormData) {
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          entity,
          paymentMethod,
          recurring,
          receipt: receiptUrl,
          createdAt: selectedDate,
        }),
      })

      if (response.ok) {
        toast({
          title: "Transação criada com sucesso",
          description: `Valor: ${data.amount} €`,
        })
        reset()
        router.refresh()
        setIsFormOpen(false)
        setSelectedCategory(null)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      console.error(error)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleIncomeForm)}
        className="flex flex-col justify-between h-[70vh] mt-10"
      >
        <div className="flex flex-col space-y-6 flex-1">
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
            {errors.amount && (
              <span className="text-red-500">{errors.amount.message}</span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-4">
            <DatePicker setDate={setSelectedDate} />
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
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-4">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-white" />
                <span className="text-white">
                  {selectedCategory ? selectedCategory?.name : "Categoria"}
                </span>
              </SheetTrigger>
              <SheetContent
                side={"bottom"}
                className="h-[80vh]  flex flex-col space-y-4 max-w-md"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl">Categorias</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <ScrollArea className="flex-grow">
                  <div className="flex flex-col space-y-2">
                    {categories
                      .filter((category) => category.type === "INCOME")
                      .map((category, index) => (
                        <div
                          key={category.id}
                          className={cn(
                            "flex items-center border h-10 px-2 rounded-lg",
                            index % 2 === 0 ? "bg-zinc-50" : "bg-zinc-100"
                          )}
                        >
                          <div className="space-x-2 flex items-center w-full">
                            <input
                              className={cn("flex")}
                              type="radio"
                              id={category.name}
                              value={category.id}
                              {...register("categoryId")}
                              onChange={() => {
                                setSelectedCategory(category)
                                setValue("categoryId", category.id)
                                setSheetOpen(false)
                              }}
                            />
                            <Label
                              className="w-full flex items-center cursor-pointer h-8"
                              htmlFor={category.name}
                            >
                              {category.name}
                            </Label>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </SheetContent>
              {errors.categoryId && (
                <span className="text-red-500">
                  {errors.categoryId.message}
                </span>
              )}
            </Sheet>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-4">
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
              <SheetTrigger className="flex items-center gap-2">
                <span className="text-white">Mais detalhes (opcional)</span>
              </SheetTrigger>
              <SheetContent
                side={"bottom"}
                className="h-[100vh]  flex flex-col space-y-4 max-w-md"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl">
                    Detalhes (opcional)
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                {/* Details */}
                <ScrollArea className="flex-grow">
                  <div className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-2">
                      <Label className="w-full text-zinc-950" htmlFor="entity">
                        Tipo da transação
                      </Label>
                      <TogglePersonalCompany setEntity={setEntity} />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label className="w-full text-zinc-950" htmlFor="entity">
                        Metodo de pagamento
                      </Label>
                      <TogglePaymentMethod
                        setPaymentMethod={setPaymentMethod}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label className="w-full text-zinc-950" htmlFor="entity">
                        Recorrência
                      </Label>
                      <ToggleRecurrency setRecurring={setRecurring} />
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 mt-4">
                      <Label
                        className="w-full  text-zinc-950"
                        htmlFor="location"
                      >
                        Localidade
                      </Label>
                      <Input
                        type="text"
                        id="location"
                        className="w-full text-zinc-950"
                        placeholder="Localidade"
                        {...register("location")}
                      />
                      {errors.location && (
                        <span className="text-red-500">
                          {errors.location.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 mt-4">
                      <Label
                        className="w-full  text-zinc-950"
                        htmlFor="location"
                      >
                        Recibo
                      </Label>
                      <UploadRecive setReceiptUrl={setReceiptUrl} />
                      {receiptUrl && (
                        <div className="flex items-center">
                          <span className="text-green-500">Recibo enviado</span>
                          <CheckCheck className="w-4 h-4 ml-2 text-green-500" />
                        </div>
                      )}
                    </div>
                    <Separator className="my-4" />
                    <SheetClose>
                      <Button
                        className="w-full mt-6 "
                        variant={"default"}
                        type="button"
                      >
                        ok
                      </Button>
                    </SheetClose>
                  </div>
                </ScrollArea>
              </SheetContent>
              {errors.categoryId && (
                <span className="text-red-500">
                  {errors.categoryId.message}
                </span>
              )}
            </Sheet>
          </div>
        </div>
        <div>
          <Button
            className="w-full mt-10 bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transaction-all duration-300 ease-in-out mb-auto h-10"
            type="submit"
            disabled={isSubmitting}
          >
            Criar Transação
          </Button>
        </div>
      </form>
    </div>
  )
}
