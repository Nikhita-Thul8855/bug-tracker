const express = require('express');
const router = express.Router();
const Board = require('../models/boardModel');
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const board = new Board({ name, columns: [] });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error creating board' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate({
        path: 'columns',
        populate: { path: 'cards' }
      });
    if (!board) {
      console.log('Board not found for id:', req.params.id);
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(board);
  } catch (err) {
    console.error('Error fetching board:', err); // This will show the real error in your terminal
    res.status(500).json({ message: 'Error fetching board' });
  }
});

module.exports = router;