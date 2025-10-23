import { Injectable, inject } from '@angular/core';
import { CartService } from './cart.service';
import { Order, OrderItem, Address } from '../models/order';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private cartService = inject(CartService);
  private orders: Order[] = [];
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {
    this.loadOrders();
  }
getAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/orders`);
}

  private loadOrders() {
    this.http.get<Order[]>(this.apiUrl).subscribe((orders: Order[]) => {
      this.orders = orders;
    }); 
  }

  placeOrder(
    customerInfo: any, 
    shippingAddress: Address, 
    billingAddress: Address, 
    paymentMethod: string
  ): Promise<{ orderId: string }> {
    
    return new Promise((resolve, reject) => {
      try {
        const cartSummary = this.cartService.getCartSummary();
        this.cartService.items$.subscribe((cartItems) => {
          if (cartItems.length === 0) {
            reject(new Error('Cart is empty'));
            return;
          }

          interface CartItem {
            productId: string;
            title: string;
            quantity: number;
            unitPrice: number;
            image: string;
          }

          const orderItems: OrderItem[] = (cartItems as CartItem[]).map((item: CartItem) => ({
            productId: item.productId,
            title: item.title,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            image: item.image
          }));

          const order: Order = {
            id: 'ORD-' + Math.random().toString(36).slice(2, 11).toUpperCase(),
            userId: 'user-1',
            items: orderItems,
            shippingAddress,
            billingAddress,
            paymentMethod,
            subtotal: cartSummary.subtotal,
            shipping: cartSummary.shipping,
            tax: cartSummary.tax,
            total: cartSummary.total,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
          };

          // Simulate API delay
          setTimeout(() => {
            this.orders.unshift(order); // Add to beginning of array
            this.cartService.clear();
            resolve({ orderId: order.id });
          }, 1500);
        });


      } catch (error) {
        reject(error);
      }
    });
  }

  getOrders(): Observable<Order[]> {
    // Simulate API call
    return of([...this.orders]);
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.orders.find(order => order.id === orderId);
    return of(order);
  }

  cancelOrder(orderId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status === 'pending') {
          order.status = 'cancelled';
          order.updatedAt = new Date();
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  getOrderStatus(orderId: string): Observable<string> {
    const order = this.orders.find(o => o.id === orderId);
    return of(order?.status || 'unknown');
  }

  
}