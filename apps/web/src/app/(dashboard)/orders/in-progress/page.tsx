import { getOrdersByStatus } from "@/lib/mock-orders"
import { OrderCard } from "@/components/orders/order-card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@workspace/ui/components/empty"
import { Button } from "@workspace/ui/components/button"
import { Timer, Phone } from "lucide-react"

export default function InProgressOrdersPage() {
  const orders = getOrdersByStatus("in_progress")

  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><Timer /></EmptyMedia>
          <EmptyTitle>No orders in progress</EmptyTitle>
          <EmptyDescription>Accepted orders will appear here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          actions={
            <>
              {order.type === "delivery" ? (
                <Button size="sm" className="flex-1">Ready for pickup</Button>
              ) : (
                <Button size="sm" className="flex-1">Mark complete</Button>
              )}
              {order.courierPhone && (
                <Button variant="outline" size="sm">
                  <Phone className="size-3.5" />
                </Button>
              )}
            </>
          }
        />
      ))}
    </div>
  )
}
