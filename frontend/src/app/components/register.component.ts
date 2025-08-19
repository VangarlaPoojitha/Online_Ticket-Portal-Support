import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            formControlName="username"
            [class.error]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
          <div *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched" class="error-message">
            Username must be at least 3 characters
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
          <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="error-message">
            Valid email is required
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
          <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="error-message">
            Password must be at least 6 characters
          </div>
        </div>
        
        <button type="submit" [disabled]="registerForm.invalid || loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
        
        <div *ngIf="error" class="error-message">{{ error }}</div>
      </form>
      
      <p>Already have an account? <a routerLink="/login">Login here</a></p>
    </div>
  `,
  styles: [`
    .register-container { max-width: 400px; margin: 50px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; border: 1px solid #ddd; }
    input.error { border-color: red; }
    .error-message { color: red; font-size: 12px; margin-top: 5px; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/tickets']);
        },
        error: (err) => {
          this.error = err.error?.error || 'Registration failed';
          this.loading = false;
        }
      });
    }
  }
}