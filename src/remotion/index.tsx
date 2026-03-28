import { registerRoot, Composition } from 'remotion';
import { PortfolioReveal } from '../components/PortfolioReveal';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PortfolioReveal"
        component={PortfolioReveal}
        durationInFrames={1120} // Total frames across 8 scenes
        fps={30}
        width={1080}
        height={700}
      />
    </>
  );
};

registerRoot(RemotionRoot);
