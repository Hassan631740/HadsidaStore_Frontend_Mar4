"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getOrdersByStatus } from "@/lib/mock-orders"

const tabs = [
  { label: "New orders", href: "/orders/new", status: "new" as const },
  { label: "In progress", href: "/orders/in-progress", status: "in_progress" as const },
  { label: "Completed", href: "/orders/completed", status: "completed" as const },
  { label: "Canceled", href: "/orders/canceled", status: "canceled" as const },
  { label: "History", href: "/orders/history", status: null },
]

export function OrdersTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-0 border-b mb-4 overflow-x-auto">
      {tabs.map((tab) => {
        const count = tab.status ? getOrdersByStatus(tab.status).length : null
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors ${
              isActive
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {count !== null && count > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground leading-none">
                {count}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
