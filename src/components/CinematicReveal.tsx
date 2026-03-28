import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const CinematicReveal = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animations
  // 1. Zoom in on the iframe slowly
  const scale = interpolate(frame, [0, 150], [0.6, 1], {
    extrapolateRight: 'clamp',
  });

  // 2. Rotate the iframe from an isometric 3D angle to flat 2D
  const rotateX = interpolate(frame, [0, 100], [45, 0], {
    extrapolateRight: 'clamp',
  });
  
  const rotateZ = interpolate(frame, [0, 100], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  // 3. Fade in everything
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1500px', // needed for 3D rotation 
      }}
    >
      <div style={{
          opacity,
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
          width: '80%',
          height: '80%',
          boxShadow: '0px 20px 100px rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: 'white'
      }}>
          {/* We load your actual running Next.js app inside this iframe */}
          <iframe 
            src="http://localhost:3001" 
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
      </div>

       {/* Optional Text Overlay */}
       <div style={{
          position: 'absolute',
          bottom: 100,
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          opacity: interpolate(frame, [80, 120, 200, 240], [0, 1, 1, 0]),
       }}>
         My Portfolio
       </div>
    </AbsoluteFill>
  );
};
