import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Simple animation: fading in and moving up
  const opacity = Math.min(1, frame / 30);
  const translateY = Math.max(0, 50 - frame * 2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        fontSize: 80,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
        }}
      >
        Hello from Remotion!
      </div>
    </AbsoluteFill>
  );
};
