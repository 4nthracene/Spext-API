const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0
		},
		comments: [
			{
				type: String
			}
		],
		info: {
			duration: {
				type: Number,
				required: true
			},
			format: {
				type: String,
				required: true
			},
			size: {
				type: Number,
				required: true
			},
			encoding: {
				type: String,
				required: true
			},
			originalname: {
				type: String,
				required: true
			},
			encoding: {
				type: String,
				required: true
			}
		}
	},
	{ timeStamps: { createdAt: true } }
);

module.exports = mongoose.model("file", FileSchema);

