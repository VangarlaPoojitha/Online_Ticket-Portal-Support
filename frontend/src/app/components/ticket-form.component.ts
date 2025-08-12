import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  template: `
    <div class="ticket-form-container">
      <h2>{{ isEditMode ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
      
      <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title"
            [class.error]="ticketForm.get('title')?.invalid && ticketForm.get('title')?.touched">
          <div *ngIf="ticketForm.get('title')?.invalid && ticketForm.get('title')?.touched" class="error-message">
            Title must be at least 5 characters
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea 
            id="description" 
            formControlName="description" 
            rows="4"
            [class.error]="ticketForm.get('description')?.invalid && ticketForm.get('description')?.touched">
          </textarea>
          <div *ngIf="ticketForm.get('description')?.invalid && ticketForm.get('description')?.touched" class="error-message">
            Description must be at least 10 characters
          </div>
        </div>
        
        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" formControlName="category">
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="general">General</option>
          </select>
          <div *ngIf="ticketForm.get('category')?.invalid && ticketForm.get('category')?.touched" class="error-message">
            Please select a category
          </div>
        </div>
        
        <div class="form-group">
          <label for="priority">Priority:</label>
          <select id="priority" formControlName="priority">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div *ngIf="ticketForm.get('priority')?.invalid && ticketForm.get('priority')?.touched" class="error-message">
            Please select a priority
          </div>
        </div>
        
        <div *ngIf="isEditMode" class="form-group">
          <label for="status">Status:</label>
          <select id="status" formControlName="status">
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        
        <div class="form-actions">
          <button type="submit" [disabled]="ticketForm.invalid || loading" class="btn-primary">
            {{ loading ? 'Saving...' : (isEditMode ? 'Update Ticket' : 'Create Ticket') }}
          </button>
          <button type="button" (click)="cancel()" class="btn-secondary">Cancel</button>
        </div>
        
        <div *ngIf="error" class="error-message">{{ error }}</div>
      </form>
    </div>
  `,
  styles: [`
    .ticket-form-container { max-width: 600px; margin: 20px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, textarea, select { width: 100%; padding: 8px; border: 1px solid #ddd; }
    input.error, textarea.error, select.error { border-color: red; }
    .error-message { color: red; font-size: 12px; margin-top: 5px; }
    .form-actions { margin-top: 20px; }
    .form-actions button { margin-right: 10px; padding: 10px 20px; border: none; cursor: pointer; }
    .btn-primary { background: #007bff; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    button:disabled { background: #ccc; }
  `]
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  ticketId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['open']
    });
  }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.ticketId;
    
    if (this.isEditMode) {
      this.loadTicket();
    }
  }

  loadTicket(): void {
    if (this.ticketId) {
      this.ticketService.getTicketById(this.ticketId).subscribe({
        next: (ticket) => {
          this.ticketForm.patchValue(ticket);
        },
        error: (err) => {
          this.error = 'Failed to load ticket';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.loading = true;
      this.error = '';
      
      const ticketData = this.ticketForm.value;
      
      if (this.isEditMode && this.ticketId) {
        this.ticketService.updateTicket(this.ticketId, ticketData).subscribe({
          next: () => {
            this.router.navigate(['/tickets']);
          },
          error: (err) => {
            this.error = err.error?.error || 'Failed to update ticket';
            this.loading = false;
          }
        });
      } else {
        this.ticketService.createTicket(ticketData).subscribe({
          next: () => {
            this.router.navigate(['/tickets']);
          },
          error: (err) => {
            this.error = err.error?.error || 'Failed to create ticket';
            this.loading = false;
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/tickets']);
  }
}