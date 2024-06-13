import {
	AbsoluteFill,
	Audio,
	Img,
	Video,
	staticFile,
	useVideoConfig,
} from 'remotion';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from './Root';

const bgAudio = staticFile('junoon-15s.mp3');

export const VerticalComp = (props: {
	src: string;
	frameSrc: string;
	imageStyles?: React.CSSProperties;
	videoStyles?: React.CSSProperties;
}) => {
	const {height, width} = useVideoConfig();
	return (
		<AbsoluteFill className="items-center justify-center">
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
				className="absolute min-h-full object-cover"
			/>

			<Audio src={bgAudio} />
		</AbsoluteFill>
	);
};
