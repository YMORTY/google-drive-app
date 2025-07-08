
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./api/authRoutes');
const fileRoutes = require('./api/fileRoutes');

// Debugging: Check if environment variables are loaded
console.log('Loaded GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
