const express = require('express');
const router = express.Router();
const Card = require('../models/cardModel');
const Column = require('../models/columnModel');

// Add this POST route for creating a card
router.post('/', async (req, res) => {
  console.log('POST /api/cards called'); // Log when route is hit
  try {
    const { title, description, columnId } = req.body;
    console.log('Request body:', req.body); // Log request body

    if (!title || !columnId) {
      console.log('Missing title or columnId');
      return res.status(400).json({ message: 'Title and columnId are required' });
    }

    const card = new Card({ title, description, column: columnId });
    await card.save();
    await Column.findByIdAndUpdate(columnId, { $push: { cards: card._id } });
    console.log('Card created:', card);
    res.status(201).json(card);
  } catch (err) {
    console.error('Error creating card:', err);
    res.status(500).json({ message: 'Error creating card', error: err.message });
  }
});

module.exports = router;