import { getOrdersByStatus } from "@/lib/mock-orders"
import { OrderCard } from "@/components/orders/order-card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@workspace/ui/components/empty"
import { InboxIcon } from "lucide-react"

export default function NewOrdersPage() {
  const orders = getOrdersByStatus("new")

  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><InboxIcon /></EmptyMedia>
          <EmptyTitle>No orders</EmptyTitle>
          <EmptyDescription>Orders will appear here when they are received.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
