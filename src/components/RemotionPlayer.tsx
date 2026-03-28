'use client';

import { Player } from '@remotion/player';
import { CinematicReveal } from './CinematicReveal';

export const RemotionPlayer = () => {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Player
        component={CinematicReveal}
        durationInFrames={300} // 10 seconds at 30 fps
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        style={{
          width: '100%',
          maxWidth: 800,
          aspectRatio: '16/9',
          borderRadius: 10,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
        autoPlay
        loop
      />
    </div>
  );
};
