import { getOrdersByStatus } from "@/lib/mock-orders"
import { OrderCard } from "@/components/orders/order-card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@workspace/ui/components/empty"
import { CheckCircle2 } from "lucide-react"

export default function CompletedOrdersPage() {
  const orders = getOrdersByStatus("completed")

  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><CheckCircle2 /></EmptyMedia>
          <EmptyTitle>No completed orders</EmptyTitle>
          <EmptyDescription>Completed orders will appear here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} actions={null} />
      ))}
    </div>
  )
}
