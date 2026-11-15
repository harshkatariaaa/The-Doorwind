const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    phone:    process.env.CONTACT_PHONE   || '+91 98000 00000',
    email:    process.env.CONTACT_EMAIL   || 'hello@thedoorwind.com',
    address:  process.env.CONTACT_ADDRESS || 'Punjab, India',
    whatsapp: process.env.WHATSAPP_NUMBER || '919800000000',
    hours:    'Mon–Sat: 9:00am – 7:00pm',
    lat:      process.env.STORE_LAT       || '30.4822',
    lng:      process.env.STORE_LNG       || '76.5950'
  });
});
module.exports = router;