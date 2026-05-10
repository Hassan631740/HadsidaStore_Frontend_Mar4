"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  History,
  LayoutGrid,
  Package,
  Receipt,
  Tag,
  Timer,
  Truck,
  User,
  XCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { ChevronDown } from "lucide-react"

const storeNav = [
  { title: "Store information", href: "/store/info", icon: Building2 },
  { title: "Delivery parameters", href: "/store/delivery", icon: Truck },
  { title: "Operation schedule", href: "/store/schedule", icon: CalendarDays },
  { title: "Billing", href: "/billing", icon: CreditCard },
  { title: "Subscription", href: "/subscription", icon: Receipt },
  { title: "Account", href: "/account", icon: User },
  { title: "History", href: "/history", icon: History },
]

const productNav = [
  { title: "Product management", href: "/products", icon: Package },
  { title: "Category management", href: "/products/categories", icon: Tag },
]

const ordersNav = [
  { title: "New orders", href: "/orders/new", icon: Bell, badge: 4 },
  { title: "Orders in progress", href: "/orders/in-progress", icon: Timer },
  { title: "Completed orders", href: "/orders/completed", icon: CheckCircle2 },
  { title: "Canceled orders", href: "/orders/canceled", icon: XCircle },
  { title: "Order history", href: "/orders/history", icon: LayoutGrid },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                  HD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold">Habsida Delivery</span>
                <span className="text-xs text-muted-foreground">GM</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {storeNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel render={<CollapsibleTrigger className="flex w-full items-center" />}>
              Product
              <ChevronDown className="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {productNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive(item.href)}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel render={<CollapsibleTrigger className="flex w-full items-center" />}>
              Orders
              <ChevronDown className="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {ordersNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive(item.href)}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {"badge" in item && item.badge ? (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/statistics" />}
                  isActive={isActive("/statistics")}
                  tooltip="Statistics"
                >
                  <BarChart3 />
                  <span>Statistics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/account" />} tooltip="Account">
              <Avatar className="size-8 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg text-xs font-semibold">GM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-medium">General Manager</span>
                <span className="text-xs text-muted-foreground">admin@habsida.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
