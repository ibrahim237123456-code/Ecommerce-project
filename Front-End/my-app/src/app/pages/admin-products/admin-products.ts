import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = {
    name: '',
    price: 0,
    category: '',
    image: ''
  };
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
      }
    });
  }

  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price) return;
    this.productService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.products.unshift(res);
        this.newProduct = { name: '', price: 0, category: '', image: '' };
      },
      error: (err) => console.error('Error adding product', err)
    });
  }

  deleteProduct(id: string): void {
    const result: any = this.productService.deleteProduct(id);
    if (result && typeof result.subscribe === 'function') {
      result.subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== id);
        },
        error: (err: any) => console.error('Error deleting product', err)
      });
    } else {
      this.products = this.products.filter(p => p._id !== id);
    }
  }
}
