import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface TogglePersonalCompanyProps {
  setEntity: React.Dispatch<React.SetStateAction<"PERSON" | "COMPANY">>
}

export function TogglePersonalCompany({
  setEntity,
}: TogglePersonalCompanyProps) {
  const [isPersonal, setIsPersonal] = useState(false)
  const [isCompany, setIsCompany] = useState(false)

  useEffect(() => {
    if (isPersonal) {
      setEntity("PERSON")
    }
  }, [isPersonal, setEntity])

  useEffect(() => {
    if (isCompany) {
      setEntity("COMPANY")
    }
  }, [isCompany, setEntity])

  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">Pessoal</legend>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="PERSON"
          value="PERSON"
          id="PERSON"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isPersonal}
          onChange={() => {
            setIsPersonal(true)
            setIsCompany(false)
          }}
        />

        <label
          htmlFor="PERSON"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Pessoal
            </p>
            {isPersonal && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>

      <div className="w-full max-w-xs md:max-w-[130px]">
        <input
          type="radio"
          name="COMPANY"
          value="COMPANY"
          id="COMPANY"
          className="peer hidden [&:checked_+_label_svg]:block"
          checked={isCompany}
          onChange={() => {
            setIsCompany(true)
            setIsPersonal(false)
          }}
        />

        <label
          htmlFor="COMPANY"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-zinc-500 peer-checked:ring-1 peer-checked:ring-zinc-500 peer-checked:bg-zinc-950 peer-checked:text-zinc-50"
        >
          <div className="flex items-center justify-between">
            <p className="uppercase text-xs md:text-sm peer-checked:text-zinc-50">
              Empresa
            </p>
            {isCompany && (
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-zinc-50" />
            )}
          </div>
        </label>
      </div>
    </fieldset>
  )
}
