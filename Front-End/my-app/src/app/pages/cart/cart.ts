import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem, CartSummary } from '../../models/cart-item';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems: CartItem[] = [];
  cartSummary: CartSummary = {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    itemCount: 0,
  };
  loading: boolean = true;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.items$.subscribe((items) => {
      this.cartItems = items;
      this.cartSummary = this.cartService.getCartSummary();
      this.loading = false;
    });
  }

  increaseQuantity(productId: string): void {
    const item = this.cartService.getItem(productId);
    if (item && item.quantity < item.stock) {
      this.cartService.updateItem(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.cartService.getItem(productId);
    if (item && item.quantity > 1) {
      this.cartService.updateItem(productId, item.quantity - 1);
    }
  }

  updateQuantity(productId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);

    if (!isNaN(quantity) && quantity > 0) {
      const item = this.cartService.getItem(productId);
      if (item && quantity <= item.stock) {
        this.cartService.updateItem(productId, quantity);
      } else {
        // Reset to current quantity if exceeds stock
        input.value = item?.quantity.toString() || '1';
      }
    } else {
      // Reset to 1 if invalid input
      input.value = '1';
      this.cartService.updateItem(productId, 1);
    }
  }

  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeItem(productId);
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }
}
