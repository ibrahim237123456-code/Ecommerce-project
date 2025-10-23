import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [``]})
  export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  
  orders: Order[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }

  cancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).then(success => {
        if (success) {
          this.loadOrders(); // Reload orders to reflect changes
        } else {
          alert('Failed to cancel order. Please try again.');
        }
      });
    }
  }
}