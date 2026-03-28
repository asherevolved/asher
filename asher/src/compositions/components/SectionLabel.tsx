import { interpolate, useCurrentFrame, Easing } from 'remotion';

const EASE = Easing.bezier(0.4, 0, 0.2, 1);

interface SectionLabelProps {
  text: string;
  startFrame: number;
  duration?: number;
  position?: 'left' | 'right';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  startFrame,
  duration = 30,
  position = 'left',
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > duration) return null;

  const opacity = interpolate(localFrame, [0, 6, duration - 8, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blur = interpolate(localFrame, [0, 8, duration - 6, duration], [4, 0, 0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateX = interpolate(localFrame, [0, 8], [position === 'left' ? -10 : 10, 0], {
    extrapolateRight: 'clamp',
    easing: EASE,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        [position]: 60,
        zIndex: 50,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          letterSpacing: 6,
          color: 'rgba(255,255,255,0.6)',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, Inter, sans-serif',
          padding: '8px 16px',
          borderLeft: position === 'left' ? '1px solid rgba(255,255,255,0.15)' : 'none',
          borderRight: position === 'right' ? '1px solid rgba(255,255,255,0.15)' : 'none',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ScanLine: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > 10) return null;

  const y = interpolate(localFrame, [0, 10], [0, 880]);
  const opacity = interpolate(localFrame, [0, 3, 7, 10], [0, 0.6, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
        opacity,
        zIndex: 60,
        pointerEvents: 'none',
      }}
    />
  );
};
