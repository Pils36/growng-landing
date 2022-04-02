const express = require('express');

const router = express.Router();

const welcomeHome = require('../controllers/WelcomeController');

router.get('/', welcomeHome);

module.exports = router;
