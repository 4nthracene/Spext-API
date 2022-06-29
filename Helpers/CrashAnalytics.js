const fs = require("fs");
const path = require("path");

module.exports = async () => {
	process.on("uncaughtException", (err) => {
		const d = new Date();
		const content = `[${d}]: ${err.message}`;
		try {
			fs.writeFileSync(
				path.resolve(__dirname, "../CRASHANALYTICS.log"),
				content
			);
		} catch (e) {
			fs.writeFileSync(
				path.resolve(__dirname, "../CRASHANALYTICS.log"),
				"ERROR WHILE WRITING TO CRASH REPORTS."
			);
		}
	});
};
