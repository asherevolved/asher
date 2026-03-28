import {Composition} from 'remotion';
import {PremiumReveal} from './PremiumReveal';
import {WebsiteShowcase} from './compositions/WebsiteShowcase';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="WebsiteShowcase"
				component={WebsiteShowcase}
				durationInFrames={660}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="PremiumReveal"
				component={PremiumReveal}
				durationInFrames={900}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
