require('dotenv').config(); 
const mongoose = require('mongoose'); 

// Connect to MongoDB using environment variable or fallback to local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;