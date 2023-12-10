import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface TogglePersonalCompanyProps {
  setType: React.Dispatch<React.SetStateAction<"INCOME" | "EXPENSE">>
}

export function ToggleIncomeExpense({ setType }: TogglePersonalCompanyProps) {
  const [isIncome, setIsIncome] = useState(true)
  const [isExpense, setIsExpense] = useState(false)

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
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Tipo de Categoria</legend>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="INCOME"
          value="INCOME"
          id="INCOME"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isIncome}
          onChange={() => {
            setIsIncome(true)
            setIsExpense(false)
          }}
        />

        <label
          htmlFor="INCOME"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              INCOME
            </p>
            {isIncome && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
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
