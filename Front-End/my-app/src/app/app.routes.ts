import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductListComponent } from './pages/product-list/product-list';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { OrderSuccessComponent } from './pages/order-success/order-success';
import { ProfileComponent } from './pages/profile/profile';
import { OrdersComponent } from './pages/orders/orders';
import { authGuard } from './guards/auth-guard';
import { AdminDashboardComponent as AdminDashboard} from './pages/admin-dashboard/admin-dashboard';
import { TestimonialsComponent } from './pages/testimonials/testimonials';
import { FAQComponent, QaComponent as Qa, QaComponent } from './pages/faq/faq';
import { AdminProductsComponent } from './pages/admin-products/admin-products';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [authGuard],
    title: 'Admin Dashboard'
  },
{ path: 'admin/products', component: AdminProductsComponent, title: 'Manage Products' },
  
  { path: 'testimonials', component: TestimonialsComponent, title: 'User Testimonials' },
  { path: 'faq', component: FAQComponent, title: 'Frequently Asked Questions' },
  { path: '', component: HomeComponent, title: 'Home' },
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'admin', component: AdminDashboard, canActivate: [authGuard] },
 { path: 'testimonials', component: TestimonialsComponent, title: 'Customer Testimonials' },
  { path: 'aq', component: Qa, title: 'Frequently Asked Questions' },
  { path: '', component: HomeComponent, title: 'Home' },
 { path: 'admin', component: AdminDashboard },
{ path: 'testimonials', component: TestimonialsComponent },
 { path: 'aq', component: Qa },
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent,title:'Login' },
  { path: 'register', component: RegisterComponent },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];