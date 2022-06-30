const { getVideoDurationInSeconds } = require("get-video-duration");
const { getAudioDurationInSeconds } = require("get-audio-duration");

async function getInfo(req) {
	const fileType = req.file.mimetype;
	const path = req.file.path;
	const size = req.file.size;
	const encoding = req.file.encoding
	if(fileType.split('/')[0] == "video") {
		try {
			const duration = await getVideoDurationInSeconds(req.file.path);
			return {
				fileType,
				path,
				size,
				encoding,
				duration
			}

		} catch (e) {
			console.log(`[SERVER]: Error while getting the video duration.`);
			throw new Error('Error while getting the video duration.')
		}

	} else if(fileType.split("/")[0] == "audio") {
		try {
			const duration = await getAudioDurationInSeconds(req.file.path);
			return {
				fileType,
				path,
				size,
				encoding,
				duration
			}
		} catch (e) {
			console.log(`[SERVER]: Error while getting the audio duration.`);
			throw new Error('Error while getting the audio duration.')
		}

	}

}

module.exports = getInfo;
