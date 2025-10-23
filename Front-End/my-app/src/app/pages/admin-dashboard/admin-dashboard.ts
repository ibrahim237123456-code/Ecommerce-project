import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgIfContext } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user';
import { Observable, forkJoin } from 'rxjs';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';
import { Testimonial } from '../../services/testimonial.service';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-admin-dashboard',
    standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  
  testimonials: Testimonial[] = [];
  newTestimonial: Testimonial = {
    name: '',
    feedback: '',
    rating: 5,
    image: '',
    date: ''
  };
  totalUsers = 0;
  totalOrders = 0;
  totalProducts = 0;
  
  isLoading: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}
logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}
  ngOnInit() {
    this.loadStats();
  }
  loadDashboardData(): void {
    this.isLoading = true;


    forkJoin({
      products: this.productService.getAll(),
      orders: this.orderService.getAll(),
      users: this.userService.getAll()
    }).subscribe({
      next: (data) => {
        this.totalProducts = data.products?.length || 0;
        this.totalOrders = data.orders?.length || 0;
        this.totalUsers = data.users?.length || 0;
        this.isLoading = false;
   
      },
      error: (err) => {
        console.error('Error loading dashboard:', err);
        this.isLoading = false;
      }
    });
  }

loadStats() {
  this.isLoading = true;
  forkJoin([
    this.productService.getAll(),
    this.orderService.getAll(),
    this.userService.getAll()
  ]).subscribe({
    next: ([products, orders, users]) => {
      this.totalProducts = products.length;
      this.totalOrders = orders.length;
      this.totalUsers = users.length;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error loading stats:', err);
      this.isLoading = false;
    }
  });
}
}