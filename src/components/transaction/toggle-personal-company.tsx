"use client"

import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface TogglePersonalCompanyProps {
  setEntity: React.Dispatch<React.SetStateAction<"PERSON" | "COMPANY">>
}

export function TogglePersonalCompany({
  setEntity,
}: TogglePersonalCompanyProps) {
  const [isPersonal, setIsPersonal] = useState(true)

  useEffect(() => {
    setEntity(isPersonal ? "PERSON" : "COMPANY")
  }, [isPersonal])

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Pessoal</legend>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="ShipOption"
          value="Shipping"
          id="Shipping"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isPersonal}
          onChange={() => setIsPersonal(true)}
        />

        <label
          htmlFor="Shipping"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500"
        >
          <div className="flex items-center justify-between">
            <p className="text-zinc-900 uppercase text-xs md:text-sm">
              Pessoal
            </p>
            {isPersonal && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-700" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="ShipOption"
          value="Pickup"
          id="Pickup"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={!isPersonal}
          onChange={() => setIsPersonal(false)}
        />

        <label
          htmlFor="Pickup"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500"
        >
          <div className="flex items-center justify-between">
            <p className="text-zinc-900 uppercase text-xs md:text-sm">
              Empresa
            </p>
            {!isPersonal && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-700" />
            )}
          </div>
        </label>
      </div>
    </fieldset>
  )
}
