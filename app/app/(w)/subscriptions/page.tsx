"use client"

import CalenderHeader from "@/components/ui/subscriptions/CalenderHeader"
import CalendarGrid from "@/components/ui/subscriptions/CalendarGrid"
import CalendarWeekdays from "@/components/ui/subscriptions/CalendarWeekdays"
import { subscriptions } from "@/lib/subscription/data"
import { useState } from "react"

function getPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

function getNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export default function SubscriptionsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <section className="min-h-full bg-background px-6 py-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        <CalenderHeader
          currentDate={currentDate}
          onPrevMonth={() => setCurrentDate(getPreviousMonth(currentDate))}
          onNextMonth={() => setCurrentDate(getNextMonth(currentDate))}
        />
        <CalendarWeekdays />
        <CalendarGrid currentDate={currentDate} subscriptions={subscriptions} />
      </div>
    </section>
  )
}
