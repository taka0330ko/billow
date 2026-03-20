import { cn } from "@/lib/utils"

type CalendarDayCellProps = {
  dayNumber?: number
  isCurrentMonth?: boolean
  isToday?: boolean
  className?: string
}

function CalendarDayCell({
  dayNumber,
  isCurrentMonth = true,
  isToday = false,
  className,
}: CalendarDayCellProps) {
  const isPlaceholder = dayNumber === undefined

  return (
    <div
      className={cn(
        "flex aspect-square min-h-16 rounded-[18px] border border-white/10 bg-black p-2.5",
        !isCurrentMonth && "opacity-40",
        isToday && "border-primary bg-primary",
        isPlaceholder && "border-transparent",
        className
      )}
    >
      {!isPlaceholder && (
        <span
          className={cn(
            "text-sm font-medium tracking-tight text-zinc-300",
            isToday && "text-primary-foreground"
          )}
        >
          {dayNumber}
        </span>
      )}
    </div>
  )
}

export default CalendarDayCell
