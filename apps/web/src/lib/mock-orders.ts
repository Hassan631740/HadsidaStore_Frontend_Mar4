export type OrderStatus = "new" | "in_progress" | "completed" | "canceled"
export type OrderType = "delivery" | "pickup"
export type PaymentMethod = "online" | "cash" | "transfer"
export type PaymentStatus = "paid" | "not_paid"

export type OrderOption = {
  id: string
  name: string
  quantity: number
  price: number | null
}

export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  options: OrderOption[]
}

export type Order = {
  id: string
  orderNumber: string
  placedAt: string
  completedAt?: string
  type: OrderType
  status: OrderStatus
  customerName: string
  customerPhone: string
  address: string
  itemCount: number
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  courierPhone?: string
  cancelReason?: string
  notes?: string
  items: OrderItem[]
}

const sampleItems: OrderItem[] = [
  {
    id: "i1",
    name: "Bulgogi Burger",
    quantity: 1,
    price: 15000,
    options: [
      { id: "o1", name: "Extra sauce", quantity: 1, price: 500 },
      { id: "o2", name: "No pickles", quantity: 1, price: null },
    ],
  },
  {
    id: "i2",
    name: "Kimchi Fries",
    quantity: 2,
    price: 8000,
    options: [
      { id: "o3", name: "Large size", quantity: 1, price: 2000 },
      { id: "o4", name: "Extra cheese", quantity: 2, price: null },
    ],
  },
  {
    id: "i3",
    name: "Cola",
    quantity: 1,
    price: 3000,
    options: [],
  },
]

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "N12345678",
    placedAt: "2025.03.05 20:00",
    type: "delivery",
    status: "new",
    customerName: "John Doe",
    customerPhone: "010 1234 56 78",
    address: "Seoul, Gangnam-gu, Sinsa-dong 123",
    itemCount: 4,
    subtotal: 34500,
    deliveryFee: 3000,
    discount: 2500,
    total: 35000,
    paymentMethod: "online",
    paymentStatus: "paid",
    notes: "",
    items: sampleItems,
  },
  {
    id: "2",
    orderNumber: "N12345679",
    placedAt: "2025.03.05 20:05",
    type: "pickup",
    status: "new",
    customerName: "Kim Min-jun",
    customerPhone: "010 9876 54 32",
    address: "Seoul, Mapo-gu, Hongdae 45",
    itemCount: 2,
    subtotal: 18000,
    deliveryFee: 0,
    discount: 0,
    total: 18000,
    paymentMethod: "cash",
    paymentStatus: "not_paid",
    notes: "Please pack separately",
    items: sampleItems.slice(0, 1),
  },
  {
    id: "3",
    orderNumber: "N12345680",
    placedAt: "2025.03.05 19:45",
    type: "delivery",
    status: "in_progress",
    customerName: "Park Soo-yeon",
    customerPhone: "010 5555 66 77",
    address: "Seoul, Seongdong-gu, Seongsu-dong 88",
    itemCount: 5,
    subtotal: 42000,
    deliveryFee: 3500,
    discount: 5000,
    total: 40500,
    paymentMethod: "transfer",
    paymentStatus: "paid",
    courierPhone: "010 2222 33 44",
    notes: "",
    items: sampleItems,
  },
  {
    id: "4",
    orderNumber: "N12345681",
    placedAt: "2025.03.05 19:30",
    type: "pickup",
    status: "in_progress",
    customerName: "Lee Ji-woo",
    customerPhone: "010 3333 44 55",
    address: "Seoul, Yongsan-gu, Itaewon-dong 200",
    itemCount: 3,
    subtotal: 27000,
    deliveryFee: 0,
    discount: 0,
    total: 27000,
    paymentMethod: "online",
    paymentStatus: "paid",
    notes: "Extra napkins please",
    items: sampleItems.slice(1),
  },
  {
    id: "5",
    orderNumber: "N12345682",
    placedAt: "2025.03.05 18:00",
    completedAt: "2025.03.05 18:45",
    type: "delivery",
    status: "completed",
    customerName: "Choi Hyun-woo",
    customerPhone: "010 7777 88 99",
    address: "Seoul, Jongno-gu, Myeong-dong 55",
    itemCount: 6,
    subtotal: 56000,
    deliveryFee: 4000,
    discount: 0,
    total: 60000,
    paymentMethod: "transfer",
    paymentStatus: "paid",
    courierPhone: "010 1111 22 33",
    notes: "",
    items: sampleItems,
  },
  {
    id: "6",
    orderNumber: "N12345683",
    placedAt: "2025.03.05 17:00",
    type: "pickup",
    status: "canceled",
    customerName: "Jung Da-eun",
    customerPhone: "010 4444 55 66",
    address: "Seoul, Seocho-gu, Gangnam-dong 10",
    itemCount: 2,
    subtotal: 15000,
    deliveryFee: 0,
    discount: 0,
    total: 15000,
    paymentMethod: "online",
    paymentStatus: "not_paid",
    cancelReason: "Technical problem",
    notes: "",
    items: sampleItems.slice(0, 1),
  },
]

export function getOrdersByStatus(status: OrderStatus) {
  return mockOrders.filter((o) => o.status === status)
}

export function formatPrice(amount: number) {
  return `₩${amount.toLocaleString("ko-KR")}`
}

export function relativeTime(dateStr: string) {
  return dateStr
}
