import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  IFrame,
  Easing,
} from 'remotion';
import { BrowserFrame } from './components/BrowserFrame';
import { SectionLabel, ScanLine } from './components/SectionLabel';
import { FilmGrain, Vignette } from './components/FilmGrain';

const EASE = Easing.bezier(0.4, 0, 0.2, 1);

// ── Scroll keyframes aligned to portfolio sections ──
// total iframe scroll distance ~5000px to cover entire page
const SCROLL_KEYFRAMES = [90, 130, 180, 240, 300, 340, 390, 450];
const SCROLL_VALUES =    [0,  0,   800, 1800, 2800, 3400, 4200, 4800];

// Section label timings (relative to composition frame 0)
const SECTIONS = [
  { name: 'Hero', frame: 100, position: 'left' as const },
  { name: 'Latest Work', frame: 195, position: 'right' as const },
  { name: 'How I Work', frame: 260, position: 'left' as const },
  { name: 'Services', frame: 345, position: 'right' as const },
  { name: 'Footer', frame: 410, position: 'left' as const },
];

// Scan line flashes at section pauses
const SCAN_FRAMES = [135, 200, 265, 350, 415];

// ═══════════════════════════════════════════
//  MAIN COMPOSITION
// ═══════════════════════════════════════════
export const WebsiteShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── [0–30] COLD OPEN ── */}
      <Sequence from={0} durationInFrames={60}>
        <ColdOpen />
      </Sequence>

      {/* ── [30–90] BROWSER MOUNT ── */}
      <Sequence from={30} durationInFrames={480}>
        <BrowserScrollSequence />
      </Sequence>

      {/* ── [450–510] ZOOM INTO HERO ── */}
      <Sequence from={450} durationInFrames={60}>
        <HeroZoom />
      </Sequence>

      {/* ── [510–570] TITLE CARD ── */}
      <Sequence from={510} durationInFrames={60}>
        <TitleCard />
      </Sequence>

      {/* ── [570–660] OUTRO ── */}
      <Sequence from={570} durationInFrames={90}>
        <Outro />
      </Sequence>

      {/* Global overlays */}
      <Vignette />
      <FilmGrain intensity={interpolate(frame, [570, 630], [0.035, 0.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════
//  SCENE 1: COLD OPEN (frames 0–30 local)
// ═══════════════════════════════════════════
const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [8, 22, 45, 58], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textBlur = interpolate(frame, [8, 20], [6, 0], { extrapolateRight: 'clamp' });
  const vignetteScale = 1 + Math.sin(frame * 0.15) * 0.02; // heartbeat pulse

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Heartbeat vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)`,
          transform: `scale(${vignetteScale})`,
        }}
      />
      <h1
        style={{
          fontSize: 52,
          fontWeight: 100,
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.9)',
          opacity: textOpacity,
          filter: `blur(${textBlur}px)`,
          margin: 0,
          textTransform: 'uppercase',
        }}
      >
        ASHER<span style={{ fontSize: 28, verticalAlign: 'super', marginLeft: 4 }}>&reg;</span>
      </h1>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════
//  SCENE 2: BROWSER MOUNT + FAST SCROLL (frames 30–510 composition)
// ═══════════════════════════════════════════
const BrowserScrollSequence: React.FC = () => {
  const frame = useCurrentFrame(); // local: 0 = composition frame 30
  const globalFrame = frame + 30;

  // Scroll interpolation with eased curve
  const scrollY = interpolate(globalFrame, SCROLL_KEYFRAMES, SCROLL_VALUES, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  });

  // Exit browser at frame 480 local (= composition ~510)
  const exitStart = 450;

  return (
    <BrowserFrame frame={frame} enterFrom={0} exitFrom={exitStart} exitDuration={20}>
      {/* Scrollable iframe wrapper */}
      <div
        style={{
          width: '100%',
          height: 6000,
          transform: `translateY(${-scrollY}px)`,
          willChange: 'transform',
        }}
      >
        <IFrame
          src="http://localhost:3001"
          style={{
            width: '100%',
            height: 6000,
            border: 'none',
            background: '#000',
          }}
        />
      </div>

      {/* Glass reflection overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 100%)',
        }}
      />

      {/* Scan lines at section pauses */}
      {SCAN_FRAMES.map((sf) => (
        <ScanLine key={sf} startFrame={sf - 30} />
      ))}

      {/* Floating section labels */}
      {SECTIONS.map((s) => (
        <SectionLabel
          key={s.name}
          text={s.name}
          startFrame={s.frame - 30}
          duration={35}
          position={s.position}
        />
      ))}
    </BrowserFrame>
  );
};

// ═══════════════════════════════════════════
//  SCENE 3: ZOOM INTO HERO (frames 450–510 composition)
// ═══════════════════════════════════════════
const HeroZoom: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 60], [1.0, 1.08], {
    easing: Easing.inOut(Easing.ease),
  });
  const parallaxX = interpolate(frame, [0, 60], [0, -12], {
    easing: EASE,
  });
  const opacity = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `scale(${scale}) translateX(${parallaxX}px)`,
      }}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 72,
            fontWeight: 100,
            letterSpacing: '0.08em',
            color: '#fff',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Beyond Visuals.
        </h2>
        <h2
          style={{
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Built with Vision.
        </h2>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════
//  SCENE 4: TITLE CARD (frames 510–570 composition)
// ═══════════════════════════════════════════
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const title = 'ASHER\u00AE';

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', background: '#000' }}>
      {/* Staggered letter-by-letter reveal */}
      <div style={{ display: 'flex', gap: 0 }}>
        {title.split('').map((char, i) => {
          const charDelay = i * 4;
          const charOpacity = interpolate(frame, [charDelay, charDelay + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const charY = interpolate(frame, [charDelay, charDelay + 8], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: EASE,
          });
          const charBlur = interpolate(frame, [charDelay, charDelay + 6], [4, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={i}
              style={{
                fontSize: char === '\u00AE' ? 32 : 96,
                fontWeight: 100,
                letterSpacing: '0.4em',
                color: '#fff',
                opacity: charOpacity,
                transform: `translateY(${charY}px)`,
                filter: `blur(${charBlur}px)`,
                display: 'inline-block',
                verticalAlign: char === '\u00AE' ? 'super' : 'baseline',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Tagline */}
      <p
        style={{
          position: 'absolute',
          bottom: '38%',
          fontSize: 16,
          fontWeight: 200,
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.45)',
          opacity: interpolate(frame, [30, 45], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(frame, [30, 45], [10, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        Beyond Visuals. Built with Vision.
      </p>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════
//  SCENE 5: OUTRO (frames 570–660 composition)
// ═══════════════════════════════════════════
const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const globalFade = interpolate(frame, [0, 30, 70, 90], [1, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#000', opacity: globalFade }} />
  );
};
