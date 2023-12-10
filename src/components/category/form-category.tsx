import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCategoryStore } from "@/context/use-category-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

const categoryFormSchema = z.object({
  name: z.string().min(3).max(255),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z.string(),
  icon: z.string(),
})

type CategoryFormData = z.infer<typeof categoryFormSchema>

interface FormCategoryProps {
  typeOfCategory: "INCOME" | "EXPENSE"
}

export function FormCategory({ typeOfCategory }: FormCategoryProps) {
  const { addCategory } = useCategoryStore()
  const [isFormCreateCategoryOpen, setIsFormCreateCategoryOpen] =
    useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      type: typeOfCategory,
      color: "",
      icon: "",
    },
  })

  async function handleSubmitCategory(data: CategoryFormData) {
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify({ ...data, typeOfCategory }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        addCategory(json)
        setIsFormCreateCategoryOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Sheet
      open={isFormCreateCategoryOpen}
      onOpenChange={setIsFormCreateCategoryOpen}
    >
      <SheetTrigger className="flex items-center gap-2">
        <PlusCircle className="w-4 h-4" />
        <span className="text-zinc-950">Categoria</span>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="max-w-none w-full">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            Categoria | {typeOfCategory}
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />
        <form
          onSubmit={handleSubmit(handleSubmitCategory)}
          className="flex flex-col space-y-6"
        >
          {/* <div className="flex flex-col space-y-2">
            <Label htmlFor="type">Criar Categoria</Label>
            <ToggleIncomeExpense setType={setType} />
          </div> */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="cor">Cor</Label>
            <Input
              id="cor"
              type="color"
              placeholder="Cor"
              {...register("color")}
            />
          </div>
          <Separator className="my-4" />
          <div className="py-4 w-full">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Criar Categoria
            </Button>
          </div>
        </form>
        {errors && (
          <>
            <span className="text-red-500">
              {errors.name && "Nome deve ter no mínimo 3 caracteres"}
            </span>
            <span className="text-red-500">
              {errors.type && "Selecione o tipo de categoria"}
            </span>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
