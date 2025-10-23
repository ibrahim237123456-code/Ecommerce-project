import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './order-success.html',
  styleUrls: ['./order-success.css'],
})
export class OrderSuccessComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);

  order: Order | null = null;
  loading: boolean = true;

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const orderId = navigation?.extras?.state?.['orderId'];

    if (orderId) {
      this.loadOrderDetails(orderId);
    } else {
      this.loading = false;
    }
  }

  loadOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order details:', error);
        this.loading = false;
      },
    });
  }
}
