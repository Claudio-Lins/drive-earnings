"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { Label } from "../ui/label"

interface DatePickerProps {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function DatePicker({ setDate }: DatePickerProps) {
  const [date, setDateState] = React.useState<Date>()
  useEffect(() => {
    setDate(date)
  }, [date])
  return (
    <div className="w-full flex flex-col space-y-2">
      <Label className="text-white">Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left text-white font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : new Date().toLocaleDateString()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDateState}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
