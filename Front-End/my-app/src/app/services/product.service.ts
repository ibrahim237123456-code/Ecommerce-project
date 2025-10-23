import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product, ProductCategory } from '../models/product';
import { ProductCardComponent } from '../components/product-card/product-card';
import { ProductListComponent } from '../pages/product-list/product-list';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class ProductService {
  deleteProduct(id: string) {
    throw new Error('Method not implemented.');
  }
constructor(private http: HttpClient) {}

private apiUrl = 'http://localhost:3000/api/products';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product`);
  }
  addProduct(product: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, product);
}

  private mockProducts: Product[] = [
    { 
      id: 'p1', 
      title: 'Wireless Bluetooth Headphones', 
      price: 79.99, 
      description: 'High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need focus.', 
      image: 'assets/images/headphones.jpg',
      category: 'electronics',
      rating: 4.5,
      stock: 25,
      brand: 'AudioTech',
      images: ['assets/images/headphones-1.jpg', 'assets/images/headphones-2.jpg'],
      features: ['Noise Cancellation', '30hr Battery', 'Fast Charging', 'Comfort Fit'],
      specifications: {
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.0',
        'Weight': '250g',
        'Color': 'Black'
      },
      discount: 10,
      isFeatured: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    { 
      id: 'p2', 
      title: 'Smart Fitness Watch', 
      price: 199.99, 
      description: 'Advanced fitness tracking with heart rate monitor, GPS, and smart notifications.', 
      image: 'assets/images/smartwatch.jpg',
      category: 'electronics',
      rating: 4.3,
      stock: 15,
      brand: 'FitTech',
      features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Sleep Tracking'],
      discount: 15,
      isFeatured: true,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    { 
      id: 'p3', 
      title: 'Organic Cotton T-Shirt', 
      price: 29.99, 
      description: 'Comfortable and sustainable cotton t-shirt made from 100% organic materials.', 
      image: 'assets/images/tshirt.jpg',
      category: 'clothing',
      rating: 4.2,
      stock: 50,
      brand: 'EcoWear',
      features: ['100% Organic Cotton', 'Machine Washable', 'Multiple Colors'],
      specifications: {
        'Material': '100% Organic Cotton',
        'Care': 'Machine Wash Cold',
        'Fit': 'Regular'
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    { 
      id: 'p4', 
      title: 'Professional Camera', 
      price: 1299.99, 
      description: 'DSLR camera with 4K video recording and professional-grade lens kit.', 
      image: 'assets/images/camera.jpg',
      category: 'electronics',
      rating: 4.8,
      stock: 8,
      brand: 'PhotoPro',
      features: ['4K Video', '24MP Sensor', 'Wi-Fi Connectivity', 'Interchangeable Lenses'],
      discount: 5,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    { 
      id: 'p5', 
      title: 'Designer Backpack', 
      price: 89.99, 
      description: 'Stylish and functional backpack for everyday use with laptop compartment.', 
      image: 'assets/images/backpack.jpg',
      category: 'accessories',
      rating: 4.4,
      stock: 30,
      brand: 'UrbanGear',
      features: ['Laptop Compartment', 'Water Resistant', 'Multiple Pockets', 'Ergonomic Straps'],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    { 
      id: 'p6', 
      title: 'Ceramic Coffee Mug', 
      price: 19.99, 
      description: 'Beautiful handcrafted ceramic mug perfect for your morning coffee.', 
      image: 'assets/images/mug.jpg',
      category: 'home',
      rating: 4.6,
      stock: 100,
      brand: 'ArtisanHome',
      features: ['Handcrafted', 'Dishwasher Safe', 'Microwave Safe'],
      discount: 20,
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08')
    },
    { 
      id: 'p7', 
      title: 'Wireless Mouse', 
      price: 39.99, 
      description: 'Ergonomic wireless mouse with precision tracking and long battery life.', 
      image: 'assets/images/mouse.jpg',
      category: 'electronics',
      rating: 4.1,
      stock: 40,
      brand: 'TechGear',
      features: ['Wireless', 'Ergonomic Design', '2-Year Battery', 'Precision Tracking'],
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    { 
      id: 'p8', 
      title: 'Yoga Mat', 
      price: 49.99, 
      description: 'Premium non-slip yoga mat for all your fitness and meditation needs.', 
      image: 'assets/images/yogamat.jpg',
      category: 'sports',
      rating: 4.7,
      stock: 35,
      brand: 'FitLife',
      features: ['Non-Slip', 'Eco-Friendly', 'Easy to Clean', 'Lightweight'],
      discount: 10,
      isFeatured: true,
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22')
    }
  ];

  private mockCategories: ProductCategory[] = [
    { id: 'electronics', name: 'Electronics', description: 'Latest gadgets and electronics' },
    { id: 'clothing', name: 'Clothing', description: 'Fashion and apparel' },
    { id: 'home', name: 'Home & Garden', description: 'Home improvement and gardening' },
    { id: 'sports', name: 'Sports', description: 'Sports equipment and accessories' },
    { id: 'accessories', name: 'Accessories', description: 'Fashion and tech accessories' }
  ];

  list(): Observable<Product[]> {
    // Simulate API delay
    return of(this.mockProducts);
  }

  getById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    // Simulate API delay
    return of(product);
  }

  getByCategory(category: string): Observable<Product[]> {
    const products = this.mockProducts.filter(p => p.category === category);
    return of(products);
  }

  getFeatured(): Observable<Product[]> {
    const featured = this.mockProducts.filter(p => p.isFeatured);
    return of(featured);
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return of(this.mockProducts);
    }
    
    const searchTerm = query.toLowerCase();
    const results = this.mockProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand?.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    
    return of(results);
  }

  getCategories(): Observable<ProductCategory[]> {
    return of(this.mockCategories);
  }

  getRelatedProducts(productId: string): Observable<Product[]> {
    const product = this.mockProducts.find(p => p.id === productId);
    if (!product) return of([]);
    
    const related = this.mockProducts
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, 4);
    
    return of(related);
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    const products = this.mockProducts.filter(p => p.brand?.toLowerCase() === brand.toLowerCase());
    return of(products);
  }
}
