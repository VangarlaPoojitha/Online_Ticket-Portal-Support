const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');

const router = express.Router();

const ticketValidation = [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['technical', 'billing', 'general']).withMessage('Invalid category'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
];

router.use(authenticateToken);

router.post('/', ticketValidation, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', ticketValidation, updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;