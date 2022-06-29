const express = require("express");
const spec = require("./Configurations/swagger.config");
const SwaggerUI = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet");
const CONFIGURATIONS = require("./Configurations");
const PreRun = require("./Configurations/PreRun");
const dotenv = require("dotenv");
const Routes = require("./Routes");
const compression = require("compression");
const multer = require("multer");
const morgan = require("morgan")
const MULTER_CONFIG = require("./Configurations/multer.config");
const logger = require("./Helpers/Logger");
const CRASH_LOGGER = require("./Helpers/CrashAnalytics");

dotenv.config();

async function Run() {
	const app = express();
	await PreRun(app);
	app.use(express.json());
	app.use(express.static(__dirname));
	app.use(cors());
	app.use(helmet());
	app.use(logger);
	app.use(compression());
	app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(require("./swagger.json"), { explorer: true }));
	app.use(Routes);
	app.listen(CONFIGURATIONS.PORT, () => {
		console.log(
			`[SERVER]: Server up and running on port: ${CONFIGURATIONS.PORT}`
		);
	});
	CRASH_LOGGER();
}

Run();

