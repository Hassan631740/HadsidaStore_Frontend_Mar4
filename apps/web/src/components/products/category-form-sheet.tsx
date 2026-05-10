"use client"

import { useState } from "react"
import { type Category } from "@/lib/mock-products"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { ImagePlus } from "lucide-react"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onSave: (data: Omit<Category, "id" | "productCount">) => void
  onDelete?: () => void
}

export function CategoryFormSheet({ open, onOpenChange, category, onSave, onDelete }: Props) {
  const isEdit = !!category
  const [name, setName] = useState(category?.name ?? "")
  const [description, setDescription] = useState(category?.description ?? "")

  function handleSave() {
    if (!name.trim()) return
    onSave({ name: name.trim(), description: description.trim(), imageUrl: null })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0 overflow-hidden">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>{isEdit ? `Edit category / ${category.name}` : "Add category"}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {isEdit ? "Update category details" : "Add a new product category"}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="cat-name">Name</Label>
              <span className="text-xs text-muted-foreground">{name.length}/50</span>
            </div>
            <Input
              id="cat-name"
              placeholder="e.g. Burgers, Drinks, Desserts"
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="cat-desc">Description</Label>
              <span className="text-xs text-muted-foreground">{description.length}/120</span>
            </div>
            <textarea
              id="cat-desc"
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 resize-none"
              placeholder="Short description of what this category contains"
              maxLength={120}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Category image</Label>
            <p className="text-xs text-muted-foreground">Upload a JPG or PNG, max 10MB.</p>
            <div className="aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-ring hover:text-foreground transition-colors cursor-pointer">
              <ImagePlus className="size-6" />
              <span className="text-sm">Click to upload image</span>
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex gap-2 shrink-0">
          {isEdit && onDelete && (
            <Button variant="destructive" size="sm" onClick={() => { onDelete(); onOpenChange(false) }}>
              Delete category
            </Button>
          )}
          <div className="flex gap-2 ms-auto">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={!name.trim()}>
              {isEdit ? "Save category" : "Add category"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
