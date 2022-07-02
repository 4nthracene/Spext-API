const { Router } = require("express");
const ErrorController = require("../Helpers/Error.handler");
const router = Router();

router.use(ErrorController);

module.exports = router;
