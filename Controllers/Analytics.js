const AnalyticsModel = require("../Models/Analytics");

const getInfoFromFileType = async (req, res, next) => {
	try{
		const fileType = req.query.type;
		const analytics = await AnalyticsModel.find({fileType});
		res.status(200).json(analytics[0]);
	} catch(e) {
		res.status(400).json({
			message: `An error occured while getting the analytics for this type`
		});
	}
}

const AverageDuration = async (req, res, next) => {
	try{ 
		const fileType = req.query.type;
		const analytics = await AnalyticsModel.find({fileType});
		let sum = 0
		analytics[0].durations.forEach(x => sum += x);
		sum = sum/analytics[0].NumberOfFiles;
		return res.json({
			averageDuration: sum
		})
	} catch(e) {
		res.status(400).json({
			message: `An error occured while getting the views for this type`
		});
	}
}

module.exports = {
	getInfoFromFileType,
	AverageDuration,
}
