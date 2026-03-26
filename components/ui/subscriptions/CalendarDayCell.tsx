import Image from "next/image"

import { subscriptionIconMap } from "@/lib/subscription/icons"
import { Subscription } from "@/lib/subscription/types"
import { cn } from "@/lib/utils"

type CalendarDayCellProps = {
  dayNumber?: number
  isCurrentMonth?: boolean
  isToday?: boolean
  isSelected?: boolean
  subscriptions?: Subscription[]
  onClick?: () => void
  className?: string
}

function CalendarDayCell({
  dayNumber,
  isCurrentMonth = true,
  isToday = false,
  isSelected = false,
  subscriptions = [],
  onClick,
  className,
}: CalendarDayCellProps) {
  const isPlaceholder = dayNumber === undefined

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPlaceholder}
      className={cn(
        "flex aspect-square min-h-16 w-full rounded-lg border border-border-mute p-2.5 text-left bg-calendar-cell",
        !isCurrentMonth && "bg-calendar-placeholder",
        isToday && "border-primary bg-calendar-active text-primary-text",
        isPlaceholder && "border-transparent",
        !isPlaceholder && "transition hover:border-border",
        isSelected && !isToday && "border-border",
        isPlaceholder && "cursor-default",
        className
      )}
    >
      {!isPlaceholder && (
        <div className="flex w-full flex-col justify-between">
          <span
            className={cn(
              "text-sm font-medium tracking-tight text-secondary-text",
              isToday && "text-primary-text"
            )}
          >
            {dayNumber}
          </span>

          {subscriptions.length > 0 && (
            <div className="m-auto">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className={cn(
                    "flex size-5 items-center justify-center",
                    isToday && "bg-primary-text"
                  )}
                >
                  <Image
                    src={subscriptionIconMap[subscription.iconKey]}
                    alt={subscription.name}
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </button>
  )
}

export default CalendarDayCell
