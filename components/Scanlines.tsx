/** Retro-mode CRT overlay; fades in to .04 opacity via `.scan.on`. */
export default function Scanlines({ on }: { on: boolean }) {
  return <div className={on ? 'scan on' : 'scan'} aria-hidden="true" />;
}
