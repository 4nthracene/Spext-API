const morgan = require("morgan");
const fs = require('fs');
const CONFIGURATIONS = require("../Configurations");
const path = require("path");

const streamOptions = {
	stream: fs.createWriteStream(path.resolve(__dirname, `../${CONFIGURATIONS.PRODUCTION ? "PRODUCTION.log" : "DEVELOPMENT.log"}`))
}

const logger = morgan(CONFIGURATIONS.PRODUCTION ? "combined" : "dev", streamOptions);

module.exports = logger;

