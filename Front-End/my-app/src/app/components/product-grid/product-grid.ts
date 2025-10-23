import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '..//product-card/product-card';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.css']
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
}