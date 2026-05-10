export type ProductStatus = "available" | "unavailable" | "paused"
export type ProductType = "food" | "drink" | "dessert" | "other"

export type ModifierOption = {
  id: string
  name: string
  price: number | null
  isFree: boolean
}

export type Modifier = {
  id: string
  name: string
  isRequired: boolean
  isFree: boolean
  minQty: number
  maxQty: number
  options: ModifierOption[]
}

export type Product = {
  id: string
  name: string
  category: string
  categoryId: string
  type: ProductType
  price: number
  discountPercent: number
  quantityLeft: number | null
  status: ProductStatus
  description: string
  imageUrl: string | null
  modifiers: Modifier[]
  createdAt: string
}

export type Category = {
  id: string
  name: string
  description: string
  imageUrl: string | null
  productCount: number
}

export const mockCategories: Category[] = [
  { id: "cat1", name: "Burgers", description: "Handcrafted beef and chicken burgers", imageUrl: null, productCount: 3 },
  { id: "cat2", name: "Sides", description: "Fries, salads and other sides", imageUrl: null, productCount: 2 },
  { id: "cat3", name: "Drinks", description: "Cold and hot beverages", imageUrl: null, productCount: 2 },
  { id: "cat4", name: "Desserts", description: "Sweet treats and ice cream", imageUrl: null, productCount: 1 },
  { id: "cat5", name: "Sets", description: "Combo meal sets", imageUrl: null, productCount: 2 },
]

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Bulgogi Burger",
    category: "Burgers",
    categoryId: "cat1",
    type: "food",
    price: 15000,
    discountPercent: 0,
    quantityLeft: 24,
    status: "available",
    description: "A juicy beef patty marinated in bulgogi sauce with fresh lettuce and pickles.",
    imageUrl: null,
    createdAt: "2025.01.10",
    modifiers: [
      {
        id: "m1",
        name: "Size",
        isRequired: false,
        isFree: false,
        minQty: 1,
        maxQty: 1,
        options: [
          { id: "mo1", name: "Regular", price: null, isFree: true },
          { id: "mo2", name: "Large", price: 2000, isFree: false },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Spicy Chicken Burger",
    category: "Burgers",
    categoryId: "cat1",
    type: "food",
    price: 13000,
    discountPercent: 10,
    quantityLeft: 18,
    status: "available",
    description: "Crispy fried chicken with gochujang sauce and coleslaw.",
    imageUrl: null,
    createdAt: "2025.01.12",
    modifiers: [],
  },
  {
    id: "p3",
    name: "Double Smash Burger",
    category: "Burgers",
    categoryId: "cat1",
    type: "food",
    price: 19000,
    discountPercent: 0,
    quantityLeft: null,
    status: "available",
    description: "Two smashed patties with American cheese and special sauce.",
    imageUrl: null,
    createdAt: "2025.01.15",
    modifiers: [],
  },
  {
    id: "p4",
    name: "Kimchi Fries",
    category: "Sides",
    categoryId: "cat2",
    type: "food",
    price: 8000,
    discountPercent: 0,
    quantityLeft: 40,
    status: "available",
    description: "Crispy fries topped with kimchi and cheese.",
    imageUrl: null,
    createdAt: "2025.01.10",
    modifiers: [
      {
        id: "m2",
        name: "Toppings",
        isRequired: false,
        isFree: false,
        minQty: 1,
        maxQty: 3,
        options: [
          { id: "mo3", name: "Extra kimchi", price: 500, isFree: false },
          { id: "mo4", name: "Extra cheese", price: 500, isFree: false },
          { id: "mo5", name: "Jalapeños", price: null, isFree: true },
        ],
      },
    ],
  },
  {
    id: "p5",
    name: "Garden Salad",
    category: "Sides",
    categoryId: "cat2",
    type: "food",
    price: 7000,
    discountPercent: 0,
    quantityLeft: 12,
    status: "unavailable",
    description: "Fresh seasonal greens with house vinaigrette.",
    imageUrl: null,
    createdAt: "2025.01.18",
    modifiers: [],
  },
  {
    id: "p6",
    name: "Cola",
    category: "Drinks",
    categoryId: "cat3",
    type: "drink",
    price: 3000,
    discountPercent: 0,
    quantityLeft: null,
    status: "available",
    description: "Chilled Coca-Cola.",
    imageUrl: null,
    createdAt: "2025.01.10",
    modifiers: [
      {
        id: "m3",
        name: "Size",
        isRequired: true,
        isFree: false,
        minQty: 1,
        maxQty: 1,
        options: [
          { id: "mo6", name: "Small", price: null, isFree: true },
          { id: "mo7", name: "Large", price: 1000, isFree: false },
        ],
      },
    ],
  },
  {
    id: "p7",
    name: "Banana Milkshake",
    category: "Drinks",
    categoryId: "cat3",
    type: "drink",
    price: 6000,
    discountPercent: 0,
    quantityLeft: 8,
    status: "available",
    description: "Thick and creamy banana milkshake.",
    imageUrl: null,
    createdAt: "2025.01.20",
    modifiers: [],
  },
  {
    id: "p8",
    name: "Chocolate Brownie",
    category: "Desserts",
    categoryId: "cat4",
    type: "dessert",
    price: 5000,
    discountPercent: 15,
    quantityLeft: 6,
    status: "paused",
    description: "Warm chocolate brownie with vanilla ice cream.",
    imageUrl: null,
    createdAt: "2025.02.01",
    modifiers: [],
  },
]

export function formatKRW(amount: number) {
  return `₩${amount.toLocaleString("ko-KR")}`
}

export function effectivePrice(product: Product) {
  if (product.discountPercent > 0) {
    return Math.round(product.price * (1 - product.discountPercent / 100))
  }
  return product.price
}
