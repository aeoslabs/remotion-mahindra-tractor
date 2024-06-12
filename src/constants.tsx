import {z} from 'zod';

export const user_steps = [
	'provide_user_name', // Theo
	// "provide_mothers_name", // Theo
	'provide_caption', // Use T3
	'provide_environment', // T3 ENV
	'provide_image', // https://....
	'generating_image',
	'generated_image',
] as const;

export type UserStep = (typeof user_steps)[number];

export const GA_Events = {} as const;

export const FLAGGED_ERROR_CODES = Object.freeze({
	NO_PERSON_FOUND: 'NO_PERSON_FOUND',
	MORE_THAN_ONE_PERSON: 'MORE_THAN_ONE_PERSON',
	ONLY_FEMALE_ALLOWED_IN_IMAGE: `ONLY_FEMALE_ALLOWED_IN_IMAGE`,
	NSFW_IMAGE: `NSFW_IMAGE`,

	INVALID_IMAGE: 'INVALID_IMAGE',

	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
});

export type FlaggedErrorCode = keyof typeof FLAGGED_ERROR_CODES;

export const flaggedErrorCodeSchema = z
	.enum(
		Object.values(FLAGGED_ERROR_CODES) as [
			FlaggedErrorCode,
			...FlaggedErrorCode[],
		],
	)
	.catch('UNKNOWN_ERROR');

export const URLs = {
	// Public
	home: '/',

	_comingSoonToYourRegion: '/coming-soon-to-your-place',

	signIn: '/sign-in',

	// Admin
	admin: '/wp-admin',

	termsOfService: '/tos/index.html',

	// APIs
	API: {
		send_instagram_message: `/api/sendInstagramMessage`,
		generate_image: `/api/generate_image`,
		validate_image: `/api/validate_image`,

		generate_prompt: `/api/generate_prompt`,
	},

	webhooks: {
		replicate: `/api/webhooks/replicate`,
	},

	// External APIs
	externalApis: {
		replicate: 'https://api.replicate.com/v1',
	},
} as const;

export const AUTH_ROLES = {
	aeos_admin: 'aeos_admin', // Super Admin
	external_admin: 'external_admin', // External Admin
	admin_readonly: 'admin_readonly', // Readonly
} as const;

export const STORAGE_BUCKETS = {
	outputImages: 'output_images',
	finalImages: 'final_images',
	misc: 'misc',
	temp: 'temp',
} as const;

export const MAX_VIDEOS_PER_USER = 3;

export const MAX_FILE_UPLOAD_SIZE = 20 * 1024 * 1024; // 20 MB
