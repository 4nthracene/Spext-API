const { Router } = require('express');
const router = Router();
const FileHandler = require("./Files");

router.use("/files", FileHandler);

module.exports = router;

