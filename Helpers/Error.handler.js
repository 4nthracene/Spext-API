const fs = require("fs");
const path = require("path");

module.exports = (error, req, res, next) => {
	console.log(error.stack);
	const d = new Date();
	const content = `\n[${d}]: ${error.message}`;
	try {
		fs.appendFile("./CRASHANALYTICS.log", content, (err) => {
			if (err) return res.json({ error: err.message });
			return res.json({ error: error.message });
		});
	} catch (e) {
		console.log(e.message);
		fs.writeFileSync(
			path.resolve(__dirname, "./CRASHANALYTICS.log"),
			"ERROR WHILE WRITING TO CRASH REPORTS."
		);
	}
};
