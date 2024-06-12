import fs from 'fs/promises';
import Replicate from 'replicate';
import {
	uploadFileTosupabase,
	uploadVideoToSupabaseViaUrl,
} from '../lib/storage.js';
import {STORAGE_BUCKETS} from '../src/constants.js';
const replicate = new Replicate({
	auth: 'r8_Lade7qaok1VYVyW8hf3mhnAN7LfxXb51MqmDi',
});

// Loop over the good images and

// use our replicate model to convert images to video
// 3. Run this through remotion (after manual QA)

const allFiles = await fs.readdir('images_to_process/good_images');
console.log(`There are total ${allFiles.length} images to process`);

const predictionPromises = allFiles.map(async (filename) => {
	console.log(`Processing file ${filename}`);

	const imageBuffer = await fs.readFile(
		`images_to_process/good_images/${filename}`,
	);

	const filePath = ['temp', 'files_to_process', 'good_images', filename].join(
		'/',
	);

	const {publicUrl: generatedImgBucketUrl} = await uploadFileTosupabase({
		filePath,
		bucket: STORAGE_BUCKETS.temp,
		fileBuffer: imageBuffer,
	});

	let prediction = await replicate.deployments.predictions.create(
		'aeoslabs',
		'svdtmahindra',
		{
			input: {
				image: generatedImgBucketUrl,
				output_format: 'png',
				output_quality: 100,
			},
		},
	);

	prediction = await replicate.wait(prediction);

	const [generatedVideoUrl] = prediction.output as [string, string];

	// const videoRes = await fetch(generatedVideoUrl);
	// const videoBuffer = await videoRes.arrayBuffer();
	// // write to disk - in converted_videos folder
	// await fs.writeFile(
	// 	`/images_to_process/converted_videos/${filename}.mp4`,
	// 	Buffer.from(videoBuffer),
	// );

	const {publicUrl: generatedVideoBucketUrl, uploadResult} =
		await uploadVideoToSupabaseViaUrl({
			bucket: STORAGE_BUCKETS.temp,
			fileUrl: generatedVideoUrl,
			filePath: [
				'temp',
				'files_to_process',
				'good_images',
				`${filename
					.replace('.png', '')
					.replace('.jpg', '')
					.replace('.jpeg', '')}.mp4`,
			].join('/'),
		});

	console.log(
		`File ${filename} converted to video, uploaded to ${generatedVideoBucketUrl}`,
	);
});

const errorFiles: string[] = [];

const settled = await Promise.allSettled(predictionPromises);

settled.forEach((promise, index) => {
	if (promise.status === 'rejected') {
		console.error(`Error processing file ${allFiles[index]}`, promise.reason);
		errorFiles.push(allFiles[index]);
	}
});

console.log(
	`All images converted to video. Videos are saved in converted_videos folder.`,
);
console.log({
	errorFiles,
});
