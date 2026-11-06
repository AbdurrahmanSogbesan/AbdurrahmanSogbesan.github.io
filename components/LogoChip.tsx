/** 36px chip: the real logo when supplied, otherwise initials. */
export default function LogoChip({ logo, initials }: { logo: string | null; initials: string }) {
  return (
    <span className="logochip" aria-hidden="true">
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized
        <img src={logo} alt="" />
      ) : (
        initials
      )}
    </span>
  );
}
