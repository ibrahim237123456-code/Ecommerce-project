import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: "./login.html",
  styleUrls: ['./login.css']


})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  auth: any;

  onLogin() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/admin']);
    } else {
      this.error = 'username or password is incorrect';
    }
  }
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).then(success => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      }).catch(error => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Login error:', error);
      });
    }
  }
}

