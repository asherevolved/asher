import { RemotionPlayer } from '@/components/RemotionPlayer';

export const metadata = {
  title: 'My Video',
  description: 'A video created with Remotion',
};

export default function VideoPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', paddingTop: 80 }}>
      <h1 style={{ textAlign: 'center', fontSize: 36, fontWeight: 'bold', marginBottom: 20 }}>
        My Remotion Video
      </h1>
      <RemotionPlayer />
    </div>
  );
}
