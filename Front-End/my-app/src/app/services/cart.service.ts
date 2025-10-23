import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartSummary } from '../models/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  items$ = this._items.asObservable();

  private getCartFromStorage(): CartItem[] {
    try {
      const cartStr = localStorage.getItem('cart');
      return cartStr ? JSON.parse(cartStr) : [];
    } catch {
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  addItem(item: CartItem): void {
    const currentItems = [...this._items.value];
    const existingItemIndex = currentItems.findIndex(i => i.productId === item.productId);
    
    if (existingItemIndex > -1) {
      // Update existing item
      currentItems[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      currentItems.push({ ...item });
    }
    
    this._items.next(currentItems);
    this.saveCartToStorage(currentItems);
  }

  updateItem(productId: string, quantity: number): void {
    if (quantity < 0) return;
    
    const currentItems = [...this._items.value];
    const itemIndex = currentItems.findIndex(i => i.productId === productId);
    
    if (itemIndex > -1) {
      if (quantity === 0) {
        currentItems.splice(itemIndex, 1);
      } else {
        currentItems[itemIndex].quantity = quantity;
      }
      
      this._items.next(currentItems);
      this.saveCartToStorage(currentItems);
    }
  }

  removeItem(productId: string): void {
    const currentItems = this._items.value.filter(i => i.productId !== productId);
    this._items.next(currentItems);
    this.saveCartToStorage(currentItems);
  }

  clear(): void {
    this._items.next([]);
    localStorage.removeItem('cart');
  }

  getItemCount(): number {
    return this._items.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this._items.value.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }

  getCartSummary(): CartSummary {
    const subtotal = this.getSubtotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    return {
      subtotal: Number(subtotal.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount: this.getItemCount()
    };
  }

  getItem(productId: string): CartItem | undefined {
    return this._items.value.find(item => item.productId === productId);
  }

  isEmpty(): boolean {
    return this._items.value.length === 0;
  }
}