import { cn } from "@/lib/utils"

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const

type CalendarWeekdaysProps = {
  className?: string
}

function CalendarWeekdays({ className }: CalendarWeekdaysProps) {
  return (
    <div className={cn("grid grid-cols-7 gap-3", className)}>
      {WEEKDAYS.map((day) => (
        <span
          key={day}
          className="flex h-10 items-center justify-center rounded-full text-sm font-semibold tracking-wide "
        >
          {day}
        </span>
      ))}
    </div>
  )
}

export default CalendarWeekdays
