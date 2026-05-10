"use client"

import { useState } from "react"
import { mockCategories, type Category } from "@/lib/mock-products"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { CategoryFormSheet } from "./category-form-sheet"
import { Search, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function openAdd() {
    setSelectedCategory(null)
    setSheetOpen(true)
  }

  function openEdit(category: Category) {
    setSelectedCategory(category)
    setSheetOpen(true)
  }

  function handleSave(data: Omit<Category, "id" | "productCount">) {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...data } : c))
      )
    } else {
      const newCat: Category = {
        ...data,
        id: crypto.randomUUID(),
        productCount: 0,
      }
      setCategories((prev) => [...prev, newCat])
    }
  }

  function deleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="relative min-w-48 flex-1 max-w-sm">
          <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="ps-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button size="sm" onClick={openAdd} className="gap-1.5 shrink-0">
          <Plus className="size-4" /> Add category
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        {filtered.length} {filtered.length === 1 ? "category" : "categories"}
      </p>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-end">Products</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-md bg-muted shrink-0" />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                    {cat.description || "—"}
                  </TableCell>
                  <TableCell className="text-end text-sm">{cat.productCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(cat)}>
                          <Pencil className="size-3.5 me-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteCategory(cat.id)}
                        >
                          <Trash2 className="size-3.5 me-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CategoryFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        category={selectedCategory}
        onSave={handleSave}
        onDelete={selectedCategory ? () => deleteCategory(selectedCategory.id) : undefined}
      />
    </>
  )
}
