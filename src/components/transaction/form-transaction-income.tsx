import { CategoryTypes } from "@/@types/category"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { useCategoryStore } from "@/context/use-category-store"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCheck, Tag } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FormCategory } from "../category/form-category"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { ToastAction } from "../ui/toast"
import { DatePicker } from "./date-picker"
import { TogglePersonalCompany } from "./toggle-personal-company"
import { ToggleRecurrency } from "./toggle-recurrency"
import { UploadRecive } from "./upload-recive"

const transactionIncomeFormSchema = z.object({
  amount: z.number().min(0.01, "O valor mínimo é de 0.01 €"),
  name: z
    .string()
    .min(3, "O nome da transação deve ter no mínimo 3 caracteres"),
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
  selectedCategory: CategoryTypes | null
  setSelectedCategory: (category: CategoryTypes | null) => void
  setIsFormOpen: (value: boolean) => void
  isFormOpen: boolean
  setIsExpense: (value: boolean) => void
  setIsIncome: (value: boolean) => void
}

type TransactionFormData = z.infer<typeof transactionIncomeFormSchema>

export function FormTransactionIncome({
  setSelectedCategory,
  selectedCategory,
  setIsFormOpen,
  setIsExpense,
  setIsIncome,
  isFormOpen,
}: TransactioFormProps) {
  const { categories, setCategories } = useCategoryStore()
  const [localCategories, setLocalCategories] = useState(categories)
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

  useEffect(() => {
    setIsExpense(false)
    setIsIncome(true)
  }, [setIsExpense, setIsIncome])

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((json) => setCategories(json))
  }, [setCategories])

  useEffect(() => {
    setLocalCategories(categories)
  }, [categories])

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
        className="flex flex-col justify-between  mt-10"
      >
        <div className="flex flex-col space-y-6 flex-1">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Label className="w-full text-center text-white" htmlFor="amount">
              Amount
            </Label>
            <Input
              type="text"
              id="amount"
              className={cn(
                "w-full text-center text-4xl font-bold h-20 border-none text-blue-400 after:content-['€'] after:font-bold after:text-2xl after:mt-[-0.5rem]",
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
              className={cn(
                "w-full text-white",
                errors.name &&
                  "border-red-500 placeholder:text-red-500 font-bold"
              )}
              placeholder={errors.name ? "digite uma descrição" : "Descrição"}
              {...register("name")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="w-full text-zinc-50" htmlFor="paymentMethod">
              Metodo de pagamento
            </Label>
            {/* <TogglePaymentMethod setPaymentMethod={setPaymentMethod} /> */}
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-4">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-white" />
                <span className="text-white">
                  {selectedCategory ? selectedCategory?.name : "Categoria"}
                </span>
              </SheetTrigger>
              <SheetContent side={"right"} className="max-w-none w-full ">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Categorias</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <ScrollArea className="h-[60vh] mb-6">
                  <div className="flex flex-col space-y-2">
                    {localCategories
                      .filter((category) => category.type === "INCOME")
                      .map((category, index) => (
                        <div
                          key={category.id}
                          className={cn(
                            "flex items-center border h-10 px-2 rounded-lg",
                            index % 2 === 0 ? "bg-white" : "bg-zinc-100"
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
                <Separator className="my-2" />
                <FormCategory typeOfCategory="INCOME" />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-4">
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
              <SheetTrigger className="flex items-center gap-2">
                <span className="text-white">Mais detalhes (opcional)</span>
              </SheetTrigger>
              <SheetContent side={"right"} className="max-w-none w-full ">
                <SheetHeader>
                  <SheetTitle className="text-2xl">
                    Detalhes (opcional)
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <ScrollArea className="flex-grow">
                  <div className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-2">
                      <Label className="w-full text-zinc-950" htmlFor="entity">
                        Tipo da transação
                      </Label>
                      <TogglePersonalCompany setEntity={setEntity} />
                    </div>
                    {/* <div className="flex flex-col space-y-2">
                      <Label className="w-full text-zinc-950" htmlFor="entity">
                        Metodo de pagamento
                      </Label>
                      <TogglePaymentMethod
                        setPaymentMethod={setPaymentMethod}
                      />
                    </div> */}
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
