import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, IFrame } from 'remotion';

// Simple Browser Frame Component
const AppWindow = ({ children, frame }: { children: React.ReactNode, frame: number }) => {
  const { fps } = useVideoConfig();
  const scale = spring({ fps, frame, config: { damping: 12 }, durationInFrames: 30 });
  const opacity = interpolate(frame, [0, 15, 30], [0, 0.5, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: '900px',
        height: '600px',
        backgroundColor: '#111111',
        borderRadius: '16px',
        border: '1px solid #222222',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.1)',
        transform: `scale(${scale})`,
        opacity
      }}>
        <div style={{ height: '32px', backgroundColor: '#18181b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#eab308' }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#22c55e' }} />
        </div>
        <div style={{ height: 'calc(100% - 32px)', position: 'relative' }}>
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const PortfolioReveal = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SCENE 1 - Terminal Launch */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Terminal />
      </Sequence>

      {/* SCENE 2 - Hero Intro Reveal */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2Hero />
      </Sequence>

      {/* SCENE 3 - Scroll Reveal */}
      <Sequence from={270} durationInFrames={160}>
        <Scene3Scroll />
      </Sequence>

      {/* SCENE 4 - Latest Work */}
      <Sequence from={430} durationInFrames={130}>
        <Scene4Work />
      </Sequence>

      {/* SCENE 5 - Horizontal Scroll */}
      <Sequence from={560} durationInFrames={140}>
        <Scene5Horizontal />
      </Sequence>

      {/* SCENE 6 - Client Testimonial */}
      <Sequence from={700} durationInFrames={120}>
        <Scene6Testimonial />
      </Sequence>

      {/* SCENE 7 - Services Accordion */}
      <Sequence from={820} durationInFrames={180}>
        <Scene7Accordion />
      </Sequence>

      {/* SCENE 8 - Contact CTA */}
      <Sequence from={1000} durationInFrames={120}>
        <Scene8Contact />
      </Sequence>

    </AbsoluteFill>
  );
};

/* --- SCENES IMPLEMENTATION --- */

const Scene1Terminal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rotateX = interpolate(frame, [0, 60], [20, 0]);
  const translateY = interpolate(frame, [0, 40], [200, 0]);
  const typedLength = Math.min(Math.floor(frame), 11);
  const showOutput = frame > 40;

  return (
    <AppWindow frame={frame}>
      <div style={{ padding: 40, fontFamily: 'SF Mono, monospace', color: '#fbbf24', fontSize: 24, perspective: 1000 }}>
        <div style={{ transform: `rotateX(${rotateX}deg) translateY(${translateY}px)` }}>
          <p style={{ color: '#fbbf24' }}>&gt; npm run dev{Array(11).fill(" ")[typedLength]}</p>
          {showOutput && (
            <div style={{ marginTop: 40, color: '#a8a29e', fontSize: 20 }}>
              <pre style={{ color: '#fbbf24', fontSize: 30, marginBottom: 20 }}>
{"    _    ____  _   _ _____ ____  \n   / \\  / ___|| | | | ____|  _ \\ \n  / _ \\ \\___ \\| |_| |  _| | |_) |\n / ___ \\ ___) |  _  | |___|  _ < \n/_/   \\_\\____/|_| |_|_____|_| \\_\\"}
              </pre>
              <p style={{ opacity: interpolate(frame, [60, 70], [0, 1]) }}>[Next.js] 14 server started on port 3001</p>
              <p style={{ opacity: interpolate(frame, [70, 80], [0, 1]) }}>[Lenis] Smooth scroll initialized</p>
              <p style={{ opacity: interpolate(frame, [80, 90], [0, 1]) }}>[GSAP] Animations bound</p>
              <p style={{ opacity: interpolate(frame, [100, 110], [0, 1]), color: '#fbbf24' }}>Ready - Opening premium portfolio...</p>
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
};

const Scene2Hero = () => {
  const frame = useCurrentFrame();
  const titleY = interpolate(frame, [10, 30], [50, 0]);
  const titleOp = interpolate(frame, [10, 30], [0, 1]);
  return (
    <AppWindow frame={frame}>
      {/* Uses the live site as background */}
      <IFrame src="http://localhost:3001" style={{ width: '100%', height: '100%', border: 'none', position: 'absolute' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: 100, fontWeight: 900, margin: 0, color: 'white', transform: `translateY(${titleY}px)`, opacity: titleOp }}>ASHER</h1>
        <p style={{ fontSize: 32, color: '#fbbf24', marginTop: 10, opacity: interpolate(frame, [30, 50], [0, 1]) }}>Building Monuments for the Digital Age</p>
      </div>
    </AppWindow>
  );
};

const Scene3Scroll = () => {
    const frame = useCurrentFrame();
    // Simulate scroll by sliding a masked iframe
    const scrollY = interpolate(frame, [30, 130], [0, -1000]);
    return (
      <AppWindow frame={frame}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
           <div style={{ transform: `translateY(${scrollY}px)`, width: '100%', height: 3000 }}>
             <IFrame src="http://localhost:3001" style={{ width: '100%', height: 3000, border: 'none' }} />
           </div>
           {/* UI overlay */}
           <div style={{ position: 'absolute', right: 40, top: '50%', width: 20, height: 40, border: '2px solid #fbbf24', borderRadius: 20 }}>
               <div style={{ width: 4, height: 8, backgroundColor: '#fbbf24', borderRadius: 2, margin: '6px auto', transform: `translateY(${interpolate(frame%30, [0,30], [0,12])}px)` }} />
           </div>
        </div>
      </AppWindow>
    );
};

const Scene4Work = () => {
    const frame = useCurrentFrame();
    return (
      <AppWindow frame={frame}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 60 }}>
             <h2 style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: '#fbbf24' }}>LATEST<br/>WORK</h2>
             <p style={{ color: '#a8a29e', fontSize: 24, marginTop: 20 }}>Creative Direction · WebGL · Next.js</p>
           </div>
           <div style={{ flex: 1, position: 'relative' }}>
             {[0, 1, 2].map(i => {
                const dropOp = interpolate(frame, [20 + i*15, 35 + i*15], [0, 1]);
                const dropY = interpolate(frame, [20 + i*15, 35 + i*15], [100, 0]);
                const rot = (i - 1) * 15; // -15, 0, 15
                return (
                    <div key={i} style={{
                        position: 'absolute', top: '25%', left: '10%', width: '80%', height: '50%',
                        backgroundColor: '#222', borderRadius: 12, border: '1px solid #333',
                        opacity: dropOp, transform: `translateY(${dropY}px) rotate(${rot}deg)`,
                        transformOrigin: 'bottom center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                        {/* We use standard HTML img to load them from your public dev server */}
                        <img src={`http://localhost:3001/e1${2+i}.PNG`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                    </div>
                )
             })}
           </div>
        </div>
      </AppWindow>
    );
};

const Scene5Horizontal = () => {
    const frame = useCurrentFrame();
    const scrollX = interpolate(frame, [20, 120], [0, -1200]);
    return (
      <AppWindow frame={frame}>
         <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 100, paddingLeft: 100, transform: `translateX(${scrollX}px)` }}>
                {['Strategy', 'Design', 'Development', 'Launch'].map((step, i) => (
                    <div key={i} style={{
                        width: 400, height: 400, backgroundColor: '#111', border: `2px solid ${frame > 20 + i*25 ? '#fbbf24' : '#333'}`,
                        borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 40,
                        transition: 'border-color 0.5s'
                    }}>
                        <h1 style={{ fontSize: 120, margin: 0, color: '#222' }}>0{i+1}</h1>
                        <h2 style={{ fontSize: 48, margin: 0 }}>{step}</h2>
                    </div>
                ))}
            </div>
         </div>
      </AppWindow>
    );
};

const Scene6Testimonial = () => {
    const frame = useCurrentFrame();
    return (
      <AppWindow frame={frame}>
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80, textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: -40, left: 40, fontSize: 400, color: '#fbbf24', opacity: 0.1, fontFamily: 'Georgia' }}>"</div>
            <div>
               <p style={{ fontSize: 48, fontFamily: 'Georgia, serif', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 1.2, opacity: interpolate(frame, [20, 40], [0,1]) }}>
                   "Asher doesn't just design websites;<br/>he builds monuments for the digital age."
               </p>

            </div>
        </div>
      </AppWindow>
    );
};

const Scene7Accordion = () => {
    const frame = useCurrentFrame();
    return (
      <AppWindow frame={frame}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 60, gap: 20 }}>
            {/* Accordion 1 */}
            <div style={{
                backgroundColor: '#111', border: '1px solid #fbbf24', borderRadius: 12, overflow: 'hidden',
                height: interpolate(frame, [20, 60], [80, 250], {extrapolateRight: 'clamp'})
            }}>
                <div style={{ padding: 24, fontSize: 32, fontWeight: 700, borderBottom: '1px solid #fbbf24', color: '#fbbf24' }}>
                   Web Development
                </div>
                <div style={{ padding: 24, fontSize: 24, color: '#a8a29e', opacity: interpolate(frame, [40, 60], [0,1]) }}>
                   • React / Next.js<br/>
                   • Framer Motion & GSAP<br/>
                   • WebGL & Three.js
                </div>
            </div>
            
            {/* Accordion 2 */}
            <div style={{
                backgroundColor: '#111', border: '1px solid #333', borderRadius: 12, overflow: 'hidden',
                height: 80, opacity: interpolate(frame, [80, 100], [0,1])
            }}>
                <div style={{ padding: 24, fontSize: 32, fontWeight: 700, color: '#a8a29e' }}>
                   Creative Direction
                </div>
            </div>
        </div>
      </AppWindow>
    );
};

const Scene8Contact = () => {
    const frame = useCurrentFrame();
    const sc = spring({ fps: 30, frame: frame - 20, config: { damping: 10 } });
    return (
      <AppWindow frame={frame}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <h3 style={{ color: '#fbbf24', fontSize: 24, letterSpacing: 8, marginBottom: 20 }}>READY TO BUILD?</h3>
            {/* Spinning globe simulator */}
            <div style={{ width: 150, height: 150, border: '2px dashed #fbbf24', borderRadius: 100, transform: `rotate(${frame * 3}deg) scale(${sc})`, marginBottom: 40 }} />
            <h1 style={{ fontSize: 64, fontWeight: 900, marginBottom: 40, transform: `scale(${interpolate(frame, [0,40], [0.9, 1])})` }}>
                Let's work together
            </h1>
            <div style={{ padding: '20px 40px', backgroundColor: '#111', border: '1px solid #333', borderRadius: 40, fontFamily: 'monospace', fontSize: 24, opacity: interpolate(frame, [40,60], [0,1]) }}>
                asher.design
            </div>
        </div>
      </AppWindow>
    );
};
