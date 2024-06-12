import {Composition, staticFile} from 'remotion';
import {HorizontalComp, videoSchema} from './horizontal.tsx';
import './style.css';
import {VerticalComp} from './vertical.tsx';

const FPS = 10;
export const DEFAULT_HEIGHT = 1080;
export const DEFAULT_WIDTH = 1920;

const STORAGE_DOMAIN = 'http://127.0.0.1:45723';

const video1 =
	// 'https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/SVD-T_00018.mp4';
	staticFile('SVD-T_00018.mp4');
const video2 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/SVD-T_00019.mp4`;
const video3 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/SVD-T_00020.mp4`;
const video4 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/SVD-T_00021.mp4`;
const video5 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/22.mp4`;
const video6 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/23.mp4`;
const video7 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/24.mp4`;
const video8 = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/SVD-T_00022.mp4`;

const horizontalFrame = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/horizontal-transparent.png`;
const verticalFrame = `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/vertical-transparent.png`;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="singlecomp"
				component={VerticalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				// width={DEFAULT_HEIGHT}
				// height={DEFAULT_WIDTH}

				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				schema={videoSchema}
				defaultProps={{
					frameSrc: `https://hoehorhkkbxgdykhdxju.supabase.co/storage/v1/object/public/temp/horizontal-transparent.png`,
					src: `${STORAGE_DOMAIN}/temp/files_to_process/good_images/7385802910%20-%20(2).mp4?t=2024-06-12T09%3A13%3A20.673Z`,
					videoOrientation: 'horizontal',
					videoStyles: {top: '100px'},
				}}
			/>
			<Composition
				id="horizontal0"
				component={VerticalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_HEIGHT}
				height={DEFAULT_WIDTH}
				defaultProps={{
					frameSrc: verticalFrame,
					src: staticFile('SVD-T_00018.mp4'),
				}}
			/>
			<Composition
				id="horizontal1"
				component={HorizontalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video1,
				}}
			/>
			<Composition
				id="horizontal2"
				component={HorizontalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video3,
				}}
			/>
			<Composition
				id="horizontal3"
				component={VerticalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_HEIGHT}
				height={DEFAULT_WIDTH}
				defaultProps={{
					frameSrc: verticalFrame,
					src: video4,
				}}
			/>
			<Composition
				id="horizontal4"
				component={HorizontalComp}
				durationInFrames={9 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video5,
					videoStyles: {
						top: '80px',
					},
				}}
			/>
			<Composition
				id="horizontal5"
				component={HorizontalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video6,
				}}
			/>
			<Composition
				id="horizontal6"
				component={HorizontalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video7,
					videoStyles: {
						top: '10px',
					},
				}}
			/>
			<Composition
				id="horizontal7"
				component={HorizontalComp}
				durationInFrames={7 * FPS}
				fps={FPS}
				width={DEFAULT_WIDTH}
				height={DEFAULT_HEIGHT}
				defaultProps={{
					frameSrc: horizontalFrame,
					src: video8,
					videoStyles: {
						top: '150px',
					},
				}}
			/>

			<Composition
				id="vertical"
				component={HorizontalComp}
				durationInFrames={10 * FPS}
				fps={FPS}
				width={1920}
				height={1080}
				defaultProps={{
					frameSrc: 'https://upload.wikimedia.org/wikipedia',
					src: 'https://upload.wikimedia.org/wikipedia',
				}}
			/>
		</>
	);
};
