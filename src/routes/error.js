const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('./pages/error/404');
});

module.exports = router;
