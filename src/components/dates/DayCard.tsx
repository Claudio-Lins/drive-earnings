"use client"

import { useSelectedDateStore } from "@/context/selescted-date-store"
import { cn } from "@/lib/utils"

interface DayCardProps {
  active: boolean
  day: string | number
  weekDay: string | number
  className?: string
}

export function DayCard({ active, day, weekDay, className }: DayCardProps) {
  const { daySelected } = useSelectedDateStore()
  return (
    <div
      className={cn(
        "w-12 h-14 md:w-16 md:h-20 gap-1 rounded-lg flex flex-col items-center justify-center shadow-sm ",
        active
          ? "bg-gradient-to-t from-[#FF0404] to-[#910BFA] text-white"
          : "bg-white backdrop-blur-sm bg-opacity-10",
        className
      )}
    >
      <small className="font-light text-[10px] md:text-base">{weekDay}</small>
      <span className="text-md md:text-lg font-semibold">{day}</span>
    </div>
  )
}
