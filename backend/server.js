const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const loginInfoRoutes = require('./routes/loginInfoRoutes');
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api/logininfo', loginInfoRoutes);
app.use('/api/otp', otpRoutes); 

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
