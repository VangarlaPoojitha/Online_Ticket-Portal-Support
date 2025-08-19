import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error-message">
            Valid email is required
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error-message">
            Password is required
          </div>
        </div>
        
        <button type="submit" [disabled]="loginForm.invalid || loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        
        <div *ngIf="error" class="error-message">{{ error }}</div>
      </form>
      
      <p>Don't have an account? <a routerLink="/register">Register here</a></p>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 50px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; border: 1px solid #ddd; }
    input.error { border-color: red; }
    .error-message { color: red; font-size: 12px; margin-top: 5px; }
    button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          this.error = err.error?.error || 'Login failed';
          this.loading = false;
        }
      });
    }
  }
}