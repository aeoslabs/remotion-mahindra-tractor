import {createOpenAI} from '@ai-sdk/openai';
import fs from 'fs/promises';
// 1. Read all files
// 2. pass through GPT vision
// 3. Copy good images to a new folder called good_images
// 4. save json array to disk

const blacklist = [
	'8128755844.jpeg', // screenshot
	'6375576095.jpeg', // face in mirror
	'8475917591.jpeg', // weird
];

const allFiles = (await fs.readdir('images_to_process')).filter(
	(file) => file.includes('.') && !blacklist.includes(file),
);

console.log(`There are total ${allFiles.length} images to process`);

const openai = createOpenAI({
	compatibility: 'strict',
	apiKey: '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',
});

for await (const filename of allFiles) {
	console.log(`Processing file ${filename}`);

	// const imageBuffer = fsSync.readFileSync(`./images_to_process/${filename}`);
	// const base64ImageData = imageBuffer.toString('base64');

	// let fileExt = (filename.split('/')[1] ?? 'jpeg').trim().toLowerCase();

	// if (fileExt === 'jpg') {
	// 	fileExt = 'jpeg';
	// }

	// const imageContentType = fileExt ? `image/${fileExt}` : 'image/png';

	// const {object: validationData} = await generateObject({
	// 	model: openai('gpt-4o'),
	// 	schema: z.object({
	// 		humanPresent: z
	// 			.boolean()
	// 			.describe('True if a human is present in the image.'),
	// 	}),

	// 	messages: [
	// 		{
	// 			content:
	// 				'You are a helpful Image recognition assistant that helps the user understand the image that they upload.',
	// 			role: 'system',
	// 		},
	// 		{
	// 			role: 'user',
	// 			content: [
	// 				{
	// 					image: base64ImageData,
	// 					mimeType: imageContentType,
	// 					type: 'image',
	// 				},
	// 			],
	// 		},
	// 	],
	// });

	// if (validationData.humanPresent) {
	await fs.copyFile(
		`images_to_process/${filename}`,
		`images_to_process/good_images/${filename}`,
	);
	// }
}

console.log(
	`All images processed. Good images are saved in good_images folder.`,
);
console.log(`Now you can run the next script to process the good images.`);
