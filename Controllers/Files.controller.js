const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const Analytics = require("../Models/Analytics");
const MULTER_UPLOAD_CONF = require("../Configurations/multer.config");
const File = require("../Models/File");
const path = require("path");
const getInfo = require("../Helpers/GetInfo");

const upload = async (req, res, next) => {
	MULTER_UPLOAD_CONF(req, res, async (err) => {
		if (err) {
			next(err);
		}
		const info = await getInfo(req);
		try {
			const analyticsQueryResult = await Analytics.find({
				format: info.fileType,
			});
			if (analyticsQueryResult.length > 0) {
				analyticsQueryResult[0].NumberOfFiles += 1;
				analyticsQueryResult[0].durations.push(info.duration);
				console.log("analyticsQueryResult", analyticsQueryResult);
				await analyticsQueryResult[0].save();
			} else {
				const newAnalytics = new Analytics({
					format: info.fileType,
					averageDuration: info.duration,
					durations: [info.duration],
					NumberOfFiles: 1,
				});
				console.log("newAnalytics", newAnalytics);
				await newAnalytics.save();
			}
		} catch (e) {
			next(e);
		}
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
				id: newFile._id,
				message: "File saved successfully.",
			});
		} catch (e) {
			next(e);
		}
	});
};

const info = async (req, res, next) => {
	const { id } = req.query;
	console.log(req.query);
	try {
		const doc = await File.findById(id);
		return res.json({
			...doc.info,
			likes: doc.likes,
			comments: doc.comments,
		});
	} catch (e) {
		next(e);
	}
};

const stream = async (req, res, next) => {
	try {
		const file = await File.findById(req.query.id);
		const analytics = await Analytics.find({ format: file.info.format });
		analytics[0].averageViews += 1;
		await analytics[0].save();
		file.views += 1;
		await file.save();
		res.setHeader("Content-Type", file.info.format);
		fs.createReadStream(file.fileName).pipe(res);
	} catch (e) {
		next(e);
	}
};

const like = async (req, res, next) => {
	console.log(req.body);
	try {
		const file = await File.findById(req.body.id);
		file.likes += 1;
		console.log(file);
		await file.save();
		return res.status(200).json({
			likes: file.likes,
		});
	} catch (e) {
		next(e);
	}
};

const comment = async (req, res, next) => {
	try {
		const file = await File.findById(req.body.id);
		file.comments.push(req.body.comment);
		await file.save();
		return res.status(200).json({
			comments: file.comments,
		});
	} catch (e) {
		next(e);
	}
};

const transcode = async (req, res, next) => {
	MULTER_UPLOAD_CONF(req, res, async (err) => {
		if (err) {
			next(err);
		}
		try{
		const info = await getInfo(req);
		const output = Date.now() + "output." + req.body.format;
		const convertedOutput = `${path.resolve(
			__dirname,
			"../uploads/"
		)}/${output}`;
		console.log(convertedOutput);
		ffmpeg(info.path)
			.withOutputFormat(req.body.format)
			.on("end", (stdout, stderr) => {
				console.log("finished");
				res.download(convertedOutput, function (err) {
					if (err) throw err;
					fs.unlink(convertedOutput, function (err) {
						if (err) throw err;
						console.log("File deleted");
					});
				});
			})
			.on("progress", function (progress) {
				console.log("Processing: " + progress.percent + "% done");
			})
			.on("error", (err) => {
				return res.json({
					error: err.message,
				})
			})
			.saveToFile(convertedOutput);

		} catch(e) {
			return next(e);
		}
	});
};

module.exports = {
	upload,
	stream,
	info,
	like,
	comment,
	transcode,
};
