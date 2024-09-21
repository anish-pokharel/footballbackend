const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// Create a new match
router.post('/match', async (req, res) => {
  const { fixture, selection, league, odds } = req.body;

  // Validate request body
  if (!fixture || !selection || !league || !odds) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMatch = new Match({
      fixture,
      selection,
      league,
      odds,
    });

    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// Get all matches
router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Get a match by ID
router.get('/match/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

// Update a match
router.put('/match/:id', async (req, res) => {
  const { fixture, selection, league, odds } = req.body;

  // Validate request body
  if (!fixture || !selection || !league || !odds) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { fixture, selection, league, odds },
      { new: true, runValidators: true }
    );
    if (!updatedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// Delete a match
router.delete('/match/:id', async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete match' });
  }
});

module.exports = router;
