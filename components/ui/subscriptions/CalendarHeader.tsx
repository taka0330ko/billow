"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/globalUI/button"
import { cn } from "@/lib/utils"

type CalendarHeaderProps = {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  className?: string
}

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" })

function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  className,
}: CalendarHeaderProps) {
  const monthLabel = monthFormatter.format(currentDate)
  const yearLabel = currentDate.getFullYear()

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onPrevMonth}
        className="size-10 rounded-full text-primary-text hover:bg-card"
        aria-label="Go to previous month"
      >
        <ChevronLeft className="size-7" />
      </Button>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-2 text-3xl font-medium tracking-tight text-secondary-text"
        >
          <span className="text-primary-text">{monthLabel}</span>
          <ChevronDown className="size-6 cursor-not-allowed" />
        </button>

        <button
          type="button"
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-2 text-3xl font-medium tracking-tight text-secondary-text"
        >
          <span className="text-primary-text">{yearLabel}</span>
          <ChevronDown className="size-6 cursor-not-allowed" />
        </button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onNextMonth}
        className="size-10 rounded-full text-primary-text hover:bg-card"
        aria-label="Go to next month"
      >
        <ChevronRight className="size-7" />
      </Button>
    </div>
  )
}

export default CalendarHeader
