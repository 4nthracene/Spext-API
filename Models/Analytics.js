const mongoose = require("mongoose");

const AnalyticalSchema = new mongoose.Schema({
	averageViews: {
		type: Number,
		default: 0
	},
	durations: [{ type: Number }],
	format: {
		type: String,
		required: true,
		index: true
	},
	NumberOfFiles: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Analytics", AnalyticalSchema);

