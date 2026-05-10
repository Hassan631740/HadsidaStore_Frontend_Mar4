"use client"

import { useState } from "react"
import {
  mockProducts,
  mockCategories,
  formatKRW,
  effectivePrice,
  type Product,
  type ProductStatus,
} from "@/lib/mock-products"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Switch } from "@workspace/ui/components/switch"
import { ProductFormSheet } from "./product-form-sheet"
import { Search, Plus, MoreHorizontal, Pencil, EyeOff, Trash2 } from "lucide-react"

const statusVariant: Record<ProductStatus, "default" | "secondary" | "destructive" | "outline"> = {
  available: "default",
  unavailable: "secondary",
  paused: "outline",
}

const statusLabel: Record<ProductStatus, string> = {
  available: "Available",
  unavailable: "Unavailable",
  paused: "Paused",
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function openAdd() {
    setSelectedProduct(null)
    setSheetOpen(true)
  }

  function openEdit(product: Product) {
    setSelectedProduct(product)
    setSheetOpen(true)
  }

  function toggleAvailability(id: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "available" ? "unavailable" : "available" }
          : p
      )
    )
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || p.categoryId === categoryFilter
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-2 flex-1">
          <div className="relative min-w-48 flex-1">
            <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="ps-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {mockCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" onClick={openAdd} className="gap-1.5 shrink-0">
          <Plus className="size-4" /> Add product
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        Showing {filtered.length} of {products.length} products
      </p>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Modifiers</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Available</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((product) => {
                const discounted = product.discountPercent > 0
                const finalPrice = effectivePrice(product)
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-md bg-muted shrink-0" />
                        <div>
                          <p className="text-sm font-medium leading-tight">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.createdAt}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{product.category}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {discounted ? (
                          <>
                            <span className="font-medium">{formatKRW(finalPrice)}</span>
                            <span className="text-xs text-muted-foreground line-through ms-1">
                              {formatKRW(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium">{formatKRW(product.price)}</span>
                        )}
                        {discounted && (
                          <Badge variant="secondary" className="ms-1 text-[10px] px-1 h-4">
                            -{product.discountPercent}%
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {product.modifiers.length > 0 ? `${product.modifiers.length} modifier${product.modifiers.length > 1 ? "s" : ""}` : "—"}
                    </TableCell>
                    <TableCell className="text-xs">
                      {product.quantityLeft !== null ? product.quantityLeft : "∞"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[product.status]} className="text-[10px]">
                        {statusLabel[product.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.status === "available"}
                        onCheckedChange={() => toggleAvailability(product.id)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(product)}>
                            <Pencil className="size-3.5 me-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleAvailability(product.id)}>
                            <EyeOff className="size-3.5 me-2" />
                            {product.status === "available" ? "Mark unavailable" : "Mark available"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 className="size-3.5 me-2" /> Remove from menu
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        product={selectedProduct}
      />
    </>
  )
}
