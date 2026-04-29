const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nbu_nurse_assistant');
    console.log('Connected to MongoDB for seeding...');

    const users = [
      {
        name: 'Nursing In-Charge',
        email: 'incharge@nbu.hospital.ke',
        password: 'Admin@1234',
        role: 'Nursing In-Charge',
        status: 'Approved',
        isVerified: true,
        phone: '0711111111',
        idNumber: 'ADMIN-001',
        profileImage: '/uploads/profiles/default.png'
      },
      {
        name: 'Staff Nurse',
        email: 'nurse@nbu.hospital.ke',
        password: 'Nurse@1234',
        role: 'Nurse',
        status: 'Approved',
        isVerified: true,
        phone: '0722222222',
        idNumber: 'NURSE-001',
        profileImage: '/uploads/profiles/default.png'
      }
    ];

    for (const u of users) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`User ${u.email} already exists, updating status to Approved...`);
        existing.status = 'Approved';
        await existing.save();
      } else {
        console.log(`Creating user ${u.email}...`);
        await User.create(u);
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
