import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product';
// Update the import path if the service is located in 'src/app/services/cart.service.ts'
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cart: CartService = inject(CartService);

  addToCart(): void {
    if (this.product.stock > 0) {
      this.cart.addItem({
        productId: this.product.id,
        title: this.product.title,
        quantity: 1,
        unitPrice: this.calculateDiscountedPrice(),
        image: this.product.image,
        category: this.product.category,
        stock: this.product.stock,
      });
    }
  }

  calculateDiscountedPrice(): number {
    if (this.product.discount) {
      return this.product.price * (1 - this.product.discount / 100);
    }
    return this.product.price;
  }
}
