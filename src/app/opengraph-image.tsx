import { ImageResponse } from 'next/og';
import { PERSON_NAME } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0f1f',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(37,99,235,0.55), transparent 55%), radial-gradient(circle at 85% 75%, rgba(34,211,238,0.4), transparent 55%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 30,
            fontWeight: 700,
            color: '#38bdf8',
            marginBottom: 36,
          }}
        >
          Part of Me
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          {PERSON_NAME}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 500,
            color: '#94a3b8',
            marginTop: 24,
          }}
        >
          Full Stack Developer &amp; Creative Problem Solver
        </div>

        <div
          style={{
            display: 'flex',
            width: 140,
            height: 6,
            borderRadius: 999,
            marginTop: 40,
            backgroundImage: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
