const { Router } = require('express');
const router = Router();
const FileHandler = require("./Files");
const AnalyticsHandler = require("./Analytics");

router.use("/files", FileHandler);
router.use("/analytics", AnalyticsHandler);

module.exports = router;

