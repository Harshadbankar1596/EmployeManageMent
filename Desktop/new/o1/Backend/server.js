import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Fix for __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/influencerDB', {
 
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema & Model
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,  // make sure email exists
  followers: Number,
  img: String,
  profession: String,
  experience: String,
  about: String
});

const Profile = mongoose.model('Profile', profileSchema);


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}); 
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Create Profile
app.post('/api/profile', async (req, res) => {
  const { name, email, followers, img, profession, experience, about } = req.body;

  if (!name || !email || !followers || !img || !profession || !experience || !about) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newProfile = new Profile({ name, email, followers, img, profession, experience, about });
    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (err) {
    console.error('Error creating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Profiles

app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve React Frontend (Production)

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });

  newContact.save()
    .then(() => res.status(201).json({ message: 'Contact saved successfully' }))
    .catch(err => {
      console.error('Error saving contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
