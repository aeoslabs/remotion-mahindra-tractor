import {
	AbsoluteFill,
	Audio,
	Img,
	Video,
	staticFile,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from './Root';

const bgAudio = staticFile('junoon-15s.mp3');

export const videoSchema = z.object({
	src: z.string().url(),
	frameSrc: z.string().url(),
	imageStyles: z.record(z.string()).optional(),
	videoStyles: z.record(z.string()).optional(),
	videoOrientation: z.enum(['horizontal', 'vertical']),
});

export const HorizontalComp = (props: {
	src: string;
	frameSrc: string;
	imageStyles?: React.CSSProperties;
	videoStyles?: React.CSSProperties;
}) => {
	const {height, width} = useVideoConfig();
	return (
		<AbsoluteFill className="bg-red-600 items-center justify-center">
			<Img
				className="z-10 absolute"
				src={props.frameSrc}
				style={{
					height,
					width,
					...props.imageStyles,
				}}
			/>
			<Video
				src={props.src}
				style={{
					height: DEFAULT_HEIGHT,
					width: DEFAULT_WIDTH,
					...props.videoStyles,
				}}
				className="min-w-full absolute min-h-full object-fill"
			/>

			<Audio src={bgAudio} />
		</AbsoluteFill>
	);
};
