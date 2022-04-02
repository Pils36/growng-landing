const welcomeHome = (req, res) => {
	res.render('./pages/index', { page: 'Welcome to our Space' });
};

module.exports = welcomeHome;
