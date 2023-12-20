import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface ToggleTypeTransactionProps {
  setType: React.Dispatch<React.SetStateAction<"INCOME" | "EXPENSE">>
  type: "INCOME" | "EXPENSE"
}

export function ToggleTypeTransaction({
  setType,
  type,
}: ToggleTypeTransactionProps) {
  const [isIncome, setIsIncome] = useState(false)
  const [isExpense, setIsExpense] = useState(false)

  useEffect(() => {
    if (type === "INCOME") {
      setIsIncome(true)
    } else {
      setIsExpense(true)
    }
  }, [type])

  useEffect(() => {
    if (isIncome) {
      setType("INCOME")
    }
  }, [isIncome, setType])

  useEffect(() => {
    if (isExpense) {
      setType("EXPENSE")
    }
  }, [isExpense, setType])

  return (
    <fieldset className="flex w-full items-center gap-2 justify-center">
      <legend className="sr-only">Tipo de Categoria</legend>

      <div className="w-full max-w-xs">
        <input
          type="radio"
          name="INCOME"
          value="INCOME"
          id="INCOME"
          className="peer hidden [&:checked_+_label_svg]:block w-full"
          checked={isIncome}
          onChange={() => {
            setIsIncome(true)
            setIsExpense(false)
          }}
        />

        <label
          htmlFor="INCOME"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50 w-full"
        >
          <div className="flex items-center justify-between w-full">
            <p className="uppercase text-xs md:text-sm  w-fullpeer-checked:text-zinc-50">
              INCOME
            </p>
            {isIncome && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs ">
        <input
          type="radio"
          name="EXPENSE"
          value="EXPENSE"
          id="EXPENSE"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isExpense}
          onChange={() => {
            setIsExpense(true)
            setIsIncome(false)
          }}
        />

        <label
          htmlFor="EXPENSE"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              EXPENSE
            </p>
            {isExpense && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>
    </fieldset>
  )
}
