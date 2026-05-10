"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/products/categories" },
]

export function ProductsTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-0 border-b mb-4 overflow-x-auto">
      {tabs.map((tab) => {
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
          </Link>
        )
      })}
    </nav>
  )
}
