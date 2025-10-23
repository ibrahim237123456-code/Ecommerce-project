import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Update the path below if ProductService is located elsewhere
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  
  product: Product | undefined;
  selectedImage: string = '';
  quantity: number = 1;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getById(productId).subscribe(product => {
        this.product = product;
        if (product?.images?.length) {
          this.selectedImage = product.images[0];
        }
      });
    }
  }

  calculatePrice(): number {
    if (!this.product) return 0;
    return this.product.discount
      ? this.product.price * (1 - this.product.discount / 100)
      : this.product.price;
  }

  getSpecifications(): { key: string; value: string }[] {
    if (!this.product?.specifications) return [];
    return Object.entries(this.product.specifications).map(([key, value]) => ({
      key,
      value: String(value)
    }));
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem({
        productId: this.product.id,
        title: this.product.title,
        quantity: this.quantity,
        unitPrice: this.calculatePrice(),
        image: this.product.image,
        category: this.product.category,
        stock: this.product.stock
      });
    }
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }
}
