const path = require("path");
const multer = require("multer");

const storage = {
	destination: (req, file, cb) => {
		cb(null, path.resolve(__dirname, "../uploads/"));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
}

const diskStorage = multer.diskStorage(storage);

const upload = multer({
	storage: diskStorage,
	fileFilter: (req, file, cb) => {
		if(["mp4", "wav", "mp3", "mkv", "mpeg"].includes(file.mimetype.split("/")[1])){
			return cb(null, true);
		}
		console.log(file.mimetype)
		cb("Sorry but we only support ");
	}
}).single("file");

module.exports = upload;

