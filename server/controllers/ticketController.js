const Ticket = require('../models/ticketModel');

// Make sure to export ALL controller functions used in your routes!
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo, project } = req.body;

    if (!title || !description || !priority || !status || !project) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTicket = new Ticket({
      title,
      description,
      priority,
      status,
      assignedTo,
      project,
      createdBy: req.user._id,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Server error in createTicket' });
  }
};

exports.getFilteredTickets = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assignedTo, search } = req.query;

    let filter = { project: projectId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(filter).populate('assignedTo');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error in getFilteredTickets' });
  }
};

exports.getTicketsByProject = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('project createdBy assignedTo');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error in getTicketsByProject' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error in updateTicket' });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error in deleteTicket' });
  }
};