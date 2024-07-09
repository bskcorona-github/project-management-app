import express from 'express';
const router = express.Router();
import Wiki from '../models/wikiModel';
import { protect } from '../middleware/authMiddleware';

// Get all wiki pages
router.get('/', protect, async (req, res) => {
  const wikiPages = await Wiki.find({});
  res.json(wikiPages);
});

// Get a single wiki page by ID
router.get('/:id', protect, async (req, res) => {
  const wikiPage = await Wiki.findById(req.params.id);
  if (wikiPage) {
    res.json(wikiPage);
  } else {
    res.status(404).json({ message: 'Wiki page not found' });
  }
});

// Create a new wiki page
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  const wikiPage = new Wiki({ title, content });
  const createdWikiPage = await wikiPage.save();
  res.status(201).json(createdWikiPage);
});

// Update a wiki page
router.put('/:id', protect, async (req, res) => {
  const { title, content } = req.body;
  const wikiPage = await Wiki.findById(req.params.id);

  if (wikiPage) {
    wikiPage.title = title;
    wikiPage.content = content;

    const updatedWikiPage = await wikiPage.save();
    res.json(updatedWikiPage);
  } else {
    res.status(404).json({ message: 'Wiki page not found' });
  }
});

// Delete a wiki page
router.delete('/:id', protect, async (req, res) => {
  const wikiPage = await Wiki.findById(req.params.id);

  if (wikiPage) {
    await wikiPage.remove();
    res.json({ message: 'Wiki page removed' });
  } else {
    res.status(404).json({ message: 'Wiki page not found' });
  }
});

export default router;
