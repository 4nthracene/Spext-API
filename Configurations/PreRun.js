const mongoose = require("mongoose");
const CONFIGURATIONS = require("./index");

async function PreRun(app) {
	try{
		mongoose.connect(CONFIGURATIONS.MONGO_URI);
		console.log(`[DATABASE]: Connection established`)
	} catch(e) {
		console.error(`[DB-ERROR]: Error while connecting to the database`, e.message);
	}
}

module.exports = PreRun;

