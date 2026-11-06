import type { IconRef } from '@/content';
import { toolIcons } from './toolIconData';

const keyOf = (icon: IconRef) => `${icon.set}:${icon.set === 'simple-icons' ? icon.slug : icon.name}`;

/** 14px monochrome icon in currentColor. Unknown refs fall back to the CI/CD loop, as in the design. */
export default function ToolIcon({ icon }: { icon: IconRef }) {
  const data = toolIcons[keyOf(icon)] ?? toolIcons['custom:cicd'];
  return (
    <svg
      className="ticon"
      viewBox={data.vb}
      width="14"
      height="14"
      fill={data.fill}
      stroke={data.stroke}
      strokeWidth={data.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={data.d} />
    </svg>
  );
}
