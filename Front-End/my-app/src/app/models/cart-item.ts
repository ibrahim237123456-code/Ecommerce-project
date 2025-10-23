export interface CartItem {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}