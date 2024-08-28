const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const LoginInfo = require('../models/LoginInfo');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

        // Determine IP address
        const ip = req.headers['x-forwarded-for'] || req.ip;

        // Store login information
        const loginInfo = new LoginInfo({
            user: user._id,
            ip: ip
        });
        await loginInfo.save();

        res.status(200).json({ success: true, email: user.email, token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

