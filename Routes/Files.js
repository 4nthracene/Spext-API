const { Router } = require("express");
const fs = require("fs");
const router = Router();
const multer = require("multer");
const MULTER_UPLOAD_CONF = require("../Configurations/multer.config");
const File = require("../Models/File");
const path = require("path");
const getInfo = require("../Helpers/GetDuration");

router.get("/", (req, res) => {
	return res.json({
		message: `Working Perfectly!`,
	});
});

router.post("/upload", async (req, res, next) => {
	MULTER_UPLOAD_CONF(req, res, async (err) => {
		if (err) {
			console.error(err);
			return res.status(400).json({
				message: `An error occured while saving the file.`,
			});
		}
		const info = await getInfo(req);
		const newFile = new File({
			fileName: req.file.path,
			info: {
				format: info.fileType,
				duration: info.duration,
				encoding: info.encoding,
				originalname: req.file.originalname,
				size: info.size,
			},
		});
		try {
			await newFile.save();
			res.json({
				message: "File saved successfully.",
			});
		} catch (e) {
			console.log(`[SERVER]: Error while saving the file, ${e.message}`);
			res.json({
				message: `An error occured while saving the file.`,
			});
		}
	});
});

router.get("/info", async (req, res, next) => {
	const { id } = req.query;
	console.log(id);
	try {
		const doc = await File.findById(id);
		return res.json({
			...doc.info,
			likes: doc.likes,
			comments: doc.comments,
		});
	} catch (e) {
		return res.status(404).json({
			message: `No file with that ID exists`,
		});
	}
});

router.get("/stream", async (req, res, next) => {
	try {
		const file = await File.findById(req.query.id);
		res.setHeader("Content-Type", file.info.format);
		fs.createReadStream(file.fileName).pipe(res);
	} catch (e) {
		console.log(e.message);
		return res.status(404).json({
			message: `Can't find that media.`,
		});
	}
});

module.exports = router;
