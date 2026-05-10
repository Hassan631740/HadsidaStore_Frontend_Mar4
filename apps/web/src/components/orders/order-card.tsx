"use client"

import { useState } from "react"
import { formatPrice, type Order } from "@/lib/mock-orders"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, CardAction } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Label } from "@workspace/ui/components/label"
import { OrderDetailSheet } from "./order-detail-sheet"
import { MapPin, Package, User } from "lucide-react"

const CANCEL_REASONS = [
  "Technical problem",
  "Heavy workload",
  "Order placed outside delivery area",
  "Selected product no longer available",
  "No couriers available in the area",
  "Other",
]

type Props = {
  order: Order
  actions?: React.ReactNode
}

export function OrderCard({ order, actions }: Props) {
  const [detailOpen, setDetailOpen] = useState(false)
  const [acceptOpen, setAcceptOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState(CANCEL_REASONS[0])

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-start justify-between gap-2">
            <span>Order {order.orderNumber}</span>
            <Badge
              variant={order.type === "delivery" ? "outline" : "secondary"}
              className="capitalize shrink-0"
            >
              {order.type}
            </Badge>
          </CardTitle>
          <CardDescription>{order.placedAt}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <User className="size-3.5 shrink-0" />
              <span className="truncate">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Package className="size-3.5 shrink-0" />
              <span>{order.itemCount} items</span>
            </div>
            {order.type === "delivery" && (
              <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                <MapPin className="size-3.5 shrink-0" />
                <span className="truncate">{order.address}</span>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground">Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setDetailOpen(true)}
          >
            More details
          </Button>
          {actions ?? (
            <>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setAcceptOpen(true)}
              >
                Accept order
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setRejectOpen(true)}
              >
                Reject
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      {/* Detail sheet */}
      <OrderDetailSheet
        order={order}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Accept dialog */}
      <AlertDialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept the order?</AlertDialogTitle>
            <AlertDialogDescription>
              The order will be moved to the &quot;In progress&quot; tab.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject the order?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground -mt-2">
            This action cannot be undone. Please indicate a reason for cancellation.
          </p>
          <RadioGroup
            value={cancelReason}
            onValueChange={setCancelReason}
            className="gap-3"
          >
            {CANCEL_REASONS.map((reason) => (
              <div key={reason} className="flex items-center gap-2">
                <RadioGroupItem value={reason} id={reason} />
                <Label htmlFor={reason} className="font-normal text-sm cursor-pointer">
                  {reason}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setRejectOpen(false)}>
              Reject order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
