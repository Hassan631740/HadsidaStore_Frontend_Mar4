import { OrdersTabs } from "@/components/orders/orders-tabs"

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight">Order management</h1>
        <p className="text-sm text-muted-foreground">Manage and track all store orders</p>
      </div>
      <OrdersTabs />
      {children}
    </div>
  )
}
