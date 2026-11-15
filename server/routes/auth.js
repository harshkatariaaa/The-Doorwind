const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');
const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: genToken(admin._id), admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/me', protect, (req, res) => res.json({ admin: req.admin }));

router.post('/seed', async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (exists) return res.json({ message: 'Admin already exists' });
    const admin = await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Doorwind Admin' });
    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;