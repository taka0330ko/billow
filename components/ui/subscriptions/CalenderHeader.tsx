"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalenderHeaderProps = {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  className?: string
}

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" })

function CalenderHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  className,
}: CalenderHeaderProps) {
  const monthLabel = monthFormatter.format(currentDate)
  const yearLabel = currentDate.getFullYear()

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-white",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onPrevMonth}
        className="size-10 rounded-full text-white hover:bg-white/10 hover:text-white"
        aria-label="Go to previous month"
      >
        <ChevronLeft className="size-7" />
      </Button>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="flex items-center gap-2 text-3xl font-medium tracking-tight text-white"
        >
          <span>{monthLabel}</span>
          <ChevronDown className="size-6" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 text-3xl font-medium tracking-tight text-white"
        >
          <span>{yearLabel}</span>
          <ChevronDown className="size-6" />
        </button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onNextMonth}
        className="size-10 rounded-full text-white hover:bg-white/10 hover:text-white"
        aria-label="Go to next month"
      >
        <ChevronRight className="size-7" />
      </Button>
    </div>
  )
}

export default CalenderHeader
