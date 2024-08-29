const UserPost = require('../models/UserPost');
const User = require('../models/User');

exports.createUserPost = async (req, res) => {
    const { user_id, content, media_url, mood_status } = req.body;

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newPost = new UserPost({
            user_id,
            content,
            media_url,
            mood_status
        });

        await newPost.save();

        res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
