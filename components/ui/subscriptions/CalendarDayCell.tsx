import Image from "next/image"

import { subscriptionIconMap } from "@/lib/subscription/icons"
import { Subscription } from "@/lib/subscription/types"
import { cn } from "@/lib/utils"

type CalendarDayCellProps = {
  dayNumber?: number
  isCurrentMonth?: boolean
  isToday?: boolean
  subscriptions?: Subscription[]
  className?: string
}

function CalendarDayCell({
  dayNumber,
  isCurrentMonth = true,
  isToday = false,
  subscriptions = [],
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
        <div className="flex w-full flex-col justify-between">
          <span
            className={cn(
              "text-sm font-medium tracking-tight text-zinc-300",
              isToday && "text-primary-foreground"
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
                    "flex size-5 items-center justify-center ",
                    isToday && "bg-primary-foreground"
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
    </div>
  )
}

export default CalendarDayCell
