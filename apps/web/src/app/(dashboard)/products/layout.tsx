import { ProductsTabs } from "@/components/products/products-tabs"

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-semibold tracking-tight">Product management</h1>
        <p className="text-sm text-muted-foreground">Manage your menu items and categories</p>
      </div>
      <ProductsTabs />
      {children}
    </div>
  )
}
