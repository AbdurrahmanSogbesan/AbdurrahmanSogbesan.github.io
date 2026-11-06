import type { CSSProperties } from 'react';
import type { Project } from '@/content';

// Skeleton frames from design/Main.dc.html. A real screenshot replaces the skeleton inside the same frame.

const sk = (style: CSSProperties, key?: number) => <div key={key} className="sk" style={style} />;

function Shot({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized
  return <img src={src} alt="" />;
}

function ChartSkeleton() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '7px' }}>
        {sk({ height: '30px' })}
        {sk({ height: '30px' })}
        {sk({ height: '30px' })}
      </div>
      <div className="sk" style={{ flex: 1, position: 'relative', overflow: 'hidden', color: 'var(--muted)' }}>
        <svg
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: '12px 10px', width: 'calc(100% - 20px)', height: 'calc(100% - 24px)' }}
        >
          <polyline
            points="0,62 18,55 34,58 52,40 70,46 88,30 104,36 122,22 140,28 158,14 176,20 200,8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            opacity=".7"
          />
        </svg>
      </div>
    </>
  );
}

function ListSkeleton() {
  return (
    <>
      {sk({ height: '10px', width: '45%' })}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '7px', flex: 1 }}>
        {sk({ opacity: 0.8 })}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {sk({ height: '7px' })}
          {sk({ height: '7px', width: '80%' })}
          {sk({ height: '7px', width: '90%' })}
          {sk({ height: '7px', width: '65%' })}
          {sk({ height: '7px', width: '85%' })}
        </div>
      </div>
    </>
  );
}

function Browser({ project }: { project: Project }) {
  const shot = project.screenshots[0];
  return (
    <div className="win">
      <div className="chrome">
        <i />
        <i />
        <i />
        <span className="url">{project.preview.path}</span>
      </div>
      {shot ? (
        <Shot src={shot} />
      ) : (
        <div className="wbody">
          <div className="rail">
            {sk({ height: '8px', width: '70%' })}
            {sk({ height: '6px', width: '90%', opacity: 0.7 })}
            {sk({ height: '6px', width: '80%', opacity: 0.7 })}
            {sk({ height: '6px', width: '85%', opacity: 0.7 })}
            {sk({ height: '6px', width: '60%', opacity: 0.7 })}
          </div>
          <div className="main">{project.preview.look === 'list' ? <ListSkeleton /> : <ChartSkeleton />}</div>
        </div>
      )}
    </div>
  );
}

/** Skeleton content of the left, middle and right phones. */
const phoneSkeletons: CSSProperties[][] = [
  [
    { height: '8px', width: '55%' },
    { height: '44px' },
    { height: '6px', width: '80%' },
    { height: '6px', width: '65%' },
  ],
  [{ height: '8px', width: '45%' }, { height: '22px' }, { height: '22px' }, { height: '22px' }],
  [
    { height: '8px', width: '60%' },
    { height: '6px', width: '90%' },
    { height: '6px', width: '75%' },
    { height: '52px' },
  ],
];

function Phones({ project }: { project: Project }) {
  return (
    <>
      {phoneSkeletons.map((skeleton, i) => {
        const shot = project.screenshots[i];
        return (
          <div key={i} className={i === 1 ? 'phone mid' : 'phone'}>
            {shot ? <Shot src={shot} /> : skeleton.map((style, j) => sk(style, j))}
          </div>
        );
      })}
    </>
  );
}

export default function ProjectPreview({ project }: { project: Project }) {
  const browser = project.preview.frame === 'browser';
  return (
    <div
      className={browser ? 'frame web' : 'frame mob'}
      style={{ '--h': String(project.preview.hue) } as CSSProperties}
      aria-hidden="true"
    >
      {browser ? <Browser project={project} /> : <Phones project={project} />}
    </div>
  );
}
