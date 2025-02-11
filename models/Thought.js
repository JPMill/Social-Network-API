const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Assuming reactionSchema is in Reaction.js

const thoughtSchema = new Schema({
  thoughtText: { 
    type: String, 
    required: true, 
    minlength: 1, 
    maxlength: 280 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    get: timestamp => new Date(timestamp).toLocaleString() 
  },
  username: { 
    type: String, 
    required: true 
  },
  reactions: [reactionSchema], // 🛠️ Embed Reactions here
}, {
  toJSON: { getters: true, virtuals: true },
  id: false
});

// 🔥 Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;