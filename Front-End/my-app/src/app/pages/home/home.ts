import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductGridComponent } from '../../components/product-grid/product-grid';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductGridComponent, LoadingSpinnerComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  
  featuredProducts: Product[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    (this.productService.getFeatured() as import('rxjs').Observable<Product[]>).subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading featured products:', error);
        this.loading = false;
      }
    });
  }
}