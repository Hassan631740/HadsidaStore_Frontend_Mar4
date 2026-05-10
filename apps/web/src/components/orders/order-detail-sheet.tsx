"use client"

import { formatPrice, type Order } from "@/lib/mock-orders"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Button } from "@workspace/ui/components/button"
import { Phone, MessageSquare } from "lucide-react"

const statusLabel: Record<string, string> = {
  new: "New order",
  in_progress: "In progress",
  completed: "Completed",
  canceled: "Canceled",
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "outline",
  in_progress: "secondary",
  completed: "default",
  canceled: "destructive",
}

type Props = {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailSheet({ order, open, onOpenChange }: Props) {
  if (!order) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">
              Order {order.orderNumber}
            </SheetTitle>
            <Badge variant={statusVariant[order.status]}>
              {statusLabel[order.status]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Placed: {order.placedAt}</p>
          {order.completedAt && (
            <p className="text-xs text-muted-foreground">Completed: {order.completedAt}</p>
          )}
        </SheetHeader>

        <div className="flex flex-col gap-4 px-6 py-4 flex-1 overflow-y-auto">
          {/* Type */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">{order.type}</Badge>
            {order.cancelReason && (
              <span className="text-xs text-destructive">Reason: {order.cancelReason}</span>
            )}
          </div>

          {/* Customer */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Customer</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerPhone}</p>
              {order.type === "delivery" && (
                <p className="text-muted-foreground">{order.address}</p>
              )}
            </div>
          </section>

          <Separator />

          {/* Order items */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Order details</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between text-sm">
                    <span className="font-medium">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground shrink-0 ms-4">
                      {item.quantity} × {formatPrice(item.price)}
                    </span>
                  </div>
                  {item.options.map((opt) => (
                    <div key={opt.id} className="flex items-center justify-between text-xs text-muted-foreground ps-3 mt-0.5">
                      <span>{opt.name} × {opt.quantity}</span>
                      <span>{opt.price === null ? "Free" : formatPrice(opt.price)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Additional notes</h3>
            <p className="text-sm text-muted-foreground">
              {order.notes || "No notes"}
            </p>
          </section>

          <Separator />

          {/* Payment */}
          <section>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Payment</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"} className="h-4 text-[10px]">
                  {order.paymentStatus === "paid" ? "Paid" : "Not paid"}
                </Badge>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span>{formatPrice(order.deliveryFee)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-destructive">−{formatPrice(order.discount)}</span>
                </div>
              )}
              <Separator className="my-1" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="border-t px-6 py-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Phone className="size-3.5" />
            Call client
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <MessageSquare className="size-3.5" />
            Support
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
