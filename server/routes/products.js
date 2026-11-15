const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isVisible: true };
    if (category && category !== 'All') filter.category = category;
    if (search) filter.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    res.json(await Product.find(filter).sort({ createdAt: -1 }));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/admin/all', protect, async (req, res) => {
  try { res.json(await Product.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, material, dimensions, finish, inStock, isFeatured, isVisible } = req.body;
    const images = req.files ? req.files.map(f => f.filename) : [];
    const p = await Product.create({
      name, description, price: Number(price), category, material, dimensions, finish,
      inStock: inStock !== 'false', isFeatured: isFeatured === 'true', isVisible: isVisible !== 'false', images
    });
    res.status(201).json(p);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, upload.array('images', 5), async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    const { name, description, price, category, material, dimensions, finish, inStock, isFeatured, isVisible } = req.body;
    if (req.files?.length) p.images.push(...req.files.map(f => f.filename));
    Object.assign(p, {
      name: name ?? p.name, description: description ?? p.description,
      price: price ? Number(price) : p.price, category: category ?? p.category,
      material: material ?? p.material, dimensions: dimensions ?? p.dimensions, finish: finish ?? p.finish,
      inStock: inStock !== undefined ? inStock !== 'false' : p.inStock,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' : p.isFeatured,
      isVisible: isVisible !== undefined ? isVisible !== 'false' : p.isVisible
    });
    res.json(await p.save());
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    p.images.forEach(img => {
      const fp = path.join(__dirname, '../uploads', img);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    });
    await p.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;