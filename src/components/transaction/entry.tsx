"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Category } from "@prisma/client"
import { PlusCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import FormTransactionExpense from "./form-transaction-expense"
import FormTransactionIncome from "./form-transaction-income"

export default function Entry() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((json) => setCategories(json))
  }, [])
  return (
    <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
      <SheetTrigger className="-mt-10 rounded-full flex items-center shadow-md bg-white justify-center p-2">
        <PlusCircle className="w-12 h-12 font-medium " />
      </SheetTrigger>
      <SheetContent className="max-w-none w-full bg-zinc-950">
        <SheetHeader>
          <SheetTitle className="font-bold text-4xl text-zinc-50">
            Transações
          </SheetTitle>
          <SheetDescription>Ganhos ou Gastos</SheetDescription>
          <SheetClose className="flex items-center justify-center p-2 absolute top-0 right-2">
            <X className="w-7 h-7 font-bold text-white " />
          </SheetClose>
        </SheetHeader>
        <Separator className="my-4" />
        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-700">
            <TabsTrigger
              className="bg-zinc-900 text-white font-bold"
              value="income"
            >
              Entrada
            </TabsTrigger>
            <TabsTrigger
              className="bg-zinc-900 text-white font-bold"
              value="expense"
            >
              Despesas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <FormTransactionIncome
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setIsFormOpen={setIsFormOpen}
              isFormOpen={isFormOpen}
              categories={categories}
            />
          </TabsContent>
          <TabsContent value="expense">
            <FormTransactionExpense />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
