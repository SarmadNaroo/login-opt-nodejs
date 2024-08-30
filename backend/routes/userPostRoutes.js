const express = require('express');
const router = express.Router();
const userPostController = require('../controllers/userPostController');
const userLikeController = require('../controllers/userLikeController');

// Route to create a new post
router.post('/create-post', userPostController.createUserPost);
// Route to get posts
router.get('/get/posts', userPostController.getPosts);

// Route to like a post
router.post('/like-post', userLikeController.likePost);
// Route to get likes for a post
router.get('/get/likes', userLikeController.getLikes);

module.exports = router;
