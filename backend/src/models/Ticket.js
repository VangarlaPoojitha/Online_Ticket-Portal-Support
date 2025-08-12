const pool = require('../config/database');

class Ticket {
  static async create(ticketData) {
    const { title, description, category, priority, customer_id } = ticketData;
    
    const query = `
      INSERT INTO tickets (title, description, category, priority, status, customer_id)
      VALUES ($1, $2, $3, $4, 'open', $5)
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, description, category, priority, customer_id]);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT t.*, u.username as customer_name, u.email as customer_email
      FROM tickets t
      JOIN users u ON t.customer_id = u.id
    `;
    
    const conditions = [];
    const values = [];
    
    if (filters.status) {
      conditions.push(`t.status = $${values.length + 1}`);
      values.push(filters.status);
    }
    
    if (filters.category) {
      conditions.push(`t.category = $${values.length + 1}`);
      values.push(filters.category);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY t.created_at DESC';
    
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT t.*, u.username as customer_name, u.email as customer_email
      FROM tickets t
      JOIN users u ON t.customer_id = u.id
      WHERE t.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updateData) {
    const { title, description, category, priority, status } = updateData;
    
    const query = `
      UPDATE tickets 
      SET title = $1, description = $2, category = $3, priority = $4, status = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, description, category, priority, status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM tickets WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Ticket;