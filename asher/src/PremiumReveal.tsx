import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, IFrame, Img } from 'remotion';

// A premium OpenAI-styled Glassmorphism Wrapper for the website
const PremiumDeviceFrame = ({ children, frame }: { children: React.ReactNode, frame: number }) => {
  const { fps } = useVideoConfig();
  
  // Extremely smooth, heavy spring for an expensive feel
  const scale = spring({ fps, frame: frame - 60, config: { mass: 2, damping: 50, stiffness: 100 } });
  
  // Cinematic 3D tilting
  const rotateX = interpolate(frame, [60, 200, 400], [45, 10, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const rotateY = interpolate(frame, [60, 200, 400], [-30, -5, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const translateY = interpolate(frame, [60, 200], [500, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 2000 }}>
      {/* Background ambient glow behind the device */}
      <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(100px)', opacity: interpolate(frame, [100, 200], [0, 1]),
          transform: `scale(${interpolate(frame, [100, 400], [0.5, 1.5])})`
      }}/>
      
      <div style={{
        width: 1440,
        height: 900,
        backgroundColor: '#050505',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 50px 100px -20px rgba(0,0,0,1), 0 0 40px rgba(251, 191, 36, 0.05)',
        transform: `scale(${scale * 0.9 + 0.1}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`,
        transformStyle: 'preserve-3d'
      }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const PremiumReveal = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Scene 1: Minimalist Typography Intro (0-150) */}
      <Sequence from={0} durationInFrames={150}>
         <IntroSequence />
      </Sequence>

      {/* Scene 2: Cinematic Platform Reveal + Automatic Scroll (100 - 800) */}
      {/* We overlap it to create a seamless transition */}
      <Sequence from={120} durationInFrames={680}>
         <PlatformReveal />
      </Sequence>

      {/* Scene 3: Elegant Outro (750 - 900) */}
      <Sequence from={780} durationInFrames={120}>
         <OutroSequence />
      </Sequence>

    </AbsoluteFill>
  );
};

const IntroSequence = () => {
    const frame = useCurrentFrame();
    const blur = interpolate(frame, [0, 60], [20, 0], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [0, 150], [0.95, 1.1]);
    const opacity = interpolate(frame, [0, 40, 100, 120], [0, 1, 1, 0]);
    const letterSpace = interpolate(frame, [0, 150], [20, 40]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ 
                fontSize: 48, fontWeight: 300, letterSpacing: letterSpace, 
                opacity, filter: `blur(${blur}px)`, transform: `scale(${scale})`,
                color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase'
            }}>
                Asher
            </h1>
            <p style={{
                position: 'absolute', bottom: '35%', fontSize: 14, letterSpacing: 8, color: '#fbbf24',
                opacity: interpolate(frame, [40, 60, 100, 120], [0, 1, 1, 0]),
                transform: `translateY(${interpolate(frame, [40, 60], [20, 0])}px)`
            }}>
                DIGITAL MONUMENTS
            </p>
        </AbsoluteFill>
    );
};

const PlatformReveal = () => {
    const frame = useCurrentFrame();
    // Simulate a deep scroll by moving an ultra-tall iframe up inside the device wrapper
    // Scroll starts at frame 200, ends at frame 600, traveling 3000 pixels down
    const scrollY = interpolate(frame, [250, 650], [0, -3500], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const fadeOut = interpolate(frame, [600, 680], [1, 0], { extrapolateLeft: 'clamp' });

    return (
        <AbsoluteFill style={{ opacity: fadeOut }}>
            <PremiumDeviceFrame frame={frame}>
                {/* We render your live site tall enough to capture everything, and just slide it up */}
                <div style={{ width: '100%', height: 5000, transform: `translateY(${scrollY}px)` }}>
                    <IFrame 
                        src="http://localhost:3001" 
                        style={{ width: '100%', height: '100%', border: 'none', background: '#000' }} 
                    />
                </div>
                
                {/* Subtle glass reflection overlay inside the device to make it look like a real screen */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)',
                }} />
            </PremiumDeviceFrame>
        </AbsoluteFill>
    );
};

const OutroSequence = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ fps, frame: frame - 20, config: { damping: 20 } });
    const textTargetY = interpolate(frame, [20, 60], [40, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', background: '#000' }}>
            <div style={{
                width: 1, height: interpolate(frame, [0, 40], [0, 100]), backgroundColor: '#fbbf24',
                marginBottom: 40, opacity: interpolate(frame, [0, 20], [0, 1])
            }}/>
            
            <h2 style={{
                fontSize: 56, fontWeight: 200, color: '#fff', margin: 0,
                opacity: interpolate(frame, [20, 60], [0, 1]),
                transform: `translateY(${textTargetY}px)`
            }}>
                Ready to build?
            </h2>
            
            <div style={{
                marginTop: 40, padding: '16px 32px', border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: 100, fontSize: 16, letterSpacing: 4, color: '#fbbf24',
                opacity: interpolate(frame, [60, 80], [0, 1]), transform: `scale(${scale})`,
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)'
            }}>
                ASHER.DESIGN
            </div>
        </AbsoluteFill>
    );
};
