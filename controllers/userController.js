const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },
  
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends'); 

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      await User.findByIdAndDelete(req.params.id);

      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },

  // Add friend to user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found" });
      }

      if (user.friends.includes(friend._id)) {
        return res.status(400).json({ message: "Already friends" });
      }

      user.friends.push(friend._id);
      friend.friends.push(user._id); 

      await user.save();
      await friend.save();

      res.json({ message: "Friend added successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  },

  // Remove friend from user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found" });
      }

      if (!user.friends.includes(friend._id)) {
        return res.status(400).json({ message: "Not friends" });
      }

      user.friends.pull(friend._id);
      friend.friends.pull(user._id);  

      await user.save();
      await friend.save();

      res.json({ message: "Friend removed successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
};