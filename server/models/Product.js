const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, enum: ['Doors','Furniture','Windows','Storage','Custom'], default: 'Furniture' },
  images:      [{ type: String }],
  material:    { type: String, default: 'Solid Wood' },
  dimensions:  { type: String, default: '' },
  finish:      { type: String, default: 'Natural' },
  inStock:     { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
  isVisible:   { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);