const path = require("path");

require("dotenv").config({
	path: path.resolve(__dirname, "../.env")
});

function EnvVariablesWRTStatus(name, def){
	return process.env[name] ? process.env[name] : def;
};

module.exports = {
	PORT: parseInt(EnvVariablesWRTStatus("PORT", "3000")),
	MONGO_URI: EnvVariablesWRTStatus("MONGO_URI", "mongodb://localhost:27017/SpextAPI"),
	PRODUCTION: EnvVariablesWRTStatus("PRODUCTION", false),
};

