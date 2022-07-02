const fs = require("fs");

module.exports = (error, req, res, next) => {
	const d = new Date();
	const content = `\n[${d}]: ${err.message}`;
	try {
		fs.appendFile(
			path.resolve(__dirname, "./CRASHANALYTICS.log"),
			content,
			() => {}
		);
		res.json({
			message: `An error occured.`,
		});
	} catch (e) {
		console.log(e.message);
		fs.writeFileSync(
			path.resolve(__dirname, "./CRASHANALYTICS.log"),
			"ERROR WHILE WRITING TO CRASH REPORTS."
		);
	}
};
