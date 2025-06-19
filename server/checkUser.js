const User = require('./models/userModel');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: 'nikhitataksande05@example.com' });
  console.log(user);
  process.exit();
});