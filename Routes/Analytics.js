const { Router } = require("express");
const router = Router();
const Analytics = require("../Controllers/Analytics");

router.get("/", Analytics.test);

module.exports = router
