const { validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');
const logger = require('../config/logger');

const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticketData = { ...req.body, customer_id: req.user.id };
    const ticket = await Ticket.create(ticketData);

    logger.info(`Ticket created: ${ticket.id} by user ${req.user.id}`);
    res.status(201).json(ticket);
  } catch (error) {
    logger.error('Create ticket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getTickets = async (req, res) => {
  try {
    const filters = req.query;
    const tickets = await Ticket.findAll(filters);
    res.json(tickets);
  } catch (error) {
    logger.error('Get tickets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    logger.error('Get ticket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = await Ticket.update(req.params.id, req.body);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    logger.info(`Ticket updated: ${ticket.id} by user ${req.user.id}`);
    res.json(ticket);
  } catch (error) {
    logger.error('Update ticket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.delete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    logger.info(`Ticket deleted: ${ticket.id} by user ${req.user.id}`);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    logger.error('Delete ticket error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTicket, getTickets, getTicketById, updateTicket, deleteTicket };