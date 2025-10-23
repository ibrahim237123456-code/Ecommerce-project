import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { CartComponent } from './pages/cart/cart';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { TestimonialsComponent } from './pages/testimonials/testimonials';
import { FAQComponent, QaComponent } from './pages/faq/faq';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, LoadingSpinnerComponent,HomeComponent,LoginComponent,CartComponent,AdminDashboardComponent,TestimonialsComponent,FAQComponent],
  providers: [  Navbar,HomeComponent,LoginComponent,CartComponent,AdminDashboardComponent,CartComponent,TestimonialsComponent,FAQComponent,LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'E-Commerce App';
}
