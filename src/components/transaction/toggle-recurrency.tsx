"use client"

import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface TogglePaymentMethodProps {
  setRecurring: React.Dispatch<
    React.SetStateAction<"DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY">
  >
}

export function ToggleRecurrency({ setRecurring }: TogglePaymentMethodProps) {
  const [isDaily, setIsDaily] = useState(true)
  const [isWeekly, setIsWeekly] = useState(false)
  const [isMonthly, setIsMonthly] = useState(false)
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    if (isDaily) setRecurring("DAILY")
    if (isWeekly) setRecurring("WEEKLY")
    if (isMonthly) setRecurring("MONTHLY")
    if (isYearly) setRecurring("YEARLY")
  }, [isDaily, isWeekly, isMonthly, isYearly])
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Diário</legend>
      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Daily"
          value="Daily"
          id="Daily"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isDaily}
          onChange={() => {
            setIsDaily(true)
            setIsWeekly(false)
            setIsMonthly(false)
            setIsYearly(false)
          }}
        />

        <label
          htmlFor="Daily"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Diário
            </p>
            {isDaily && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Weekly"
          value="Weekly"
          id="Weekly"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isWeekly}
          onChange={() => {
            setIsDaily(false)
            setIsWeekly(true)
            setIsMonthly(false)
            setIsYearly(false)
          }}
        />

        <label
          htmlFor="Weekly"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Semanal
            </p>
            {isWeekly && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Monthly"
          value="Monthly"
          id="Monthly"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isMonthly}
          onChange={() => {
            setIsDaily(false)
            setIsWeekly(false)
            setIsMonthly(true)
            setIsYearly(false)
          }}
        />

        <label
          htmlFor="Monthly"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Mensal
            </p>
            {isMonthly && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="Yearly"
          value="Yearly"
          id="Yearly"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isYearly}
          onChange={() => {
            setIsDaily(false)
            setIsWeekly(false)
            setIsMonthly(false)
            setIsYearly(true)
          }}
        />

        <label
          htmlFor="Yearly"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Anual
            </p>
            {isYearly && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>
    </fieldset>
  )
}
