import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart-item';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  checkoutForm!: FormGroup;
  cartSummary: CartSummary = {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    itemCount: 0
  };
  loading: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadCartSummary();
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      // Shipping Address
      shippingFirstName: ['', Validators.required],
      shippingLastName: ['', Validators.required],
      shippingStreet: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingState: ['', Validators.required],
      shippingZip: ['', Validators.required],
      
      // Payment
      paymentMethod: ['credit-card', Validators.required],
      
      // Billing Address
      sameAsShipping: [true],
      billingFirstName: [''],
      billingLastName: [''],
      billingStreet: [''],
      billingCity: [''],
      billingState: [''],
      billingZip: ['']
    });

    // Update billing validators based on sameAsShipping
    this.checkoutForm.get('sameAsShipping')?.valueChanges.subscribe(same => {
      const billingControls = [
        'billingFirstName', 'billingLastName', 'billingStreet', 
        'billingCity', 'billingState', 'billingZip'
      ];
      
      billingControls.forEach(control => {
        const formControl = this.checkoutForm.get(control);
        if (same) {
          formControl?.clearValidators();
        } else {
          formControl?.setValidators(Validators.required);
        }
        formControl?.updateValueAndValidity();
      });
    });
  }

  loadCartSummary(): void {
    this.cartSummary = this.cartService.getCartSummary();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  placeOrder(): void {
    if (this.checkoutForm.valid && this.cartSummary.itemCount > 0) {
      this.loading = true;

      const formValue = this.checkoutForm.value;
      
      const shippingAddress = {
        type: 'shipping' as const,
        firstName: formValue.shippingFirstName,
        lastName: formValue.shippingLastName,
        street: formValue.shippingStreet,
        city: formValue.shippingCity,
        state: formValue.shippingState,
        zipCode: formValue.shippingZip,
        country: 'US',
        isDefault: true
      };

      const billingAddress = formValue.sameAsShipping ? 
        { ...shippingAddress, type: 'billing' as const } :
        {
          type: 'billing' as const,
          firstName: formValue.billingFirstName,
          lastName: formValue.billingLastName,
          street: formValue.billingStreet,
          city: formValue.billingCity,
          state: formValue.billingState,
          zipCode: formValue.billingZip,
          country: 'US',
          isDefault: false
        };

      this.orderService.placeOrder(
        {},
        shippingAddress,
        billingAddress,
        formValue.paymentMethod
      ).then(result => {
        this.loading = false;
        this.router.navigate(['/order-success'], { 
          state: { orderId: result.orderId } 
        });
      }).catch(error => {
        this.loading = false;
        console.error('Order placement error:', error);
        alert('Failed to place order. Please try again.');
      });
    }
  }
}