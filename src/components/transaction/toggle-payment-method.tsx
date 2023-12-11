import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface TogglePaymentMethodProps {
  setPaymentMethod: React.Dispatch<
    React.SetStateAction<"CASH" | "CREDIT" | "DEBIT">
  >
}

export function TogglePaymentMethod({
  setPaymentMethod,
}: TogglePaymentMethodProps) {
  const [isCash, setIsCash] = useState(false)
  const [isCredit, setIsCredit] = useState(false)
  const [isDebit, setIsDebit] = useState(false)

  useEffect(() => {
    if (isCash) {
      setPaymentMethod("CASH")
    }
  }, [isCash, setPaymentMethod])

  useEffect(() => {
    if (isCredit) {
      setPaymentMethod("CREDIT")
    }
  }, [isCredit, setPaymentMethod])

  useEffect(() => {
    if (isDebit) {
      setPaymentMethod("DEBIT")
    }
  }, [isDebit, setPaymentMethod])

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Cash</legend>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Cash"
          value="Cash"
          id="Cash"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isCash}
          onChange={() => {
            setIsCash(true)
            setIsCredit(false)
            setIsDebit(false)
          }}
        />

        <label
          htmlFor="Cash"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs peer-checked:text-zinc-50">
              Dinheiro
            </p>
            {isCash && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Credit"
          value="Credit"
          id="Credit"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isCredit}
          onChange={() => {
            setIsCredit(true)
            setIsDebit(false)
            setIsCash(false)
          }}
        />

        <label
          htmlFor="Credit"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs peer-checked:text-zinc-50">
              Crédito
            </p>
            {isCredit && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Debit"
          value="Debit"
          id="Debit"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isDebit}
          onChange={() => {
            setIsDebit(true)
            setIsCredit(false)
            setIsCash(false)
          }}
        />

        <label
          htmlFor="Debit"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs peer-checked:text-zinc-50">
              Débito
            </p>
            {isDebit && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>
    </fieldset>
  )
}
