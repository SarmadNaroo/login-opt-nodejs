const express = require('express');
const router = express.Router();
const userPostController = require('../controllers/userPostController');

router.post('/create-post', userPostController.createUserPost);

router.get('/get/posts', userPostController.getPosts);

module.exports = router;
