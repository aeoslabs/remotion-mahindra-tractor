// @ts-check

import {exec} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const ffprobeAbsolutePath = path.join(__dirname, '..', '..', 'ffprobe');
const ffprobeAbsolutePath = 'ffprobe';

// Function to get video width and height
/**
 *
 * @param {string} inputFile - The path to the input video file
 * @returns {Promise<{width: number, height: number}>}
 */
export function getVideoDimensionsUsingFFProbe(inputFile) {
	return new Promise((resolve, reject) => {
		const ffprobeCommand = `${ffprobeAbsolutePath} -v error -select_streams v:0 -show_entries stream=width,height -of json ${inputFile}`;
		console.log(`executing: ffprobeCommand: ${ffprobeCommand}`);

		exec(ffprobeCommand, (err, stdout, stderr) => {
			if (err) {
				console.error(`Error: ${err.message}`);
				return reject({success: false, error: err});
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			const videoInfo = JSON.parse(stdout);
			if (videoInfo && videoInfo.streams && videoInfo.streams.length > 0) {
				const {width, height} = videoInfo.streams[0];
				console.log(`Video dimensions: width=${width}, height=${height}`);
				resolve({width, height});
			} else {
				reject({success: false, error: 'Unable to retrieve video dimensions'});
			}
		});
	});
}
