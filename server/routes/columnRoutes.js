const express = require('express');
const router = express.Router();
const Column = require('../models/columnModel');
const Board = require('../models/boardModel');

// Create a new column and add it to a board
router.post('/', async (req, res) => {
  try {
    const { name, boardId } = req.body;
    if (!name || !boardId) return res.status(400).json({ message: 'Name and boardId are required' });
    const column = new Column({ name, board: boardId, cards: [] });
    await column.save();
    await Board.findByIdAndUpdate(boardId, { $push: { columns: column._id } });
    res.status(201).json(column);
  } catch (err) {
    console.error('Error creating column:', err); // This will show the real error in your terminal
    res.status(500).json({ message: 'Error creating column' });
  }
});

// (Optional) Get all columns for a board
router.get('/board/:boardId', async (req, res) => {
  try {
    const columns = await Column.find({ board: req.params.boardId }).populate('cards');
    res.json(columns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching columns' });
  }
});

module.exports = router;