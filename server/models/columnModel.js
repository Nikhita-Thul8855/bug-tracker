const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = mongoose.model('Column', columnSchema);