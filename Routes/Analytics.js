const { Router } = require("express");
const AnalyticsController = require("../Controllers/Analytics");
const router = Router();

router.get("/info", AnalyticsController.getInfoFromFileType);
router.get("/averageDuration", AnalyticsController.AverageDuration);

module.exports = router;
