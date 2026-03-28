import { useCurrentFrame } from 'remotion';

export const FilmGrain: React.FC<{ intensity?: number }> = ({ intensity = 0.035 }) => {
  const frame = useCurrentFrame();
  // Animate baseFrequency slightly per frame for organic feel
  const seed = frame % 100;
  const freq = 0.65 + Math.sin(frame * 0.1) * 0.05;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        mixBlendMode: 'overlay',
        opacity: intensity,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={freq}
            numOctaves={4}
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </div>
  );
};

export const Vignette: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 99,
      background:
        'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
    }}
  />
);
