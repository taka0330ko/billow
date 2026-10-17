"use client"

import SubscriptionTotalCard from "@/components/ui/subscriptions/SubscriptionTotalCard"
import CalendarHeader from "@/components/ui/subscriptions/CalendarHeader"
import CalendarGrid from "@/components/ui/subscriptions/CalendarGrid"
import CalendarWeekdays from "@/components/ui/subscriptions/CalendarWeekdays"
import ToolsCards from "@/components/ui/member/ToolsCards";
import { subscriptions } from "@/lib/subscription/data"
import { Subscription } from "@/lib/subscription/types";
import { useState } from "react"

function getPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

function getNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export default function SubscriptionsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<Subscription[]>([]);
  
  return (
    <section className="min-h-full bg-workspace px-6 py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4">
        <div className="flex w-full max-w-xl flex-col gap-4 mx-auto cols-start-1 col-span-3">
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={() => setCurrentDate(getPreviousMonth(currentDate))}
            onNextMonth={() => setCurrentDate(getNextMonth(currentDate))}
          />
          <CalendarWeekdays />
          <CalendarGrid
            currentDate={currentDate}
            subscriptions={subscriptions}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onSelectSubscriptions={setSelectedSubscriptions}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:col-start-4 lg:col-span-2">
          <SubscriptionTotalCard items={subscriptions} />
          <ToolsCards items={selectedSubscriptions} />
        </div>
      </div>
    </section>
  )
}
