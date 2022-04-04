const express = require('express');

const router = express.Router();

const { welcomeHome, postBlog } = require('../controllers/WelcomeController');

router.get('/', welcomeHome);
router.get('/crawler', postBlog);

module.exports = router;
