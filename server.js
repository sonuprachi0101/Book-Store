const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // For loading .env variables

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB error:', err));

// Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
});

const User = mongoose.model('User', userSchema);

// POST route for form submission
app.post('/submit', async (req, res) => {
  const { name, mobileNumber } = req.body;

  try {
    const user = new User({ name, mobileNumber });
    await user.save();
    res.json({
      message: `Thank you, ${name}! Your mobile number ${mobileNumber} has been received.`,
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving data to the database.' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
