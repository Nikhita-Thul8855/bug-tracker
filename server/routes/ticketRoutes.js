const express = require('express');
const router = express.Router();
const {
  createTicket,
  getFilteredTickets,
  getTicketsByProject,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

// Create a new ticket
router.post('/', protect, createTicket);

// Get tickets by project ID with filters (status, priority, assignedTo, search)
router.get('/project/:projectId', protect, getFilteredTickets);

// (Optional) Get all tickets (not filtered by project)
router.get('/', protect, getTicketsByProject);

// Update a ticket
router.put('/:id', protect, updateTicket);

// Delete a ticket
router.delete('/:id', protect, deleteTicket);

module.exports = router;