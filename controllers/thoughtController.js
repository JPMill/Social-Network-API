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
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const thought = await Thought.create(req.body);

    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    await Thought.findByIdAndDelete(req.params.thoughtId);

   
    await User.findByIdAndUpdate(
      thought.userId,
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } }, 
      { new: true, runValidators: true }
    );

    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    res.json({ message: 'Reaction deleted', thought });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
};