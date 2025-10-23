import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  
  profileForm!: FormGroup;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  loadUserData(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.authService.updateProfile(this.profileForm.value).then(success => {
        this.loading = false;
        if (success) {
          this.successMessage = 'Profile updated successfully!';
        } else {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      }).catch(error => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Profile update error:', error);
      });
    }
  }

  resetForm(): void {
    this.loadUserData();
    this.successMessage = '';
    this.errorMessage = '';
  }
}