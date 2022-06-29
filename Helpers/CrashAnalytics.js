const fs = require("fs");
const path = require("path");

module.exports = async () => {
	process.on("uncaughtException", (err) => {
		console.log('AN ERROR OCCURED');
		const d = new Date();
		const content = `\n[${d}]: ${err.message}`;
		try {
			fs.appendFile(
				path.resolve(__dirname, "../CRASHANALYTICS.log"),
				content,
				() => {}
			);
		} catch (e) {
			console.log(e.message)
			fs.writeFileSync(
				path.resolve(__dirname, "../CRASHANALYTICS.log"),
				"ERROR WHILE WRITING TO CRASH REPORTS."
			);
		}
	});
};
