import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  searchQuery: string = '';

  cartCount$ = this.cartService.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );
  isAuth$ = this.authService.isAuthenticated$;
  user$ = this.authService.currentUser$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.searchQuery = '';
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery } 
      });
    }
  }
}