import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

interface Credentials { 
  email: string; 
  password: string; 
  firstName?: string;
  lastName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private _isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private _currentUser = new BehaviorSubject<User | null>(this.getUserFromStorage());
  
  isAuthenticated$ = this._isAuthenticated.asObservable();
  currentUser$ = this._currentUser.asObservable();

  login(creds: Credentials): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 'user-1',
          email: creds.email,
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        localStorage.setItem('token', 'demo-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        this._isAuthenticated.next(true);
        this._currentUser.next(user);
        resolve(true);
      }, 1000);
    });
  }

  register(creds: Credentials): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email: creds.email,
          firstName: creds.firstName || '',
          lastName: creds.lastName || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        localStorage.setItem('token', 'demo-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        this._isAuthenticated.next(true);
        this._currentUser.next(user);
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isAuthenticated.next(false);
    this._currentUser.next(null);
  }

  updateProfile(userData: Partial<User>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = this._currentUser.value;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData, updatedAt: new Date() };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this._currentUser.next(updatedUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  get currentUser(): User | null {
    return this._currentUser.value;
  }
}