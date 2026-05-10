import { getOrdersByStatus } from "@/lib/mock-orders"
import { OrderCard } from "@/components/orders/order-card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@workspace/ui/components/empty"
import { XCircle } from "lucide-react"

export default function CanceledOrdersPage() {
  const orders = getOrdersByStatus("canceled")

  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><XCircle /></EmptyMedia>
          <EmptyTitle>No canceled orders</EmptyTitle>
          <EmptyDescription>Canceled orders will appear here.</EmptyDescription>
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
