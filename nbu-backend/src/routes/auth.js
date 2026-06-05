const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Multer Config for Profile Images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/profiles';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, password, role, phone, idNumber } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Profile image is required' });
    }

    const profileImage = `/uploads/profiles/${req.file.filename}`;
    
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role, 
      phone, 
      idNumber, 
      profileImage,
      status: 'Pending',
      isVerified: false
    });

    res.status(201).json({ 
      success: true, 
      message: 'Account request submitted. Awaiting verification by the Nursing In-Charge.' 
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Force approve demo accounts if they are not yet approved
    const demoEmails = ['incharge@nbu.hospital.ke', 'nurse@nbu.hospital.ke'];
    if (demoEmails.includes(user.email) && user.status !== 'Approved') {
      await User.updateOne({ _id: user._id }, { status: 'Approved', isVerified: true });
      user.status = 'Approved';
      user.isVerified = true;
    }

    if (user.status !== 'Approved') {
      return res.status(403).json({ 
        success: false, 
        message: user.status === 'Pending' 
          ? 'Your account is still pending verification.' 
          : 'Your account has been rejected or restricted.' 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        profileImage: user.profileImage,
        isVerified: user.isVerified
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get current user
router.get('/me', auth.protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Management Routes (In-Charge Only)
router.get('/pending', auth.protect, async (req, res) => {
  if (req.user.role !== 'Nursing In-Charge') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  try {
    const users = await User.find({ status: 'Pending' });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify/:id', auth.protect, async (req, res) => {
  if (req.user.role !== 'Nursing In-Charge') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const user = await User.findById(req.id || req.params.id);
    
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.status = status;
    if (status === 'Approved') {
      user.isVerified = true;
      user.verifiedBy = req.user.id;
      user.verificationDate = new Date();
    }
    
    await user.save();
    res.json({ success: true, message: `Account ${status.toLowerCase()} successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/profile', auth.protect, async (req, res) => {
  try {
    const { name, currentPassword, newPassword, phone } = req.body;
    const user = await User.findById(req.user.id).select('+password');
    
    if (name) {
      // If name changes, suspend verification as per requirements
      if (user.name !== name) {
        user.name = name;
        user.isVerified = false;
        user.status = 'Pending';
      }
    }
    
    if (phone) user.phone = phone;
    
    if (newPassword && currentPassword) {
      if (!(await user.comparePassword(currentPassword))) {
        return res.status(401).json({ success: false, message: 'Invalid current password' });
      }
      user.password = newPassword;
    }
    
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
