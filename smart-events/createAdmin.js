require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@smartevents.com',
    password: hashed,
    role: 'admin'
  });
  console.log('Admin created!');
  process.exit();
});