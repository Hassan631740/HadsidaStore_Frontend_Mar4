"use client"

import { useState } from "react"
import { mockOrders, formatPrice, type Order } from "@/lib/mock-orders"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { OrderDetailSheet } from "./order-detail-sheet"
import { Search } from "lucide-react"

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "outline",
  in_progress: "secondary",
  completed: "default",
  canceled: "destructive",
}

const statusLabel: Record<string, string> = {
  new: "New",
  in_progress: "In progress",
  completed: "Completed",
  canceled: "Canceled",
}

export function OrderHistoryTable() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search)
    const matchType = typeFilter === "all" || o.type === typeFilter
    const matchStatus = statusFilter === "all" || o.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search by order, customer, phone..."
            className="ps-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Order type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        Showing {filtered.length} of {mockOrders.length} orders
      </p>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order no.</TableHead>
              <TableHead>Date & time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-end">Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {order.placedAt}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-muted-foreground">{order.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize text-[10px]">
                      {order.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant[order.status]}
                      className="text-[10px]"
                    >
                      {statusLabel[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="capitalize">{order.paymentMethod}</div>
                      <div className={order.paymentStatus === "paid" ? "text-muted-foreground" : "text-destructive"}>
                        {order.paymentStatus === "paid" ? "Paid" : "Not paid"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-end font-medium text-sm">
                    {formatPrice(order.total)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderDetailSheet
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      />
    </>
  )
}
