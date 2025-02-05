const Thought = require('../models/Thought');
const User = require('../models/User');

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    // Remove the thought from the associated user's thoughts array
    await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getThoughts, getThoughtById, createThought, updateThought, deleteThought };