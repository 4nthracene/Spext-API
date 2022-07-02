const { Router } = require('express');
const router = Router();
const FileHandler = require("./Files");
const AnalyticsHandler = require("./Analytics");
const ErrorHandler = require("./Error");

router.use("/files", FileHandler);
router.use("/analytics", AnalyticsHandler);
router.use(ErrorHandler);

module.exports = router;

