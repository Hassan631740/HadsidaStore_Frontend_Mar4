"use client"

import { useState } from "react"
import { type Product, type Modifier, type ModifierOption, mockCategories, formatKRW } from "@/lib/mock-products"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@workspace/ui/components/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Badge } from "@workspace/ui/components/badge"
import { ImagePlus, Plus, Trash2, X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
}

const emptyModifier = (): Modifier => ({
  id: crypto.randomUUID(),
  name: "",
  isRequired: false,
  isFree: false,
  minQty: 1,
  maxQty: 1,
  options: [{ id: crypto.randomUUID(), name: "", price: null, isFree: true }],
})

export function ProductFormSheet({ open, onOpenChange, product }: Props) {
  const isEdit = !!product
  const [name, setName] = useState(product?.name ?? "")
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState(product?.price.toString() ?? "")
  const [discountPercent, setDiscountPercent] = useState(product?.discountPercent.toString() ?? "0")
  const [trackQty, setTrackQty] = useState(product?.quantityLeft !== null)
  const [quantityLeft, setQuantityLeft] = useState(product?.quantityLeft?.toString() ?? "")
  const [modifiers, setModifiers] = useState<Modifier[]>(product?.modifiers ?? [])
  const [minQty, setMinQty] = useState("1")
  const [maxQty, setMaxQty] = useState("4")

  function addModifier() {
    setModifiers((prev) => [...prev, emptyModifier()])
  }

  function removeModifier(id: string) {
    setModifiers((prev) => prev.filter((m) => m.id !== id))
  }

  function updateModifier(id: string, patch: Partial<Modifier>) {
    setModifiers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  function addOption(modifierId: string) {
    setModifiers((prev) =>
      prev.map((m) =>
        m.id === modifierId
          ? { ...m, options: [...m.options, { id: crypto.randomUUID(), name: "", price: null, isFree: true }] }
          : m
      )
    )
  }

  function removeOption(modifierId: string, optionId: string) {
    setModifiers((prev) =>
      prev.map((m) =>
        m.id === modifierId ? { ...m, options: m.options.filter((o) => o.id !== optionId) } : m
      )
    )
  }

  function updateOption(modifierId: string, optionId: string, patch: Partial<ModifierOption>) {
    setModifiers((prev) =>
      prev.map((m) =>
        m.id === modifierId
          ? { ...m, options: m.options.map((o) => (o.id === optionId ? { ...o, ...patch } : o)) }
          : m
      )
    )
  }

  const displayPrice = price && discountPercent && Number(discountPercent) > 0
    ? Math.round(Number(price) * (1 - Number(discountPercent) / 100))
    : Number(price)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col gap-0 p-0 overflow-hidden">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>{isEdit ? `Edit product / ${product.name}` : "Add product"}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {isEdit ? "Edit product details" : "Add everything the customer needs to know about the product"}
          </p>
        </SheetHeader>

        <Tabs defaultValue="basic" className="flex flex-col flex-1 overflow-hidden">
          <TabsList className="rounded-none border-b px-6 justify-start h-auto pb-0 gap-4 shrink-0">
            <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent pb-3 pt-1 data-[state=active]:border-foreground data-[state=active]:shadow-none">
              Basic details
            </TabsTrigger>
            <TabsTrigger value="promotion" className="rounded-none border-b-2 border-transparent pb-3 pt-1 data-[state=active]:border-foreground data-[state=active]:shadow-none">
              Promotion
            </TabsTrigger>
            <TabsTrigger value="modifiers" className="rounded-none border-b-2 border-transparent pb-3 pt-1 data-[state=active]:border-foreground data-[state=active]:shadow-none">
              Modifiers
              {modifiers.length > 0 && (
                <Badge variant="secondary" className="ms-1.5 h-4 px-1 text-[10px]">{modifiers.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── Basic details ── */}
          <TabsContent value="basic" className="flex-1 overflow-y-auto px-6 py-4 mt-0 space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="product-name">Name</Label>
                <span className="text-xs text-muted-foreground">{name.length}/100</span>
              </div>
              <Input
                id="product-name"
                placeholder="This name will be displayed when ordering"
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={(v) => setCategoryId(v ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="product-desc">Description</Label>
                <span className="text-xs text-muted-foreground">{description.length}/120</span>
              </div>
              <textarea
                id="product-desc"
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
                placeholder="Write the description of the product"
                maxLength={120}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Photos */}
            <div className="space-y-1.5">
              <Label>Product photo</Label>
              <p className="text-xs text-muted-foreground">
                You can add up to 4 photos. The first photo added will be the thumbnail.
                Upload only JPG, PNG less than 10MB.
              </p>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-ring hover:text-foreground transition-colors cursor-pointer text-xs"
                  >
                    <ImagePlus className="size-5" />
                    <span>Photo {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="product-price">Price</Label>
                <span className="text-xs text-muted-foreground">{price.length}/100</span>
              </div>
              <Input
                id="product-price"
                placeholder="Price of product"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {price && (
                <p className="text-xs text-muted-foreground">Display price: {formatKRW(Number(price))}</p>
              )}
            </div>

            {/* Quantity tracking */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Quantity remainder</p>
                  <p className="text-xs text-muted-foreground">Track the number of items available to order</p>
                </div>
                <Switch checked={trackQty} onCheckedChange={setTrackQty} />
              </div>
              {trackQty && (
                <Input
                  placeholder="Choose number"
                  type="number"
                  min={0}
                  value={quantityLeft}
                  onChange={(e) => setQuantityLeft(e.target.value)}
                />
              )}
            </div>

            {/* Order parameters */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Order parameters</p>
              <p className="text-xs text-muted-foreground">
                Specify the minimum and maximum quantity available for ordering at one time.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="min-qty" className="text-xs">Min quantity</Label>
                  <Input id="min-qty" type="number" min={1} value={minQty} onChange={(e) => setMinQty(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="max-qty" className="text-xs">Max quantity</Label>
                  <Input id="max-qty" type="number" min={1} value={maxQty} onChange={(e) => setMaxQty(e.target.value)} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Promotion ── */}
          <TabsContent value="promotion" className="flex-1 overflow-y-auto px-6 py-4 mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              This will be automatically applied to the current price.
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="discount">Discount (%)</Label>
                <span className="text-xs text-muted-foreground">{discountPercent.length}/100</span>
              </div>
              <Input
                id="discount"
                placeholder="e.g. 10"
                type="number"
                min={0}
                max={100}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
              />
            </div>

            {price && Number(discountPercent) > 0 && (
              <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>Original price</span>
                  <span>{formatKRW(Number(price))}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span>−{discountPercent}%</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-semibold">
                  <span>Final price</span>
                  <span>{formatKRW(displayPrice)}</span>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Promotion period</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Start date</p>
                  <Input type="date" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">End date</p>
                  <Input type="date" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Modifiers ── */}
          <TabsContent value="modifiers" className="flex-1 overflow-y-auto px-6 py-4 mt-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              This allows the customer to add certain features to the product being ordered.
            </p>

            {modifiers.map((mod, modIdx) => (
              <div key={mod.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`e.g. "Size", "Crust type"`}
                    value={mod.name}
                    onChange={(e) => updateModifier(mod.id, { name: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeModifier(mod.id)}
                    aria-label="Remove modifier"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Switch
                      id={`mod-free-${mod.id}`}
                      checked={mod.isFree}
                      onCheckedChange={(v) => updateModifier(mod.id, { isFree: v })}
                      size="sm"
                    />
                    <Label htmlFor={`mod-free-${mod.id}`} className="text-xs font-normal">Free</Label>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Switch
                      id={`mod-req-${mod.id}`}
                      checked={mod.isRequired}
                      onCheckedChange={(v) => updateModifier(mod.id, { isRequired: v })}
                      size="sm"
                    />
                    <Label htmlFor={`mod-req-${mod.id}`} className="text-xs font-normal">Required</Label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">Options</p>
                  {mod.options.map((opt) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <Input
                        placeholder="Option name"
                        value={opt.name}
                        onChange={(e) => updateOption(mod.id, opt.id, { name: e.target.value })}
                        className="flex-1"
                      />
                      <Input
                        placeholder={opt.isFree ? "Free" : "Price"}
                        type="number"
                        min={0}
                        disabled={opt.isFree}
                        value={opt.price ?? ""}
                        onChange={(e) => updateOption(mod.id, opt.id, { price: e.target.value ? Number(e.target.value) : null })}
                        className="w-24"
                      />
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={opt.isFree}
                          onCheckedChange={(v) => updateOption(mod.id, opt.id, { isFree: v, price: v ? null : opt.price })}
                          size="sm"
                        />
                        <span className="text-xs text-muted-foreground">Free</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeOption(mod.id, opt.id)}
                        disabled={mod.options.length === 1}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="xs" onClick={() => addOption(mod.id)} className="mt-1 gap-1">
                    <Plus className="size-3" /> Add option
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addModifier} className="w-full gap-1.5">
              <Plus className="size-4" /> Add modifier
            </Button>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex gap-2 shrink-0">
          {isEdit && (
            <Button variant="destructive" size="sm" onClick={() => onOpenChange(false)}>
              Delete product
            </Button>
          )}
          <div className="flex gap-2 ms-auto">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button size="sm" onClick={() => onOpenChange(false)}>
              {isEdit ? "Save product" : "Add product"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
