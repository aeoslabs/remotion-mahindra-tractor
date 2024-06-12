// 1. get video res

// if aspect ratio is vertical, then use the vertical overlay, otherwise use the horizontal overlay

// 2. use Remotion's CLI to render the video with the selected overlay - use the width and height of that overlay

// 3. upload the video to Supabase

// const allVideosToOverlay = await fs.readdir('images_to_process/converted_videos');
import {createClient} from '@supabase/supabase-js';
// import fsSync from 'fs';
import fs from 'fs/promises';
import {STORAGE_BUCKETS} from '../src/constants';
import {getVideoDimensionsUsingFFProbe} from './ffmpeg-test.js';

const successful = JSON.parse(
	(await fs.readFile('successful.json')).toString(),
) as string[];

const supabaseAdmin = createClient(
	'https://hoehorhkkbxgdykhdxju.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZWhvcmhra2J4Z2R5a2hkeGp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjY5NTE5MCwiZXhwIjoyMDIyMjcxMTkwfQ.Praj3UeJAm7lHbOsbZG7jceRFmqMgoR1xVY-SNKv1uU',
	{auth: {autoRefreshToken: false, persistSession: false}},
);

const folderPath = ['temp', 'files_to_process', 'good_images'].join('/');
const allVideosToOverlay = await supabaseAdmin.storage
	.from(STORAGE_BUCKETS.temp)
	.list(folderPath);

// console.log(allVideosToOverlay.data);

if (!allVideosToOverlay?.data) {
	console.log('No images to process');
	process.exit(1);
}

// console.log('All videos to overlay', allVideosToOverlay.data);

// throw new Error('stop');

const onlyVideos = allVideosToOverlay.data.filter((f) =>
	f.name.endsWith('.mp4'),
);

console.log(`There are total ${onlyVideos.length} videos to process`);

for await (const f of onlyVideos) {
	const filepath = ['temp', 'files_to_process', 'good_images', f.name].join(
		'/',
	);

	const videoUrl = `http://127.0.0.1:45723/temp/files_to_process/good_images/${f.name}`;

	// const videoUrl = supabaseAdmin.storage
	// 	.from(STORAGE_BUCKETS.temp)
	// 	.getPublicUrl(filepath).data.publicUrl;

	// const {error, data} = await supabaseAdmin.storage
	// 	.from(STORAGE_BUCKETS.temp)
	// 	.createSignedUrl(filepath, 60);

	// if (error) {
	// 	console.error(f);
	// 	console.error(error);
	// 	throw new Error('Error getting signed url');
	// }

	const videoRes = await fetch(videoUrl);

	const videoBuffer = await videoRes.blob();

	const tempFilePath = `tempvids/mahindra-${f.name}`;
	// write to path

	await fs.writeFile(
		tempFilePath,
		Buffer.from(await videoBuffer.arrayBuffer()),
	);

	const {height, width} = (await getVideoDimensionsUsingFFProbe(
		tempFilePath,
	)) as {
		width: number;
		height: number;
	};

	console.log('Dimensions', {height, width});

	const orientation = height > width ? 'vertical' : 'horizontal';

	const output = `concatenated_outputs/${f.name}`;

	await runRemotion({
		output,
		height,
		width,
		orientation,
		videoSrc: videoUrl,
	});

	successful.push(f.name);
	await fs.writeFile('successful.json', JSON.stringify(successful));
}

import {exec} from 'child_process';

async function runRemotion(props: {
	output: string;
	height: number;
	width: number;
	orientation: 'vertical' | 'horizontal';
	videoSrc: string;
}) {
	const height = props.orientation === 'vertical' ? 1080 : 1920;
	const width = props.orientation === 'vertical' ? 1920 : 1080;

	return new Promise((resolve, reject) => {
		const command = `npx remotion render singlecomp --output=${props.output} --height=${height} --width=${width} --config=remotion.config.ts --props='${JSON.stringify(
			{
				videoOrientation: props.orientation,
				src: props.videoSrc,
				frameSrc: `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/temp/${props.orientation}-transparent.png`,
			},
		)}'`;

		console.log(`executing: ${command}`);

		// throw 'not really';
		exec(command, (err, stdout, stderr) => {
			if (err) {
				console.error(`Error: ${err.message}`);
				return reject({success: false, error: err});
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
			console.log(`FFmpeg processing complete for ${props.output}`);
			resolve({success: true, outputFile: props.output});
		});
	});
}

process.exit(0);
