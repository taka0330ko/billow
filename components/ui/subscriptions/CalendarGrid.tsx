import CalendarDayCell from "@/components/ui/subscriptions/CalendarDayCell"
import { Subscription } from "@/lib/subscription/types"
import { cn } from "@/lib/utils"

type CalendarGridProps = {
  currentDate: Date
  subscriptions: Subscription[]
  className?: string
}

type CalendarCell = {
  key: string
  dayNumber?: number
  isCurrentMonth: boolean
}

function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getMondayFirstOffset(date: Date) {
  const day = date.getDay()
  return day === 0 ? 6 : day - 1
}

function buildCalendarCells(currentDate: Date): CalendarCell[] {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const daysInMonth = getDaysInMonth(currentDate)
  const leadingEmptyCells = getMondayFirstOffset(firstDayOfMonth)

  const cells: CalendarCell[] = []

  for (let index = 0; index < leadingEmptyCells; index += 1) {
    cells.push({
      key: `empty-${index}`,
      dayNumber: undefined,
      isCurrentMonth: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      key: `day-${day}`,
      dayNumber: day,
      isCurrentMonth: true,
    })
  }

  const trailingEmptyCells = (7 - (cells.length % 7)) % 7

  for (let index = 0; index < trailingEmptyCells; index += 1) {
    cells.push({
      key: `tail-empty-${index}`,
      dayNumber: undefined,
      isCurrentMonth: false,
    })
  }

  return cells
}

function isSameCalendarDate(
  isoDate: string | undefined,
  currentDate: Date,
  dayNumber: number | undefined
) {
  if (!isoDate || dayNumber === undefined) {
    return false
  }

  const [year, month, day] = isoDate.split("-").map(Number)

  if (!year || !month || !day) {
    return false
  }

  return (
    year === currentDate.getFullYear() &&
    month - 1 === currentDate.getMonth() &&
    day === dayNumber
  )
}

function CalendarGrid({
  currentDate,
  subscriptions,
  className,
}: CalendarGridProps) {
  const cells = buildCalendarCells(currentDate)
  const today = new Date()

  return (
    <div className={cn("grid grid-cols-7 gap-3", className)}>
      {cells.map((cell) => {
        const isToday =
          cell.dayNumber !== undefined &&
          cell.isCurrentMonth &&
          today.getFullYear() === currentDate.getFullYear() &&
          today.getMonth() === currentDate.getMonth() &&
          today.getDate() === cell.dayNumber
        const cellSubscriptions = subscriptions.filter((subscription) =>
          isSameCalendarDate(
            subscription.nextBillingDate,
            currentDate,
            cell.dayNumber
          )
        )

        return (
          <CalendarDayCell
            key={cell.key}
            dayNumber={cell.dayNumber}
            isCurrentMonth={cell.isCurrentMonth}
            isToday={isToday}
            subscriptions={cellSubscriptions}
          />
        )
      })}
    </div>
  )
}

export default CalendarGrid
