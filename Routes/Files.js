const { Router } = require("express");
const FileController = require("../Controllers/Files.controller");
const router = Router();

router.post("/upload", FileController.upload);

router.get("/info", FileController.info);

router.get("/stream", FileController.stream);

router.post("/like", FileController.like);

router.post("/comment", FileController.comment);

module.exports = router;

