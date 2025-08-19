import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  template: `
    <div class="ticket-list-container">
      <div class="header">
        <h2>Support Tickets</h2>
        <div class="actions">
          <button (click)="createTicket()" class="btn-primary">Create Ticket</button>
          <button (click)="logout()" class="btn-secondary">Logout</button>
        </div>
      </div>
      
      <div class="filters">
        <select [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        
        <select [(ngModel)]="categoryFilter" (change)="applyFilters()">
          <option value="">All Categories</option>
          <option value="technical">Technical</option>
          <option value="billing">Billing</option>
          <option value="general">General</option>
        </select>
      </div>
      
      <div class="tickets-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ticket of tickets">
              <td>{{ ticket.id }}</td>
              <td>{{ ticket.title }}</td>
              <td>{{ ticket.category }}</td>
              <td>{{ ticket.priority }}</td>
              <td>{{ ticket.status }}</td>
              <td>{{ ticket.created_at | date:'short' }}</td>
              <td>
                <button (click)="viewTicket(ticket.id)" class="btn-small">View</button>
                <button (click)="editTicket(ticket.id)" class="btn-small">Edit</button>
                <button (click)="deleteTicket(ticket.id)" class="btn-small btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div *ngIf="loading" class="loading">Loading tickets...</div>
      <div *ngIf="error" class="error-message">{{ error }}</div>
    </div>
  `,
  styles: [`
    .ticket-list-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .actions button { margin-left: 10px; }
    .filters { margin-bottom: 20px; }
    .filters select { margin-right: 10px; padding: 5px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
    .btn-primary { background: #007bff; color: white; padding: 8px 16px; border: none; cursor: pointer; }
    .btn-secondary { background: #6c757d; color: white; padding: 8px 16px; border: none; cursor: pointer; }
    .btn-small { padding: 4px 8px; margin-right: 5px; border: none; cursor: pointer; }
    .btn-danger { background: #dc3545; color: white; }
    .loading, .error-message { text-align: center; padding: 20px; }
    .error-message { color: red; }
  `]
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = false;
  error = '';
  statusFilter = '';
  categoryFilter = '';

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.error = '';
    
    const filters = {
      status: this.statusFilter,
      category: this.categoryFilter
    };
    
    this.ticketService.getTickets(filters).subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tickets';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.loadTickets();
  }

  createTicket(): void {
    this.router.navigate(['/tickets/create']);
  }

  viewTicket(id: number): void {
    this.router.navigate(['/tickets', id]);
  }

  editTicket(id: number): void {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  deleteTicket(id: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          this.loadTickets();
        },
        error: (err) => {
          this.error = 'Failed to delete ticket';
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}