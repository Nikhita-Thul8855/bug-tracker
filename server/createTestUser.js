const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/userModel');

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'test@example.com';
    const plainPassword = 'Test1234';
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('⚠️ User already exists. Please use a different email.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const user = new User({
      name: 'Test User',
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ Test user created:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}`);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating test user:', err);
    process.exit(1);
  }
};

createTestUser();