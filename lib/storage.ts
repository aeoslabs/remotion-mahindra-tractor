import {createClient} from '@supabase/supabase-js';
import {STORAGE_BUCKETS} from '../src/constants';
const supabaseAdmin = createClient(
	'https://hoehorhkkbxgdykhdxju.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZWhvcmhra2J4Z2R5a2hkeGp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjY5NTE5MCwiZXhwIjoyMDIyMjcxMTkwfQ.Praj3UeJAm7lHbOsbZG7jceRFmqMgoR1xVY-SNKv1uU',
	{auth: {autoRefreshToken: false, persistSession: false}},
);

export async function uploadImageToSupabaseViaUrl({
	fileUrl,
	filePath,
	bucket,
}: {
	fileUrl: string;
	filePath: string;
	bucket: (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
}) {
	try {
		const res = await fetch(fileUrl);
		if (!res.ok) {
			throw new Error(`Failed to fetch file from ${fileUrl}`);
		}

		// doing this way to add the correct content type to the blob
		const fileBlob = new Blob([await res.blob()], {
			type: 'image/png',
		});

		const uploadResult = await supabaseAdmin.storage
			.from(bucket)
			.upload(filePath, fileBlob, {
				contentType: 'image/png',
				upsert: true,
			});

		if (uploadResult.error) {
			console.error(`🔴 Failed to upload file to supabase`, {
				fileUrl,
				uploadResult,
			});
			throw new Error(`Failed to upload file to supabase`);
		}

		const {
			data: {publicUrl},
		} = supabaseAdmin.storage.from(bucket).getPublicUrl(uploadResult.data.path);

		return {publicUrl, uploadResult};
	} catch (err) {
		if (err instanceof Error) {
			console.error(err);
			throw err;
		}

		throw new Error(JSON.stringify({error: err}));
	}
}

export async function uploadVideoToSupabaseViaUrl({
	fileUrl,
	filePath,
	bucket,
}: {
	fileUrl: string;
	filePath: string;
	bucket: (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
}) {
	try {
		const res = await fetch(fileUrl);
		if (!res.ok) {
			throw new Error(`Failed to fetch file from ${fileUrl}`);
		}

		// doing this way to add the correct content type to the blob
		const fileBlob = new Blob([await res.blob()], {
			type: 'video/mp4',
		});

		const uploadResult = await supabaseAdmin.storage
			.from(bucket)
			.upload(filePath, fileBlob, {
				contentType: 'video/mp4',
				upsert: true,
			});

		if (uploadResult.error) {
			console.error(`🔴 Failed to upload file to supabase`, {
				fileUrl,
				uploadResult,
			});
			throw new Error(`Failed to upload file to supabase`);
		}

		const {
			data: {publicUrl},
		} = supabaseAdmin.storage.from(bucket).getPublicUrl(uploadResult.data.path);

		return {publicUrl, uploadResult};
	} catch (err) {
		if (err instanceof Error) {
			console.error(err);
			throw err;
		}

		throw new Error(JSON.stringify({error: err}));
	}
}

export async function uploadFileTosupabase({
	filePath,
	bucket,
	fileBuffer,
}: {
	filePath: string;
	bucket: (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
	fileBuffer: Buffer | ArrayBuffer;
}) {
	try {
		const uploadResult = await supabaseAdmin.storage
			.from(bucket)
			.upload(filePath, fileBuffer, {
				contentType: 'image/png',
				upsert: true,
			});

		if (uploadResult.error) {
			throw new Error(`Failed to upload file to supabase`);
		}

		const {
			data: {publicUrl},
		} = supabaseAdmin.storage.from(bucket).getPublicUrl(uploadResult.data.path);

		return {publicUrl, uploadResult};
	} catch (err) {
		if (err instanceof Error) {
			console.error(err);
			throw err;
		}

		throw new Error(JSON.stringify({error: err}));
	}
}
