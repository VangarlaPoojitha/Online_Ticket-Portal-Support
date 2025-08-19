export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  customer_id: number;
  customer_name?: string;
  customer_email?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  category: string;
  priority: string;
}