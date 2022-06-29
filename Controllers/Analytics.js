
const test = (req, res, next) => {
	return res.json({
		message: "Working perfectly!"
	});
};

module.exports = {
	test
}
