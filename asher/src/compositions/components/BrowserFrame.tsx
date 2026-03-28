import { interpolate, spring, useVideoConfig, Easing } from 'remotion';

const EASE = Easing.bezier(0.4, 0, 0.2, 1);

interface BrowserFrameProps {
  children: React.ReactNode;
  frame: number;
  enterFrom?: number;
  exitFrom?: number;
  exitDuration?: number;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  frame,
  enterFrom = 0,
  exitFrom = Infinity,
  exitDuration = 20,
}) => {
  const { fps } = useVideoConfig();

  // Spring-based mount from below
  const mountProgress = spring({
    fps,
    frame: frame - enterFrom,
    config: { mass: 1, stiffness: 120, damping: 14 },
  });

  const slideY = interpolate(mountProgress, [0, 1], [120, 0]);
  const mountScale = interpolate(mountProgress, [0, 1], [0.85, 1]);
  const mountOpacity = interpolate(frame, [enterFrom, enterFrom + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Exit fade
  const exitOpacity =
    frame >= exitFrom
      ? interpolate(frame, [exitFrom, exitFrom + exitDuration], [1, 0], {
          extrapolateRight: 'clamp',
        })
      : 1;
  const exitY =
    frame >= exitFrom
      ? interpolate(frame, [exitFrom, exitFrom + exitDuration], [0, 20], {
          extrapolateRight: 'clamp',
          easing: EASE,
        })
      : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: mountOpacity * exitOpacity,
        transform: `translateY(${slideY + exitY}px) scale(${mountScale})`,
      }}
    >
      <div
        style={{
          width: 1560,
          height: 920,
          backgroundColor: 'rgba(18,18,18,0.95)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow:
            '0 60px 120px -30px rgba(0,0,0,0.9), 0 0 1px rgba(255,255,255,0.1)',
          backdropFilter: 'blur(40px)',
        }}
      >
        {/* macOS-style chrome bar */}
        <div
          style={{
            height: 40,
            backgroundColor: 'rgba(24,24,24,0.98)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 16,
            gap: 8,
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#28c840' }} />
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'system-ui',
              letterSpacing: 1,
            }}
          >
            ashers-portfolio.vercel.app
          </div>
          <div style={{ width: 60 }} />
        </div>

        {/* Content area */}
        <div style={{ height: 'calc(100% - 40px)', position: 'relative', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
