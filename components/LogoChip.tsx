import type { LogoTile } from '@/content';

interface Props {
  logo: string | null;
  initials: string;
  /** Tone of the logo file's own background; decides whether the chip keeps its hairline border. */
  tile?: LogoTile;
}

/** 36px chip: the real logo when supplied, otherwise initials. */
export default function LogoChip({ logo, initials, tile = 'light' }: Props) {
  return (
    <span className={logo ? `logochip tile-${tile}` : 'logochip'} aria-hidden="true">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized
        <img src={logo} alt="" />
      ) : (
        initials
      )}
    </span>
  );
}
